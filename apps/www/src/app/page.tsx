import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 text-center">
      <div className="max-w-2xl">
        <p className="text-sm font-mono text-fd-muted-foreground mb-3 tracking-widest uppercase">
          React · TypeScript · CSS Modules
        </p>
        <h1 className="text-5xl font-bold tracking-tight mb-4">Depute</h1>
        <p className="text-xl text-fd-muted-foreground mb-8">
          React primitives for the human side of agentic AI.
          Purpose-built UI for agent supervision, approval gates, confidence
          signals, and human oversight.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
          >
            Browse components →
          </Link>
          <a
            href="https://github.com/Iambizi/depute"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full text-left">
        {[
          {
            label: 'v0 — Single Agent',
            count: '6 components',
            desc: 'PlanCard, ApprovalGate, ConfidenceMeter, RunControls, ToolTrace, ArtifactCard',
          },
          {
            label: 'v1 — Multi-Agent',
            count: '11 components',
            desc: 'OrchestratorView, AgentRoster, SwarmMonitor, DelegationGate, and more',
          },
          {
            label: 'CLI install',
            count: 'npx ax-depute add',
            desc: 'Copy component source directly into your project. You own the code.',
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-fd-border p-4 bg-fd-card"
          >
            <p className="text-xs text-fd-muted-foreground mb-1">{item.label}</p>
            <p className="font-semibold font-mono text-sm mb-2">{item.count}</p>
            <p className="text-xs text-fd-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
