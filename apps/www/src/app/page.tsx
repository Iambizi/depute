'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GeistPixelGrid } from 'geist/font/pixel';
import { motion } from 'framer-motion';
import { AgentRosterDemo } from '@/components/demos/AgentRosterDemo';
import { Terminal, Shield, Workflow, ArrowRight, Lock } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-5 h-5" />,
    label: 'Single Agent',
    count: '7',
    items: ['PlanCard', 'ApprovalGate', 'ConfidenceMeter', 'RunControls', 'ToolTrace', 'ArtifactCard', 'AutomationBiasAlert'],
  },
  {
    icon: <Workflow className="w-5 h-5" />,
    label: 'Multi-Agent',
    count: '11',
    items: ['OrchestratorView', 'AgentRoster', 'SwarmMonitor', 'DelegationGate', 'TaskQueue', '+6 more'],
  },
  {
    icon: <Lock className="w-5 h-5" />,
    label: 'Compliance',
    count: '9',
    items: ['BindingApproval', 'StateDiff', 'TransactionReceipt', 'RollbackTimeline', 'CapabilityMatrix', '+4 more'],
  },
  {
    icon: <Terminal className="w-5 h-5" />,
    label: 'CLI Format',
    count: 'npx',
    items: ['ax-depute@latest add <component>', 'Copy source into your project', 'You own the code'],
  },
];

const showcase = [
  {
    name: 'ApprovalGate',
    href: '/docs/components/approval-gate',
    blurb: 'Stop a high-risk action until a person approves, rejects, or stages it.',
  },
  {
    name: 'AutomationBiasAlert',
    href: '/docs/components/automation-bias-alert',
    blurb: 'Add friction when approvals start looking like rubber stamps.',
  },
  {
    name: 'BudgetMeter',
    href: '/docs/components/budget-meter',
    blurb: 'Show session spend against a limit, with a visible burn rate.',
  },
  {
    name: 'ToolTrace',
    href: '/docs/components/tool-trace',
    blurb: 'Read every tool call, including input, output, and failure.',
  },
  {
    name: 'DecisionRecord',
    href: '/docs/components/decision-record',
    blurb: 'Keep a receipt of who approved an action and why.',
  },
  {
    name: 'SessionOverview',
    href: '/docs/components/session-overview',
    blurb: 'Roll up what the agent touched so the blast radius stays visible.',
  },
];

