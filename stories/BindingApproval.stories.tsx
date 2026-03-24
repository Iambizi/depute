import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BindingApproval } from '../src/components/BindingApproval';
import type { BindingApprovalProps } from '../src/components/BindingApproval';

const meta: Meta<BindingApprovalProps> = {
  title: 'v2 — Compliance & Forensics/BindingApproval',
  component: BindingApproval,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<BindingApprovalProps>;

export const Default: Story = {
  args: {
    title: 'Wire Transfer Authorization',
    description: 'Agent requests authorization to execute a $5,000 wire transfer from Account ****4521 to Account ****8903.',
    impactStatement: '$5,000.00 will be transferred immediately. This action is irreversible.',
    signerIdentity: 'alice@company.com',
    terms: [
      { id: 't1', text: 'I authorize the transfer of $5,000.00 to Account ****8903', acknowledged: false },
      { id: 't2', text: 'I understand this action is irreversible once confirmed', acknowledged: false },
      { id: 't3', text: 'I confirm the recipient account details are correct', acknowledged: false },
    ],
    onSign: () => alert('Signed!'),
    onReject: () => alert('Rejected'),
  },
};

export const Signing: Story = {
  name: 'isSigning State',
  args: {
    title: 'Contract Execution',
    description: 'Cryptographic signature in progress...',
    isSigning: true,
    signerIdentity: '0x1a2b...9c0d',
  },
};

export const Signed: Story = {
  args: {
    title: 'Purchase Order Approved',
    description: 'Agent completed purchase order for 500 units of Component-X.',
    status: 'signed',
    signerIdentity: 'procurement@company.com',
  },
};

export const WithTimeout: Story = {
  name: 'With Timeout',
  args: {
    title: 'High-Value Transfer',
    description: 'Approval window expires in 5 minutes.',
    timeoutSeconds: 300,
    impactStatement: '$50,000 will be authorized for automated trading.',
    onSign: () => alert('Signed!'),
    onReject: () => alert('Rejected'),
    onTimeout: () => alert('Approval window expired'),
  },
};

export const CryptoTransaction: Story = {
  name: '🪙 Crypto: Smart Contract',
  args: {
    title: 'Smart Contract Deployment',
    description: 'Agent will deploy a new ERC-20 token contract to Ethereum mainnet.',
    impactStatement: 'Estimated gas: 0.15 ETH (~$450). Contract is immutable once deployed.',
    signerIdentity: '0xAb5801a7...1f27EaD9083C756Cc2',
    terms: [
      { id: 't1', text: 'I have reviewed the contract source code', acknowledged: false },
      { id: 't2', text: 'I authorize the gas expenditure of up to 0.2 ETH', acknowledged: false },
      { id: 't3', text: 'I understand the contract cannot be modified after deployment', acknowledged: false },
    ],
    onSign: () => alert('Deploying...'),
    onReject: () => alert('Deployment cancelled'),
  },
};

export const AsyncHandoffFlow: Story = {
  name: 'Async Handoff (Remote Cryptographic Signature)',
  render: function AsyncHandoffRender() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [status, setStatus] = useState<any>('reviewing');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ fontSize: '12px', color: '#666', fontFamily: 'sans-serif' }}>
          <strong>Scenario:</strong> The user steps away before authorizing a high-stakes transaction. After 3 seconds, the gate safely bypasses the local Terms & Conditions trap and hands the payload to their mobile wallet.
        </p>
        <BindingApproval
          title="Wire Transfer Authorization"
          description="Agent requests authorization to execute a $5,000 wire transfer from Account ****4521 to Account ****8903."
          impactStatement="$5,000.00 will be transferred immediately. This action is irreversible."
          signerIdentity="alice@company.com"
          terms={[
            { id: 't1', text: 'I authorize the transfer of $5,000.00 to Account ****8903', acknowledged: false },
            { id: 't2', text: 'I understand this action is irreversible once confirmed', acknowledged: false }
          ]}
          status={status}
          approvalHandoff={{
            timeoutMs: 3000,
            fallbackBehavior: 'block',
          }}
          onSign={() => setStatus('signed')}
          onReject={() => setStatus('rejected')}
          onHandoff={async (ctx) => {
             console.log('Handed off to mobile wallet:', ctx);
             setStatus('handoff_pending');
          }}
        />
        {status === 'handoff_pending' && (
           <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontFamily: 'sans-serif', fontSize: '12px' }}>
             <button onClick={() => setStatus('signed')} style={{ padding: '0.4rem', background: '#e0e7ff', border: '1px solid #4f46e5', borderRadius: '4px', cursor: 'pointer' }}>📱 Simulate Mobile 'SIGN'</button>
             <button onClick={() => setStatus('handoff_denied')} style={{ padding: '0.4rem', background: '#fee2e2', border: '1px solid #ef4444', borderRadius: '4px', cursor: 'pointer' }}>📱 Simulate Mobile 'DENY'</button>
           </div>
        )}
        {status !== 'reviewing' && status !== 'handoff_pending' && (
           <button onClick={() => setStatus('reviewing')} style={{ marginTop: '1rem', padding: '0.4rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', alignSelf: 'flex-start' }}>↻ Reset Gateway</button>
        )}
      </div>
    );
  }
};
