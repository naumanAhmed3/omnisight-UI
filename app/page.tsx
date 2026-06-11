'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Eye,
  AlertTriangle,
  MessageSquare,
  ScanFace,
  Bell,
  Sparkles,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { Nav } from '@/components/nav';
import { OrchantaMark } from '@/components/orchanta-mark';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

const HARD_PROBLEMS = [
  {
    icon: Eye,
    title: "Attention doesn't scale",
    desc: 'Human focus breaks down past ~3 feeds. A wall of monitors becomes background noise within an hour.',
  },
  {
    icon: AlertTriangle,
    title: 'Motion alerts cry wolf',
    desc: 'Standard motion sensors fire on every shadow, leaf, and headlight. Real incidents get buried under false alarms.',
  },
];

const APPROACH = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Describe',
    desc: 'Write the rule in plain English — like "Person in restricted area after 6pm" or "Vehicle blocking the emergency exit". No special syntax. No new model to train.',
  },
  {
    step: '02',
    icon: ScanFace,
    title: 'Detect',
    desc: 'AI vision checks each frame from your camera against the rule you wrote. When it finds a match, faces in the frame are saved for the review gallery.',
  },
  {
    step: '03',
    icon: Bell,
    title: 'Alert',
    desc: 'When the AI confirms a match, you get an alert with the frame attached — in seconds, not minutes.',
  },
];

const STACK = ['Next.js 16', 'React 19', 'face-api.js', 'MediaPipe', 'ONNX Runtime', 'GPT-4o vision', 'Tailwind 4'];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-600/8 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/8 blur-[120px]" />
      </div>

      <Nav />

      {/* Hero */}
      <section className="relative max-w-5xl mx-auto px-6 pt-20 sm:pt-32 pb-16 sm:pb-24">
        <motion.div className="max-w-3xl" {...fadeUp}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-white/40 tracking-wide">Client engagement &middot; Live demo</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
            Watching 100 feeds is{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              impossible.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/45 max-w-xl leading-relaxed mb-4">
            What if you could just describe what you&apos;re looking for, in English?
          </p>

          <p className="text-sm text-white/30 max-w-lg leading-relaxed mb-10">
            <span className="text-white/70 font-medium">OmniSight</span> is an AI-assisted surveillance system: write a rule in plain English, and it watches every feed for it.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/demo/live"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-sm font-semibold hover:from-emerald-500 hover:to-cyan-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              Try it on your webcam
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/70 text-sm font-medium hover:text-white hover:border-white/[0.16] hover:bg-white/[0.04] transition-all"
            >
              How it works
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Why this is hard */}
      <section className="relative max-w-5xl mx-auto px-6 pb-20">
        <div className="mb-8">
          <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase">Why this is hard</span>
          <h2 className="text-2xl sm:text-3xl font-semibold mt-3 text-white/85 max-w-2xl leading-tight">
            More cameras, more guards, more motion alerts &mdash; none of it scales.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HARD_PROBLEMS.map((p, i) => (
            <motion.div
              key={i}
              className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              {...fadeUp}
              transition={{ delay: 0.1 * i }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4">
                <p.icon className="w-4 h-4 text-white/60" strokeWidth={1.75} />
              </div>
              <h3 className="text-sm font-semibold text-white/80 mb-2">{p.title}</h3>
              <p className="text-xs text-white/35 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The approach */}
      <section className="relative max-w-5xl mx-auto px-6 pb-20">
        <div className="mb-8">
          <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase">The approach</span>
          <h2 className="text-2xl sm:text-3xl font-semibold mt-3 text-white/85 max-w-2xl leading-tight">
            Describe &rarr; Detect &rarr; Alert.
          </h2>
          <p className="text-sm text-white/40 mt-3 max-w-xl leading-relaxed">
            Instead of training a model for every scenario, OmniSight lets you describe what you&apos;re looking for in plain English. AI vision checks each frame for it.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {APPROACH.map((a, i) => (
            <motion.div
              key={i}
              className="p-5 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.01]"
              {...fadeUp}
              transition={{ delay: 0.1 * i }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                  <a.icon className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
                <span className="text-[10px] font-mono text-white/20 tracking-widest">{a.step}</span>
              </div>
              <h3 className="text-sm font-semibold text-white/85 mb-2">{a.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Built with */}
      <section className="relative max-w-5xl mx-auto px-6 pb-20">
        <motion.div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8" {...fadeUp}>
          <div className="flex items-start gap-3 mb-5">
            <Wrench className="w-4 h-4 text-white/40 mt-0.5" strokeWidth={1.75} />
            <div>
              <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase">Built with</span>
              <p className="text-sm text-white/55 mt-2 max-w-2xl leading-relaxed">
                The interesting part was figuring out how much could run in the browser before needing a server.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-[11px] text-white/55 font-mono tracking-tight"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Live demo CTA */}
      <section className="relative max-w-5xl mx-auto px-6 pb-20">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/10 via-transparent to-cyan-600/10 p-8 sm:p-12 text-center"
          {...fadeUp}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-emerald-500/10 blur-[100px]" />
          </div>
          <div className="relative">
            <Sparkles className="w-5 h-5 text-emerald-400/80 mx-auto mb-4" strokeWidth={1.75} />
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/90 mb-3">Run the demo on your own webcam</h2>
            <p className="text-sm text-white/45 max-w-md mx-auto mb-7">
              Two-minute live session. Type a rule, the system watches the feed for it, you get the alerts back at the end.
            </p>
            <Link
              href="/demo/live"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-sm font-semibold hover:from-emerald-500 hover:to-cyan-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              Start the demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Honest scope */}
      <section className="relative max-w-5xl mx-auto px-6 pb-20">
        <motion.div className="max-w-3xl" {...fadeUp}>
          <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase">Honest scope</span>
          <p className="text-sm text-white/45 leading-relaxed mt-3">
            This live demo runs on a single webcam to show the core idea end-to-end. A full production rollout would add many cameras working together, a database, user permissions, data-retention rules, and a faster server-side AI step.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] relative">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between gap-4">
          <Link href="/" aria-label="OmniSight — home">
            <OrchantaMark />
          </Link>
          <span className="text-[10px] text-white/15 font-mono tracking-wider">OmniSight &middot; Built by Orchanta</span>
        </div>
      </footer>
    </div>
  );
}
