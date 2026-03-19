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
