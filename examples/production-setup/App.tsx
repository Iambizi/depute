import React from 'react';

// AX Component Primitives
import { PlanCard } from '../../src/components/PlanCard/PlanCard';
import { ToolTrace } from '../../src/components/ToolTrace/ToolTrace';
import { ApprovalGate } from '../../src/components/ApprovalGate/ApprovalGate';
import { ConfidenceMeter } from '../../src/components/ConfidenceMeter/ConfidenceMeter';
import { RunControls } from '../../src/components/RunControls/RunControls';
import { ArtifactCard } from '../../src/components/ArtifactCard/ArtifactCard';

// Real API Custom Hook (Hypothetical implementation)
// import { useAgentStream } from './hooks/useAgentStream';
const useAgentStream = (_endpoint: string) => ({
  startRun: (_prompt: string) => {},
  pauseRun: () => {},
  resumeRun: () => {},
  stopRun: () => {},
  approveStagedRun: () => {},
  rejectStagedRun: () => {},
  status: 'idle' as 'idle' | 'running' | 'paused' | 'completed' | 'failed',
  confidence: 0,
  planSteps: [],
  activeStepId: undefined,
  toolCalls: [],
  pendingApprovalRequest: null as any,
  finalArtifact: null as any,
});

export default function ProductionApp() {
  // Wait for user input to start the run
  const [prompt, setPrompt] = React.useState('');
  
  // The hook handles the heavy lifting of accumulating the streamed tokens/json-patches
  // The variables exactly map to the props expected by AX primitives
  const { 
    startRun, 
    pauseRun,
    resumeRun,
    stopRun,
    approveStagedRun,
    rejectStagedRun,
    
    // State
    status,
    confidence, // 0-100 number
    planSteps,
    activeStepId,
    toolCalls,
    pendingApprovalRequest,
    finalArtifact
  } = useAgentStream('/api/agent-endpoint');

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-8 font-sans">
      <header className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agent Dashboard</h1>
          <p className="text-gray-500">Production Mode: Live Agent Connection</p>
        </div>
        
        {status !== 'idle' && (
          <div className="flex items-center gap-4">
            <ConfidenceMeter value={confidence} display="badge" />
            <RunControls 
              status={status} 
              onPause={pauseRun}
              onResume={resumeRun}
              onStop={stopRun}
            />
          </div>
        )}
      </header>
      
      {status === 'idle' ? (
        <div className="flex gap-2">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 border p-2 rounded" 
            placeholder="Instruct the agent..." 
          />
          <button 
            onClick={() => startRun(prompt)}
            className="bg-black text-white px-4 py-2 rounded font-medium"
          >
            Start
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <PlanCard
              title="Execution Plan"
              steps={planSteps}
              activeStepId={activeStepId}
            />
            
            {pendingApprovalRequest && (
              <ApprovalGate
                {...pendingApprovalRequest}
                onApprove={approveStagedRun}
                onReject={rejectStagedRun}
              />
            )}
            
            {finalArtifact && status === 'completed' && (
              <ArtifactCard 
                artifact={finalArtifact} 
                exportFormats={['markdown']}
              />
            )}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-xl border max-h-[600px] overflow-y-auto">
            <h3 className="text-sm font-semibold uppercase text-gray-400 tracking-wider mb-4">Event Trace</h3>
            <ToolTrace 
              calls={toolCalls} 
              autoScroll={status === 'running'} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
