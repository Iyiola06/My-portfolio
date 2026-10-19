'use client';

import { motion } from 'motion/react';

const EASE = [0.2, 0.65, 0.3, 0.9] as const;

const STATS = [
  { label: 'Experience', value: '10+ Years', detail: 'Engineering digital products' },
  { label: 'Shipped', value: '10 Products', detail: 'Live platforms across education, commerce, media and events' },
  { label: 'Focus', value: 'Intelligence', detail: 'AI-driven infrastructure systems' },
];

export function About() {
  return (
    <section id="about" className="relative bg-paper py-28 sm:py-36">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex items-center gap-2 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-sulva-gold" />
          <span className="text-sm text-ink/60">About</span>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: EASE }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-ink"
            >
              <span className="font-light">Technology should work for people, </span>
              <span className="font-semibold text-bronze">reliably and beautifully.</span>
            </motion.h2>

            <motion.div
              id="vision"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
              className="mt-12 max-w-xl space-y-6 text-lg text-ink/70 leading-relaxed"
            >
              <p>
                My philosophy is simple: technology should extend human intention. Good systems take more than code. They
                take sound architecture, honest engineering and a clear understanding of the people who use them.
              </p>
              <p>
                Through Sulva Tech, I build AI-driven products that hold up against global standards, from learning
                platforms and storefronts to newsrooms and event systems, made in Africa for the world.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col gap-4 lg:pt-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className="rounded-2xl border border-ink/10 bg-paper-raised p-7 transition-colors hover:border-ink/25"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ink/50 mb-3">
                  {stat.label}
                  <span className="w-1.5 h-1.5 rounded-full bg-sulva-gold" />
                </div>
                <div className="font-display text-4xl font-medium tracking-tight text-ink">{stat.value}</div>
                <div className="mt-2 text-sm text-ink/60">{stat.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
