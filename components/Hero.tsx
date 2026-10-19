'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { whatsappUrl } from '@/lib/contact';

const EASE = [0.2, 0.65, 0.3, 0.9] as const;

const SHOWCASE = [
  { src: '/project-shots/sulva-lms.png', alt: 'Sulva LMS homepage', className: 'left-[2%] sm:left-[6%] top-[18%] -rotate-6 w-[46%] sm:w-[38%]', delay: 0.9 },
  { src: '/project-shots/bata-ganik.png', alt: 'Bata Ganik homepage', className: 'right-[2%] sm:right-[6%] top-[18%] rotate-6 w-[46%] sm:w-[38%]', delay: 1.0 },
  { src: '/project-shots/studify.png', alt: 'Studify homepage', className: 'left-1/2 -translate-x-1/2 top-0 w-[78%] sm:w-[56%] z-10', delay: 0.75 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-paper paper-grain overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-36 sm:pt-40 flex flex-col items-center text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sulva-gold" />
          <span className="text-sm text-ink/60">Founder, Sulva Tech</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
          className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[5.2rem] tracking-tight text-ink"
        >
          <span className="font-light">I build platforms</span>
          <br />
          <span className="font-semibold text-bronze">Africa runs on.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="mt-7 max-w-xl text-base sm:text-lg text-ink/70 leading-relaxed"
        >
          I&apos;m Iyiola Ogunjobi. I design and ship AI-powered platforms for education, commerce, media and events,
          from first idea to live product.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: EASE }}
          className="mt-9 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <a
            href={whatsappUrl("Hi Iyiola, I found your portfolio and I'd like to talk about a project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-6 pl-6 pr-5 py-3.5 rounded-full bg-ink text-paper text-sm font-medium transition-colors hover:bg-black"
          >
            Chat on WhatsApp
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#projects"
            className="group flex items-center justify-center gap-6 pl-6 pr-5 py-3.5 rounded-full border border-ink/25 text-ink text-sm font-medium transition-colors hover:border-ink/60"
          >
            Explore work
            <span className="w-1.5 h-1.5 rounded-full bg-ink transition-transform group-hover:scale-150" />
          </a>
        </motion.div>
      </div>

      {/* Showcase: real product screens rising from behind an oversized wordmark */}
      <div className="relative flex-1 min-h-[300px] sm:min-h-[420px] mt-14 w-full max-w-7xl mx-auto">
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="absolute inset-x-0 bottom-10 sm:bottom-14 flex justify-center pointer-events-none select-none"
        >
          <span className="font-display font-bold leading-none tracking-tighter text-[24vw] lg:text-[17rem] text-white/80">
            IYIOLA
          </span>
        </motion.div>

        <div className="absolute inset-x-4 sm:inset-x-10 top-0 bottom-0">
          {SHOWCASE.map((shot) => (
            <motion.div
              key={shot.src}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: shot.delay, ease: EASE }}
              className={`absolute ${shot.className}`}
            >
              <div className="rounded-t-xl sm:rounded-t-2xl overflow-hidden border border-ink/10 bg-paper-raised shadow-[0_30px_80px_-20px_rgba(20,20,20,0.35)]">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-ink/10 bg-paper-raised">
                  <span className="w-2 h-2 rounded-full bg-ink/15" />
                  <span className="w-2 h-2 rounded-full bg-ink/15" />
                  <span className="w-2 h-2 rounded-full bg-ink/15" />
                </div>
                <div className="relative aspect-[16/10]">
                  <Image src={shot.src} alt={shot.alt} fill priority sizes="(min-width: 640px) 56vw, 80vw" className="object-cover object-top" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="absolute inset-x-6 sm:inset-x-12 lg:inset-x-16 bottom-0 z-20 border-t border-ink/10 bg-paper/80 backdrop-blur-md flex items-center justify-between py-4 text-xs sm:text-sm text-ink"
        >
          <span className="flex items-center gap-2">
            <span className="font-semibold">10</span> Products shipped
            <span className="w-1.5 h-1.5 rounded-full bg-sulva-gold" />
          </span>
          <span className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sulva-gold" />
            Education · Commerce · Media · Events
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sulva-gold" />
            Lagos, Nigeria
          </span>
        </motion.div>
      </div>
    </section>
  );
}
