# AX Components

> The human-facing interface for Agentic Experience (AX)

AX Components is a collection of React primitives designed specifically for Agentic Experience. It bridges the gap between what AI agents are doing in the background (planning, reasoning, executing tools) and what human users need to see to build trust.

Built on the **AXK (AX Kit)** distribution model, these components are designed to be copied directly into your project so you have full code ownership. They are built with Radix UI, Tailwind CSS, and strict accessibility standards.

## The v0 Primitives

| Component | Description |
|-----------|-------------|
| **`PlanCard`** | Displays a multi-step agent plan, tracking progress from pending to active to complete. |
| **`ApprovalGate`** | Halts agent execution to request human permission for high-risk or external actions. |
| **`ConfidenceMeter`** | Visually communicates an agent's confidence level in its proposed action or generated result. |
| **`RunControls`** | Toolbar for pausing, stopping, or retrying an active agent run. |
| **`ToolTrace`** | Expandable, streaming timeline of tools the agent is invoking (e.g., searches, terminal commands). |
| **`ArtifactCard`** | Renders the final output (markdown, JSON, code) of an agentic workflow with provenance metadata. |

## Quick Start (Prototyping)

The library includes robust mock data utilities so you can build out a full agentic UI *before* you've even written a line of backend agent code.

```tsx
import { 
  PlanCard, 
  ToolTrace, 
  ApprovalGate,
  generateMockPlan,
  generateMockToolCalls
} from '@/components/ax';

export function AgentPrototype() {
  const plan = generateMockPlan(3);
  const trace = generateMockToolCalls(2);
  
  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      <PlanCard 
        title="Researching SpaceX" 
        steps={plan.steps} 
        activeStepId={plan.steps[1].id} 
      />
      <ToolTrace calls={trace} />
      <ApprovalGate 
        mode="staged" 
        status="pending" 
        onApprove={() => console.log('Approved!')} 
      />
    </div>
  );
}
```

## Production Integration

When you're ready to wire it to a real agent (e.g. LangChain, OpenAI, Claude), simply swap the mock data for real event streams:

```tsx
export function AgentProduction() {
  // E.g., a hook that listens to SSE from your backend
  const { plan, activeStepId, toolCalls, status } = useAgentStream('/api/chat');
  
  return (
    <div className="space-y-6">
      <PlanCard 
        title="Researching SpaceX" 
        steps={plan.steps} 
        activeStepId={activeStepId} 
      />
      <ToolTrace calls={toolCalls} />
      {status === 'awaiting_approval' && (
        <ApprovalGate 
          mode="staged" 
          status="pending" 
          onApprove={() => api.approveRun()} 
        />
      )}
    </div>
  );
}
```

## Distribution Model (AXK)

We don't distribute via strict `npm` dependencies. Agents cannot easily customize UI they don't own. Instead, we use the shadcn/ui "copy-paste" model:

1. Copy the primitive's source code into your project.
2. Customize the Tailwind styling to match your brand.
3. Edit the component's internal behavior if your agent needs custom props.

*(Note: The `axk` CLI is still in development. For now, components are available in this repository under `src/components/`)*.

## Development

To view the interactive documentation and component playground:

```bash
npm install
npm run storybook
```

## Contributing
We welcome contributions to the primitive catalog, a11y improvements, and new design patterns. Please see our [technical architecture](docs/orchestration/02-technical-architecture.md) and [standards](docs/orchestration/07-universal-format-standards.md) before submitting a PR.

## License
MIT
