import Link from 'next/link';
import { GeistPixelGrid, GeistPixelSquare } from 'geist/font/pixel';

const features = [
  {
    label: 'Single Agent',
    count: '6',
    items: ['PlanCard', 'ApprovalGate', 'ConfidenceMeter', 'RunControls', 'ToolTrace', 'ArtifactCard'],
  },
  {
    label: 'Multi-Agent',
    count: '11',
    items: ['OrchestratorView', 'AgentRoster', 'SwarmMonitor', 'DelegationGate', 'TaskQueue', '+6 more'],
  },
  {
    label: 'CLI',
    count: 'npx',
    items: ['ax-depute add <component>', 'Copy source into your project', 'You own the code'],
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-fd-background">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--fd-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--fd-foreground) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-12 pb-12 text-center">
        {/* <p className="mb-6 text-xs tracking-[0.25em] uppercase text-fd-muted-foreground font-mono">
          React · TypeScript · CSS Modules
        </p> */}

        <h1
          className={`${GeistPixelSquare.className} text-7xl sm:text-8xl md:text-9xl tracking-tight mb-6 bg-gradient-to-b from-fd-foreground to-fd-muted-foreground bg-clip-text text-transparent`}
          style={{ WebkitTextStroke: '1px var(--color-fd-foreground)' }}
        >
          Depute
        </h1>

        <p className="max-w-xl text-lg text-fd-muted-foreground leading-relaxed mb-10">
          React primitives for the human side of agentic AI.
          <br />
          <span className="text-fd-foreground font-medium">
            Purpose-built UI for agent supervision and human oversight.
          </span>
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 rounded-full bg-fd-foreground px-6 py-3 text-sm font-medium text-fd-background transition-all hover:opacity-90 hover:scale-105"
          >
            Browse components
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <a
            href="https://github.com/Iambizi/depute"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-fd-border px-6 py-3 text-sm font-medium transition-all hover:bg-fd-accent hover:scale-105"
          >
            GitHub
          </a>
        </div>

        {/* Install command */}
        <div className="mt-8 font-mono text-sm text-fd-muted-foreground bg-fd-card border border-fd-border rounded-full px-5 py-2">
          <span className="text-fd-muted-foreground/60">$</span>{' '}
          npx ax-depute add {'<component>'}
        </div>
      </section>

      {/* Feature cards */}
      <section className="relative px-6 pb-24">
        <div className="mx-auto grid max-w-4xl grid-cols-1 sm:grid-cols-3 gap-5">
          {features.map((feat) => (
            <div
              key={feat.label}
              className="group rounded-xl border border-fd-border bg-fd-card/50 p-6 transition-all hover:border-fd-foreground/20 hover:bg-fd-card"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  className={`${GeistPixelGrid.className} text-3xl font-bold text-fd-foreground`}
                >
                  {feat.count}
                </span>
                <span className="text-xs uppercase tracking-widest text-fd-muted-foreground font-medium">
                  {feat.label}
                </span>
              </div>
              <ul className="space-y-1.5">
                {feat.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-fd-muted-foreground font-mono"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
