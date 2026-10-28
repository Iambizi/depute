import type { ApprovalReceipt } from './receipt';

/** Download the receipt as pretty JSON. The hash is already inside the file. */
export function downloadApprovalReceipt(receipt: ApprovalReceipt): void {
  const json = `${JSON.stringify(receipt, null, 2)}\n`;
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${receipt.id}.receipt.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
