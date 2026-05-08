'use client';

import { motion } from 'motion/react';
import dynamic from 'next/dynamic';

const CoreWrapper = dynamic(() => import('./IntelligenceCoreWrapper'), { ssr: false });

export function IntelligenceCore() {
  return (
    <section id="thinking" className="relative h-[120vh] bg-sulva-black overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
        <CoreWrapper />
      </div>

      <div className="relative z-10 pointer-events-none -mt-40 flex flex-col items-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-sulva-purple font-mono uppercase tracking-[0.3em] text-sm mb-4"
        >
          Signature Identity
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl md:text-7xl font-sans font-medium tracking-tight text-white mb-6 leading-tight max-w-4xl drop-shadow-2xl"
        >
          My Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-sulva-white-warm to-sulva-white-warm/30">Core.</span>
        </motion.h2>
        <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.4 }}
           viewport={{ once: true }}
           className="text-lg text-sulva-white-warm/60 font-light max-w-xl mx-auto"
        >
           Hover to reveal the foundational systems computing my vision for the future of technology.
        </motion.p>
      </div>

      {/* Atmospheric gradient at bottom to transition smoothly into contact */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-sulva-black to-transparent pointer-events-none z-20" />
    </section>
  );
}
