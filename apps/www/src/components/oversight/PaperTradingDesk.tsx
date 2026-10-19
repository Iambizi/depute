'use client';

import { useEffect, useState } from 'react';
import type { ToolCall } from '@/depute/types/common';
import { PolicyBanner } from '@/depute/components/PolicyBanner';
import { BudgetMeter } from '@/depute/components/BudgetMeter';
import { ToolTrace } from '@/depute/components/ToolTrace';
import { ApprovalGate } from '@/depute/components/ApprovalGate';
import { AutomationBiasAlert } from '@/depute/components/AutomationBiasAlert';
import { useAutomationBias } from '@/depute/components/AutomationBiasAlert/useAutomationBias';
import { DecisionRecord } from '@/depute/components/DecisionRecord';
import { SessionOverview } from '@/depute/components/SessionOverview';
import { TransactionReceipt } from '@/depute/components/TransactionReceipt';

type Phase = 'idle' | 'researching' | 'awaiting' | 'filled' | 'rejected';

const PLAN = {
  symbol: 'AAPL',
  side: 'Buy',
  quantity: 40,
  entry: 228.4,
  stop: 221.1,
  target: 241.0,
  zone: 'Price is in the lower third of the 20-day range.',
  news: 'Supplier headline at 09:41. Guidance was unchanged, so the agent did not cancel the plan.',
};

const PAPER_HASH = 'paper-fill-aapl-40';

function researchCalls(): ToolCall[] {
  const now = new Date().toISOString();
  return [
    {
      id: 'quote',
      name: 'market.quote',
      status: 'completed',
      timestamp: now,
      duration: 80,
      input: { symbol: PLAN.symbol },
      output: { last: PLAN.entry, currency: 'USD' },
    },
    {
      id: 'trend',
      name: 'market.zone',
      status: 'completed',
      timestamp: now,
      duration: 120,
      input: { symbol: PLAN.symbol, window: '20d' },
      output: { note: PLAN.zone },
    },
    {
      id: 'news',
      name: 'market.news',
      status: 'completed',
      timestamp: now,
      duration: 140,
      input: { symbol: PLAN.symbol },
      output: { note: PLAN.news },
      policyFlags: { requiresApproval: true, externalAction: true },
    },
  ];
}

