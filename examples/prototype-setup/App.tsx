import * as React from 'react';
import { useState, useEffect } from 'react';

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
import type { PlanStep, ToolCall, RunState } from '../../src/types/common';
import type { ApprovalGateProps } from '../../src/components/ApprovalGate/ApprovalGate.types';

export default function PrototypeApp() {
  const [planSteps, setPlanSteps] = useState<PlanStep[]>([]);
  const [activeStepId, setActiveStepId] = useState<string>();
  
  const [tools, setTools] = useState<ToolCall[]>([]);
  
  const [approval, setApproval] = useState<ApprovalGateProps | null>(null);
  const [status, setStatus] = useState<RunState>('idle');

  // Trigger the simulation on mount
  useEffect(() => {
    // 1. Generate the initial static plan
    const initialPlan = generateMockPlan({ stepCount: 3 });
    setPlanSteps(initialPlan.steps);
    setActiveStepId(initialPlan.steps[0].id);
    setStatus('running');

    const { cancel: cancelPlan } = simulatePlanExecution({
      steps: initialPlan.steps,
      onUpdate: (updatedSteps: PlanStep[]) => {
        setPlanSteps(updatedSteps);
        const activeId = updatedSteps.find(s => s.status === 'active')?.id;
        setActiveStepId(activeId);
        
        if (activeId === undefined) {
          setStatus('paused');
          setApproval(
            generateMockApproval({
              mode: 'staged',
              scope: { target: 'Stripe API' },
            })
          );
        }
      },
      intervalMs: 2500
    });

    const { cancel: cancelTools } = simulateToolStream({
      onCall: (call: ToolCall) => {
        setTools(prev => [...prev, call]);
      },
      intervalMs: 800
    });

    // Cleanup simulations on unmount
    return () => {
      cancelPlan();
      cancelTools();
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
            state={status} 
            onPause={() => setStatus('paused')}
            onStart={() => setStatus('running')}
            onStop={() => setStatus('failed')}
            onRetry={() => {
              setStatus('running');
              if (planSteps.length > 0) {
                setActiveStepId(planSteps[0].id);
              }
            }}
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
