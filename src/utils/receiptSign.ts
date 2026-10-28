/**
 * Host-side signers for an approval receipt.
 *
 * The app key is Ed25519 and signs the `sha256:` hash string.
 * A passkey signs only when the host asks. Its WebAuthn challenge is the
 * raw 32-byte digest. The relying-party id stays on the host options.
 *
 * This file is copied by the CLI. It is not part of the private core package.
 */

import type { ReceiptAppSigner, ReceiptPasskeySigner, ReceiptVerifier } from './receipt';

export interface PasskeySignerOptions {
  /** Relying-party id. The host owns this. It is not stored on the receipt. */
  rpId: string;
  /** Base64url credential id from registration. */
  credentialId: string;
  /** Base64 SPKI public key recorded at registration. */
  publicKey: string;
  algorithm: 'ES256' | 'Ed25519';
}

function signing(): SubtleCrypto {
  const api = globalThis.crypto;
  if (!api?.subtle) throw new Error('This runtime cannot sign receipts.');
  return api.subtle;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function asBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  return bytesToBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/u, '');
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (value.length % 4)) % 4);
  return base64ToBytes(padded);
}

/** Raw 32-byte digest from a `sha256:` receipt hash. This is the passkey challenge. */
export function receiptDigest(receiptHash: string): Uint8Array {
  if (!/^sha256:[0-9a-f]{64}$/u.test(receiptHash)) {
    throw new Error('Receipt hash must be a sha256 digest.');
  }
  const hex = receiptHash.slice(7);
  const bytes = new Uint8Array(32);
  for (let i = 0; i < 32; i += 1) bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return bytes;
}

export function generateEd25519KeyPair(): Promise<CryptoKeyPair> {
  return signing().generateKey({ name: 'Ed25519' }, true, ['sign', 'verify']);
}

/** Sign every receipt hash with the app's Ed25519 key. The host keeps the key pair. */
export function createEd25519AppSigner(keys: CryptoKeyPair): ReceiptAppSigner {
  return {
    async sign(receiptHash: string) {
      const signature = await signing().sign(
        { name: 'Ed25519' },
        keys.privateKey,
        asBuffer(new TextEncoder().encode(receiptHash)),
      );
      const publicKey = await signing().exportKey('spki', keys.publicKey);
      return {
        publicKey: bytesToBase64(new Uint8Array(publicKey)),
        signature: bytesToBase64(new Uint8Array(signature)),
      };
    },
  };
}

export async function verifyEd25519(input: {
  publicKey: string;
  signature: string;
  hash: string;
}): Promise<boolean> {
  try {
    const key = await signing().importKey(
      'spki',
      asBuffer(base64ToBytes(input.publicKey)),
      { name: 'Ed25519' },
      false,
      ['verify'],
    );
    return signing().verify(
      { name: 'Ed25519' },
      key,
      asBuffer(base64ToBytes(input.signature)),
      asBuffer(new TextEncoder().encode(input.hash)),
    );
  } catch {
    return false;
  }
}

/** Prompt for a passkey. The challenge is the receipt digest. */
export function createPasskeySigner(options: PasskeySignerOptions): ReceiptPasskeySigner {
  return {
    async sign(receiptHash: string) {
      const credentials = globalThis.navigator?.credentials;
      if (!credentials) throw new Error('This runtime has no passkey prompt.');
      const credential = await credentials.get({
        publicKey: {
          challenge: asBuffer(receiptDigest(receiptHash)),
          rpId: options.rpId,
          allowCredentials: [{
            type: 'public-key',
            id: asBuffer(base64UrlToBytes(options.credentialId)),
          }],
          userVerification: 'required',
          timeout: 60_000,
        },
      });
      if (!credential || credential.type !== 'public-key') {
        throw new Error('Passkey prompt was dismissed.');
      }
      const response = (credential as PublicKeyCredential).response as AuthenticatorAssertionResponse;
      return {
        algorithm: options.algorithm,
        publicKey: options.publicKey,
        signature: bytesToBase64(new Uint8Array(response.signature)),
        authenticatorData: bytesToBase64(new Uint8Array(response.authenticatorData)),
        clientDataJSON: bytesToBase64(new Uint8Array(response.clientDataJSON)),
      };
    },
  };
}

async function sha256Bytes(data: Uint8Array): Promise<Uint8Array> {
  const digest = await signing().digest('SHA-256', asBuffer(data));
  return new Uint8Array(digest);
}

export async function verifyPasskey(input: {
  algorithm: string;
  publicKey: string;
  signature: string;
  hash: string;
  authenticatorData?: string;
  clientDataJSON?: string;
  rpId?: string;
}): Promise<boolean> {
  if (!input.authenticatorData || !input.clientDataJSON) return false;
  if (input.algorithm !== 'ES256' && input.algorithm !== 'Ed25519') return false;
  try {
    const clientBytes = base64ToBytes(input.clientDataJSON);
    const authBytes = base64ToBytes(input.authenticatorData);
    const client = JSON.parse(new TextDecoder().decode(clientBytes)) as { type?: string; challenge?: string };
    if (client.type !== 'webauthn.get') return false;
    if (client.challenge !== bytesToBase64Url(receiptDigest(input.hash))) return false;
    if (authBytes.length < 37 || (authBytes[32] & 0x01) === 0) return false;
    if (input.rpId) {
      const expected = await sha256Bytes(new TextEncoder().encode(input.rpId));
      for (let i = 0; i < 32; i += 1) {
        if (authBytes[i] !== expected[i]) return false;
      }
    }
    const clientHash = await sha256Bytes(clientBytes);
    const signed = new Uint8Array(authBytes.length + clientHash.length);
    signed.set(authBytes);
    signed.set(clientHash, authBytes.length);
    const signature = base64ToBytes(input.signature);
    const publicKey = base64ToBytes(input.publicKey);
    if (input.algorithm === 'Ed25519') {
      const key = await signing().importKey('spki', asBuffer(publicKey), { name: 'Ed25519' }, false, ['verify']);
      return signing().verify({ name: 'Ed25519' }, key, asBuffer(signature), asBuffer(signed));
    }
    const key = await signing().importKey(
      'spki',
      asBuffer(publicKey),
      { name: 'ECDSA', namedCurve: 'P-256' },
      false,
      ['verify'],
    );
    return signing().verify({ name: 'ECDSA', hash: 'SHA-256' }, key, asBuffer(signature), asBuffer(signed));
  } catch {
    return false;
  }
}

/** Check an Ed25519 app signature, or a passkey whose challenge is the receipt digest. */
export function createReceiptVerifier(options?: { rpId?: string }): ReceiptVerifier {
  return {
    async verify(input) {
      if (input.signerType === 'app') {
        if (input.algorithm !== 'Ed25519') return false;
        return verifyEd25519(input);
      }
      return verifyPasskey({ ...input, rpId: options?.rpId });
    },
  };
}
