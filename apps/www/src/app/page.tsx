'use client';

import Link from 'next/link';
import { GeistPixelGrid, GeistPixelSquare } from 'geist/font/pixel';
import { motion } from 'framer-motion';
import { AgentRosterDemo } from '@/components/demos/AgentRosterDemo';
import { Terminal, Shield, Workflow, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-5 h-5" />,
    label: 'Single Agent',
    count: '6',
    items: ['PlanCard', 'ApprovalGate', 'ConfidenceMeter', 'RunControls', 'ToolTrace', 'ArtifactCard'],
  },
  {
    icon: <Workflow className="w-5 h-5" />,
    label: 'Multi-Agent',
    count: '11',
    items: ['OrchestratorView', 'AgentRoster', 'SwarmMonitor', 'DelegationGate', 'TaskQueue', '+6 more'],
  },
  {
    icon: <Terminal className="w-5 h-5" />,
    label: 'CLI',
    count: 'npx',
    items: ['ax-depute@latest add <component>', 'Copy source into your project', 'You own the code'],
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-fd-background selection:bg-fd-focus">
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
      <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-medium rounded-full border border-fd-border bg-fd-muted text-fd-foreground shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-fd-primary animate-pulse" />
            v0.2.0: Multi-Agent Orchestration
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex justify-center"
        >
          <img src="/logo.png" alt="Depute Logo" className="w-32 h-32 md:w-36 md:h-36 drop-shadow-2xl" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className={`${GeistPixelSquare.className} text-7xl sm:text-8xl md:text-9xl tracking-tight mb-8 bg-gradient-to-b from-fd-foreground to-fd-muted-foreground bg-clip-text text-transparent`}
          style={{ WebkitTextStroke: '1px var(--color-fd-foreground)' }}
        >
          Depute
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="max-w-xl text-xl text-fd-muted-foreground leading-relaxed mb-10"
        >
          React primitives for the human side of agentic AI.
          <br />
          <span className="text-fd-foreground font-medium">
            Purpose-built UI for agent supervision and human oversight.
          </span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="flex gap-4 flex-wrap justify-center mb-12"
        >
          <Link
            href="/docs"
            className="group relative inline-flex items-center gap-2 rounded-full bg-fd-foreground px-6 py-3 text-sm font-medium text-fd-background transition-all hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center gap-2">
              Browse components
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
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
      </section>

      {/* Show, Don't Tell Demo Section */}
      <section className="relative px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: 'easeOut' }}
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
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
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
        <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
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

      {/* CTA Section */}
      <section className="relative px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-fd-foreground mb-8">
            Build safer agents today.
          </h2>
          <div className="inline-flex items-center gap-4 px-6 py-4 font-mono text-sm text-fd-muted-foreground bg-fd-card border border-fd-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <span className="text-fd-muted-foreground/60">$</span> 
            <span className="text-fd-foreground">npx ax-depute@latest add {'<component>'}</span>
            <div className="h-4 w-px bg-fd-border mx-2" />
            <span className="text-xs opacity-50 uppercase tracking-widest">Copy Source</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
