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
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-fd-foreground">
          depute
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-fd-muted-foreground">
          <Link href="/demo" className="hover:text-fd-foreground">Demo</Link>
          <Link href="/docs" className="hover:text-fd-foreground">Docs</Link>
          <Link href="/docs/components/plan-card" className="hover:text-fd-foreground">Components</Link>
          <a href="https://github.com/Iambizi/depute" className="hover:text-fd-foreground">GitHub</a>
          <a href="https://iambizi.github.io/depute/" className="hover:text-fd-foreground">Storybook</a>
        </nav>
      </header>
      {/* Dynamic Background Glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 w-[800px] h-[500px] bg-fd-foreground/5 blur-[120px] rounded-full aspect-square -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-fd-foreground/5 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 opacity-30" />
      
      {/* Pixel Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            'linear-gradient(var(--fd-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--fd-foreground) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-20 pb-24 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-medium rounded-full border border-fd-border bg-fd-muted text-fd-foreground shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-fd-primary animate-pulse" />
            v0.4.3: Async Approval Handoff
          </span>
        </motion.div>

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
            className="group relative inline-flex items-center gap-2 rounded-full bg-fd-foreground px-6 py-3 text-sm font-medium text-fd-background transition-all hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center gap-2">
              Open the paper desk
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-background px-6 py-3 text-sm font-medium transition-all hover:bg-fd-accent hover:scale-105"
          >
            Browse components
          </Link>
          <a
            href="https://github.com/Iambizi/depute"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-background px-6 py-3 text-sm font-medium transition-all hover:bg-fd-accent hover:scale-105"
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
          <div className="inline-flex items-center gap-4 px-6 py-4 font-mono text-sm text-fd-muted-foreground bg-fd-card/50 backdrop-blur-sm border border-fd-border rounded-xl shadow-sm">
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
          <div className="rounded-2xl border border-fd-border bg-fd-card/40 backdrop-blur-sm shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-fd-foreground/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            <div className="relative flex items-center px-4 py-3 border-b border-fd-border bg-fd-muted/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-fd-border/50" />
                <div className="w-3 h-3 rounded-full bg-fd-border/50" />
                <div className="w-3 h-3 rounded-full bg-fd-border/50" />
              </div>
              <p className="mx-auto text-xs font-mono text-fd-muted-foreground absolute left-1/2 -translate-x-1/2">Oversight in action</p>
            </div>
            
            <div className="relative p-8 md:p-12 bg-gradient-to-br from-fd-background to-fd-card">
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
              className="group relative rounded-2xl border border-fd-border bg-fd-card/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-fd-foreground/30 hover:shadow-2xl hover:bg-fd-card"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-fd-foreground/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-fd-muted text-fd-foreground shadow-sm">
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
                  className="block h-full rounded-2xl border border-fd-border bg-fd-card/50 p-6 hover:border-fd-foreground/30"
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
