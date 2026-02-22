export interface HandoffProtocolProps {
  /** The root layout class name */
  className?: string;
  sourceAgent: string;
  destinationAgent: string;
  goal: string;
  payloadSummary: string;
  onIntercept?: () => void;
}
