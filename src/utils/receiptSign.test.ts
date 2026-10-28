import { describe, expect, it } from 'vitest';
import { buildDecisionReceipt, verify } from './receipt';
import {
  createEd25519AppSigner,
  createReceiptVerifier,
  generateEd25519KeyPair,
  receiptDigest,
  verifyPasskey,
} from './receiptSign';

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function bytesToBase64Url(bytes: Uint8Array): string {
  return bytesToBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/u, '');
}

describe('receipt signers', () => {
  it('round-trips an Ed25519 app signature', async () => {
    const keys = await generateEd25519KeyPair();
    const signer = createEd25519AppSigner(keys);
    const unsigned = buildDecisionReceipt({
      title: 'Pay vendor',
      outcome: 'approved',
      approver: { id: 'alice' },
      presentedAtMs: 1_700_000_000_000,
      decidedAtMs: 1_700_000_002_000,
      fallbackId: 'local',
    });
    const signedFields = await signer.sign(unsigned.receiptHash);
    const receipt = {
      ...unsigned,
      signatures: [{ signerType: 'app' as const, algorithm: 'Ed25519', ...signedFields }],
    };
    const result = await verify(receipt, createReceiptVerifier());
    expect(result.valid).toBe(true);
    expect(result.signatures).toEqual([{ signerType: 'app', status: 'valid' }]);

    const broken = { ...receipt, signatures: [{ ...receipt.signatures[0], signature: bytesToBase64(new Uint8Array(64)) }] };
    const failed = await verify(broken, createReceiptVerifier());
    expect(failed.signatures[0]?.status).toBe('invalid');
  });

  it('checks a passkey assertion whose challenge is the receipt digest', async () => {
    const rpId = 'depute.dev';
    const keys = await crypto.subtle.generateKey(
      { name: 'ECDSA', namedCurve: 'P-256' },
      true,
      ['sign', 'verify'],
    );
    const receipt = buildDecisionReceipt({
      title: 'Pay vendor',
      outcome: 'approved',
      presentedAtMs: 1,
      decidedAtMs: 2,
      fallbackId: 'local',
      highStakes: true,
    });
    const rpHash = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(rpId)));
    const authenticatorData = new Uint8Array(37);
    authenticatorData.set(rpHash);
    authenticatorData[32] = 0x01;
    const clientJson = JSON.stringify({
      type: 'webauthn.get',
      challenge: bytesToBase64Url(receiptDigest(receipt.receiptHash)),
      origin: 'https://depute.dev',
    });
    const clientBytes = new TextEncoder().encode(clientJson);
    const clientHash = new Uint8Array(await crypto.subtle.digest('SHA-256', clientBytes));
    const signed = new Uint8Array(authenticatorData.length + clientHash.length);
    signed.set(authenticatorData);
    signed.set(clientHash, authenticatorData.length);
    const signature = new Uint8Array(await crypto.subtle.sign(
      { name: 'ECDSA', hash: 'SHA-256' },
      keys.privateKey,
      signed,
    ));
    const publicKey = new Uint8Array(await crypto.subtle.exportKey('spki', keys.publicKey));
    const fields = {
      algorithm: 'ES256',
      publicKey: bytesToBase64(publicKey),
      signature: bytesToBase64(signature),
      hash: receipt.receiptHash,
      authenticatorData: bytesToBase64(authenticatorData),
      clientDataJSON: bytesToBase64(clientBytes),
      rpId,
    };
    expect(await verifyPasskey(fields)).toBe(true);
    expect(await verifyPasskey({ ...fields, rpId: 'other.example' })).toBe(false);
    expect(await verifyPasskey({ ...fields, hash: sha256StandIn(receipt.receiptHash) })).toBe(false);
  });
});

function sha256StandIn(hash: string): string {
  return hash.endsWith('a') ? `${hash.slice(0, -1)}b` : `${hash.slice(0, -1)}a`;
}
