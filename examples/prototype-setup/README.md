# AX Components: Prototype Setup Example

This example demonstrates how to build a complete agent execution UI using AX Components **before** you write any real backend agent capability. Let the design lead the agent's expected behavior.

## Concept

When designing Agentic Experiences (AX), the way the agent communicates trust and status is just as important as the intelligence itself. Using the included `mockData.ts` utilities, you can wire together a `PlanCard`, `ToolTrace`, and `ApprovalGate` to test the user experience of your intended workflow.

## Running the Example

In a real project, this setup assumes you have copied the AXK components into your `src/components/` directory.

### `App.tsx`
This example simulates a multi-step agent flow that starts immediately, streams log entries, and pauses to ask for human approval before charging a simulated card.

```tsx
import React, { useState, useEffect } from 'react';

// AX Component Primitives
import { PlanCard } from '../../src/components/PlanCard/PlanCard';
import { ToolTrace } from '../../src/components/ToolTrace/ToolTrace';
import { ApprovalGate } from '../../src/components/ApprovalGate/ApprovalGate';
import { ConfidenceMeter } from '../../src/components/ConfidenceMeter/ConfidenceMeter';
import { RunControls } from '../../src/components/RunControls/RunControls';

// AX Component Mock Generators
import {
  generateMockPlan,
  simulatePlanExecution,
  simulateToolStream,
  generateMockApproval,
  MOCK_TOOL_NAMES
} from '../../src/utils/mockData';

import type { PlanStep, ToolCall, ApprovalRequest } from '../../src/types/common';

export default function PrototypeApp() {
  const [planSteps, setPlanSteps] = useState<PlanStep[]>([]);
  const [activeStepId, setActiveStepId] = useState<string>();
  
  const [tools, setTools] = useState<ToolCall[]>([]);
  
  const [approval, setApproval] = useState<ApprovalRequest | null>(null);
  const [status, setStatus] = useState<'idle' | 'running' | 'paused' | 'completed' | 'failed'>('idle');

  // Trigger the simulation on mount
  useEffect(() => {
    // 1. Generate the initial static plan
    const initialPlan = generateMockPlan(3);
    setPlanSteps(initialPlan.steps);
    setActiveStepId(initialPlan.steps[0].id);
    setStatus('running');

    // 2. Start the Plan Simulation (auto advances steps 1 -> 2 -> 3)
    const stopPlan = simulatePlanExecution(
      initialPlan.steps,
      (updatedSteps, newActiveId) => {
        setPlanSteps(updatedSteps);
        setActiveStepId(newActiveId);
        
        // Once the final step is reached, pause the run and trigger an approval gate
        if (newActiveId === undefined) {
          setStatus('paused');
          setApproval(
            generateMockApproval('staged', 'resource', {
              action: 'Execute Transaction',
              amount: '$45.00',
              destination: 'Stripe API'
            })
          );
        }
      },
      2500 // 2.5s per step
    );

    // 3. Start the Tool Stream Simulation (simulates typing out terminal logs)
    const stopTools = simulateToolStream(
      MOCK_TOOL_NAMES,
      (newToolEntries) => {
        setTools(newToolEntries);
      },
      800 // new tool every ~0.8s
    );

    // Cleanup simulations on unmount
    return () => {
      stopPlan();
      stopTools();
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-8 font-sans">
      <header className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agent Dashboard</h1>
          <p className="text-gray-500">Prototyping mode with mock streams</p>
        </div>
        <div className="flex items-center gap-4">
          <ConfidenceMeter value={92} display="badge" />
          <RunControls 
            status={status} 
            onPause={() => setStatus('paused')}
            onResume={() => setStatus('running')}
            onStop={() => setStatus('failed')}
          />
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <PlanCard
            title="Processing User Request"
            steps={planSteps}
            activeStepId={activeStepId}
          />
          
          {approval && status === 'paused' && (
            <ApprovalGate
              {...approval}
              onApprove={() => {
                setStatus('completed');
                setApproval(null);
              }}
              onReject={() => {
                setStatus('failed');
                setApproval(null);
              }}
            />
          )}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-xl border">
          <h3 className="text-sm font-semibold uppercase text-gray-400 tracking-wider mb-4">Event Trace</h3>
          <ToolTrace 
            calls={tools} 
            maxHeight="500px" 
          />
        </div>
      </div>
    </div>
  );
}
```