export function PaperTradingDesk() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [calls, setCalls] = useState<ToolCall[]>([]);
  const [spent, setSpent] = useState(0);
  const [commitAfterReview, setCommitAfterReview] = useState(false);
  const bias = useAutomationBias({ minApprovalTimeMs: 800, consecutiveApprovals: 8 });

  useEffect(() => {
    if (!commitAfterReview || bias.isAlertTriggered) return;
    setCommitAfterReview(false);
    setSpent(PLAN.entry * PLAN.quantity);
    setPhase('filled');
    setCalls((prev) => [
      ...prev,
      {
        id: 'fill',
        name: 'paper.order',
        status: 'completed',
        timestamp: new Date().toISOString(),
        duration: 40,
        input: { symbol: PLAN.symbol, quantity: PLAN.quantity, type: 'limit' },
        output: { fillId: PAPER_HASH, venue: 'paper' },
      },
    ]);
  }, [commitAfterReview, bias.isAlertTriggered]);

  function propose() {
    setPhase('researching');
    setCalls([]);
    setSpent(0);
    setCommitAfterReview(false);
    window.setTimeout(() => {
      setCalls(researchCalls());
      setPhase('awaiting');
    }, 700);
  }

  function approve() {
    bias.recordAction('approved');
    setCommitAfterReview(true);
  }

  function reject() {
    bias.recordAction('rejected');
    setCommitAfterReview(false);
    setPhase('rejected');
  }

  const notional = PLAN.entry * PLAN.quantity;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-2">
        <p className="font-mono text-xs uppercase tracking-wide text-fd-muted-foreground">Paper trading</p>
        <h1 className="text-3xl font-semibold tracking-tight text-fd-foreground">Oversight desk</h1>
        <p className="max-w-2xl text-fd-muted-foreground">
          A scripted agent proposes one stock order. Nothing here talks to an exchange or holds an API key.
          The receipt hash is a label from this demo, not a signature. This is not investment advice.
        </p>
      </header>

      <PolicyBanner
        mode="sandbox"
        label="Paper trading"
        description="Orders stay on this page. No broker, no funds."
        constraints={[
          { label: 'Venue', value: 'Local script' },
          { label: 'Max order', value: '$10,000' },
        ]}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <BudgetMeter
          label="Max order"
          spent={spent}
          limit={10000}
          unit="currency"
          formatValue={(value) => `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
        />
        <SessionOverview
          sessionSummary={
            phase === 'filled'
              ? `Paper fill: buy ${PLAN.quantity} ${PLAN.symbol} at ${PLAN.entry}.`
              : 'The agent has not sent an order yet.'
          }
          duration={phase === 'idle' ? '0s' : 'under 1 min'}
          surfacesTouched={[
            { type: 'api', label: 'Quote, zone, and news tools', action: 'read' },
            { type: 'system', label: 'Paper order blotter', action: phase === 'filled' ? 'write' : 'read' },
          ]}
          keyDecisions={
            phase === 'filled'
              ? [{ description: 'Person approved the staged order after the news note.' }]
              : [{ description: 'Large orders wait for a staged approval.' }]
          }
        />
      </div>

      <ToolTrace calls={calls} expandable />

      {phase === 'idle' || phase === 'researching' ? (
        <button
          type="button"
          className="inline-flex w-fit items-center rounded-full bg-fd-foreground px-5 py-2.5 text-sm font-medium text-fd-background disabled:opacity-60"
          onClick={propose}
          disabled={phase === 'researching'}
        >
          {phase === 'researching' ? 'Reading the market…' : 'Propose a paper trade'}
        </button>
      ) : null}

      {phase === 'awaiting' && (
        <AutomationBiasAlert
          isActive={bias.isAlertTriggered}
          actionName={`the ${PLAN.symbol} order`}
          onAcknowledge={bias.dismissAlert}
        >
          <ApprovalGate
            title={`Buy ${PLAN.quantity} ${PLAN.symbol}`}
            description={`${PLAN.side} ${PLAN.quantity} shares. Entry ${PLAN.entry}, stop ${PLAN.stop}, target ${PLAN.target}. Notional $${notional.toLocaleString('en-US')}.`}
            agentReasoning={`${PLAN.zone} ${PLAN.news}`}
            mode="staged"
            confidence={71}
            scope={{ resourceLimit: `$${notional.toLocaleString('en-US')}`, target: PLAN.symbol }}
            metadata={{
              Zone: 'Lower third of the 20-day range',
              News: 'Headline noted, plan kept',
            }}
            onApprove={approve}
            onReject={reject}
          />
        </AutomationBiasAlert>
      )}

      {phase === 'filled' && (
        <>
          <p className="sr-only" aria-live="polite">Approved. Receipt paper-fill-aapl-40 recorded.</p>
          <DecisionRecord
            decision="approved"
            approver={{ name: 'You', role: 'Supervisor', timestamp: new Date() }}
            agentContext={{
              intent: `Buy ${PLAN.quantity} ${PLAN.symbol} with stop ${PLAN.stop} and target ${PLAN.target}.`,
              policyInvoked: 'Paper trading, staged approval above $5,000',
            }}
            humanReasoning="Approved on the paper desk after reading the zone and the news note."
          />
          <TransactionReceipt
            transactionId={PAPER_HASH}
            title="Paper fill"
            status="success"
            timestamp={new Date().toISOString()}
            agentId="paper-agent"
            hash={PAPER_HASH}
            lineItems={[
              { label: 'Symbol', value: PLAN.symbol },
              { label: 'Quantity', value: String(PLAN.quantity) },
              { label: 'Entry', value: String(PLAN.entry), highlight: true },
              { label: 'Stop', value: String(PLAN.stop) },
              { label: 'Target', value: String(PLAN.target) },
            ]}
          />
        </>
      )}

      {phase === 'rejected' && (
        <DecisionRecord
          decision="rejected"
          approver={{ name: 'You', role: 'Supervisor', timestamp: new Date() }}
          agentContext={{ intent: `Buy ${PLAN.quantity} ${PLAN.symbol}.` }}
          humanReasoning="Rejected on the paper desk. No order was sent."
        />
      )}
    </div>
  );
}