const installCommand = 'npx ax-depute@latest add approval-gate';

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  async function copyInstallCommand() {
    try {
      await navigator.clipboard.writeText(installCommand);
    } catch {
      const field = document.createElement('textarea');
      field.value = installCommand;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.left = '-9999px';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="relative min-h-screen overflow-x-clip bg-fd-background selection:bg-fd-focus">
      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="text-fd-foreground" aria-label="depute">
          <img src="/title-logo.webp" alt="" className="h-8 w-auto" />
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-fd-muted-foreground">
          <Link href="/demo" className="hover:text-fd-foreground">Demo</Link>
          <Link href="/docs" className="hover:text-fd-foreground">Docs</Link>
          <Link href="/docs/components/plan-card" className="hover:text-fd-foreground">Components</Link>
          <a href="https://github.com/Iambizi/depute" className="hover:text-fd-foreground">GitHub</a>
          <a href="https://iambizi.github.io/depute/" className="hover:text-fd-foreground">Storybook</a>
        </nav>
      </header>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-20 pb-24 text-center">
        <p className="mb-4 text-sm text-fd-muted-foreground">
          <Link href="/docs/theming">v0.5.0: Dark mode and one visual system</Link>
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="relative z-10 px-4 -mt-4 md:-mt-8 -mb-4 md:-mb-8 max-w-[340px] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[950px] mx-auto"
        >
          <img src="/title-logo.webp" alt="Depute Title" className="w-full h-auto drop-shadow-2xl" />
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute text-[8px] md:text-sm font-mono text-fd-muted-foreground w-max"
            style={{ bottom: "25%", right: "27%" }}
          >
            (dih-PYOOT)
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="max-w-xl text-xl text-fd-muted-foreground leading-relaxed mb-6"
        >
          The UI layer for AI agent oversight.
          <br />
          <span className="text-fd-foreground font-medium">
            Components for humans who can&apos;t let agents run unchecked.
          </span>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          className="max-w-2xl text-base text-fd-muted-foreground leading-relaxed mb-10"
        >
          AI agents can now send emails, execute trades, and deploy code. When actions are irreversible, oversight stops being optional.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="flex gap-4 flex-wrap justify-center mb-12"
        >
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-full bg-fd-foreground px-6 py-3 text-sm font-medium text-fd-background"
          >
            <span className="relative flex items-center gap-2">
              Open the paper desk
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-background px-6 py-3 text-sm font-medium hover:bg-fd-accent"
          >
            Browse components
          </Link>
          <a
            href="https://github.com/Iambizi/depute"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-background px-6 py-3 text-sm font-medium hover:bg-fd-accent"
          >
            GitHub
          </a>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={false}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fd-foreground mb-6">
            Implement reliable human oversight today.
          </h2>
          <div className="inline-flex items-center gap-4 px-6 py-4 font-mono text-sm text-fd-muted-foreground bg-fd-card border border-fd-border rounded-xl">
            <span className="text-fd-muted-foreground/60">$</span>
            <span className="text-fd-foreground">{installCommand}</span>
            <div className="h-4 w-px bg-fd-border mx-2" />
            <button
              type="button"
              onClick={copyInstallCommand}
              aria-label="Copy install command"
              className="text-xs uppercase tracking-widest text-fd-foreground hover:opacity-70"
            >
              {copied ? 'Copied' : 'Copy source'}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Show, Don't Tell Demo Section */}
      <section className="relative px-6 pb-32">
        <motion.div 
          initial={false}
          className="max-w-5xl mx-auto"
        >
          <div className="overflow-hidden">
            <div className="relative flex items-center px-4 py-3 border-b border-fd-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-fd-border/50" />
                <div className="w-3 h-3 rounded-full bg-fd-border/50" />
                <div className="w-3 h-3 rounded-full bg-fd-border/50" />
              </div>
              <p className="mx-auto text-xs font-mono text-fd-muted-foreground absolute left-1/2 -translate-x-1/2">Oversight in action</p>
            </div>
            
            <div className="relative p-8 md:p-12">
              <AgentRosterDemo />
            </div>
          </div>
        </motion.div>
      </section>

      {/* The Problem / Philosophy Section */}
      <section className="relative px-6 pb-32">
        <motion.div 
          initial={false}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-fd-foreground mb-6">
            Agents act. <span className="text-fd-muted-foreground">Humans supervise.</span>
          </h2>
          <p className="text-lg md:text-xl text-fd-muted-foreground leading-relaxed">
            As AI transitions from generating text to executing irreversible actions in the real world, the primary bottleneck is no longer intelligence; it&apos;s oversight. Depute provides the UI primitives required to build safe, auditable agentic systems where humans remain in the loop.
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative px-6 pb-32">
        <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => (
            <motion.div
              key={feat.label}
              initial={false}
              className="relative border-t border-fd-border p-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-fd-foreground">
                    {feat.icon}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-fd-muted-foreground">
                    {feat.label}
                  </span>
                </div>
                <div className="mb-6">
                  <span className={`${GeistPixelGrid.className} text-5xl font-bold text-fd-foreground transition-colors duration-300`}>
                    {feat.count}
                  </span>
                </div>
                <ul className="space-y-3">
                  {feat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-fd-muted-foreground font-mono">
                      <div className="w-1 h-1 rounded-full bg-fd-foreground/30 transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-fd-foreground mb-8 text-center">
            Install one component
          </h2>
          <ol className="space-y-6 text-left">
            <li>
              <p className="font-mono text-xs uppercase tracking-widest text-fd-muted-foreground mb-2">1. Copy the source</p>
              <pre className="overflow-x-auto rounded-xl border border-fd-border bg-fd-card px-4 py-3 text-sm text-fd-foreground"><code>npx ax-depute@latest add approval-gate</code></pre>
            </li>
            <li>
              <p className="font-mono text-xs uppercase tracking-widest text-fd-muted-foreground mb-2">2. Import the tokens once</p>
              <pre className="overflow-x-auto rounded-xl border border-fd-border bg-fd-card px-4 py-3 text-sm text-fd-foreground"><code>{`@import "./styles/depute.css";`}</code></pre>
            </li>
            <li>
              <p className="font-mono text-xs uppercase tracking-widest text-fd-muted-foreground mb-2">3. Render it</p>
              <pre className="overflow-x-auto rounded-xl border border-fd-border bg-fd-card px-4 py-3 text-sm text-fd-foreground"><code>{`import { ApprovalGate } from './components/ApprovalGate';`}</code></pre>
            </li>
          </ol>
        </div>
      </section>

      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold tracking-tight text-fd-foreground mb-8 text-center">
            Component showcase
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {showcase.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block h-full border-t border-fd-border p-6"
                >
                  <p className="font-mono text-sm text-fd-foreground mb-2">{item.name}</p>
                  <p className="text-sm text-fd-muted-foreground leading-relaxed">{item.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="relative border-t border-fd-border px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-fd-muted-foreground">
          <p>depute is MIT licensed. You own the component source.</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/docs" className="hover:text-fd-foreground">Docs</Link>
            <Link href="/docs/components/plan-card" className="hover:text-fd-foreground">Components</Link>
            <a href="https://github.com/Iambizi/depute" className="hover:text-fd-foreground">GitHub</a>
            <a href="https://iambizi.github.io/depute/" className="hover:text-fd-foreground">Storybook</a>
            <a href="/llms.txt" className="hover:text-fd-foreground">llms.txt</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
