/**
 * Whether an approval channel is one the agent can read.
 *
 * The integrator declares reachability. This module does not verify it,
 * and it does not talk to an authenticator. The CLI copies this file.
 * It imports nothing.
 */

export type ApprovalChannelKind =
  | 'webauthn-platform'
  | 'webauthn-security-key'
  | 'otp-email'
  | 'otp-sms'
  | 'chat'
  | 'in-agent-ui'
  | 'other';

export type AgentReachability = 'no' | 'unknown' | 'yes';

export interface ApprovalChannel {
  kind: ApprovalChannelKind;
  agentReachable: AgentReachability;
  /** Always the integrator. This library does not verify reachability. */
  declaredBy: 'integrator';
}

/** A change that needs a channel the agent cannot read. */
export type ChannelRequirement = 'high-stakes' | 'limit-or-permission';

export interface ChannelRule {
  agentReachable: 'no';
}

const KINDS = new Set<ApprovalChannelKind>([
  'webauthn-platform',
  'webauthn-security-key',
  'otp-email',
  'otp-sms',
  'chat',
  'in-agent-ui',
  'other',
]);

const REACH = new Set<AgentReachability>(['no', 'unknown', 'yes']);

const READABLE_KINDS = new Set<ApprovalChannelKind>([
  'otp-email',
  'otp-sms',
  'chat',
  'in-agent-ui',
]);

export const CHANNEL_DECLARED_LABEL = 'Declared by integrator.';

export function channelKindLabel(kind: ApprovalChannelKind): string {
  switch (kind) {
    case 'webauthn-platform': return 'Passkey on this device';
    case 'webauthn-security-key': return 'Security key';
    case 'otp-email': return 'Email one-time code';
    case 'otp-sms': return 'Text-message one-time code';
    case 'chat': return 'Chat message';
    case 'in-agent-ui': return 'Screen inside the agent';
    case 'other': return 'Other channel';
    default: return 'Other channel';
  }
}

export function reachabilityLabel(value: AgentReachability): string {
  if (value === 'no') return 'The integrator says the agent cannot read this channel.';
  if (value === 'yes') return 'The integrator says the agent can read this channel.';
  return 'The integrator has not said whether the agent can read this channel.';
}

/** Warning for a kind whose contents often land where an agent can read them. */
export function channelWarningText(channel: ApprovalChannel): string | undefined {
  if (!READABLE_KINDS.has(channel.kind)) return undefined;
  return 'This approval code could be read by the agent.';
}

/** High-stakes approvals and limit or permission changes need a channel the agent cannot read. */
export function requiredChannelFor(change: ChannelRequirement): ChannelRule {
  void change;
  return { agentReachable: 'no' };
}

export function isApprovalChannel(value: ApprovalChannel): boolean {
  return KINDS.has(value.kind)
    && REACH.has(value.agentReachable)
    && value.declaredBy === 'integrator';
}

export function assertApprovalChannel(value: ApprovalChannel): void {
  if (!isApprovalChannel(value)) {
    throw new Error('approvalChannel must be declared by the integrator. depute does not verify reachability.');
  }
}

export function channelAllows(channel: ApprovalChannel, change: ChannelRequirement): boolean {
  if (!isApprovalChannel(channel)) return false;
  return channel.agentReachable === requiredChannelFor(change).agentReachable;
}

export function channelBlocksApproval(
  channel: ApprovalChannel | undefined,
  requirement: ChannelRequirement | undefined,
): boolean {
  if (!channel || !requirement) return false;
  return !channelAllows(channel, requirement);
}

/**
 * Holding the code is not an approval. `code` is unused on purpose:
 * an emailed or chatted one-time code can sit where the agent can read it.
 */
export function approvalSatisfiedByCode(
  channel: ApprovalChannel,
  code: string,
  change: ChannelRequirement,
): boolean {
  void code;
  return channelAllows(channel, change);
}
