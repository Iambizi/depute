export interface HandoffPayloadItem {
  label: string;
  value: string;
}

export interface HandoffProtocolProps {
  /** The root layout class name */
  className?: string;
  /** Agent sending the context */
  sourceAgent: string;
  /** Agent or human receiving the context */
  destinationAgent: string;
  /** The high-level goal/intent being transferred */
  goal: string;
  /** A readable summary of what has been accomplished so far */
  summary: string;
  /** The structured context payload being handed off */
  payload?: HandoffPayloadItem[];
  /** What is needed from the receiving agent/human */
  nextRequest?: string;
  /** If true, the human can intercept before the handoff proceeds */
  canIntercept?: boolean;
  /** Called when the user approves the handoff */
  onAccept?: () => void;
  /** Called when the user intercepts and overrides */
  onIntercept?: () => void;
  /** Called when the user cancels the handoff */
  onCancel?: () => void;
}
