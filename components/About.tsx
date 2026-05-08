'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const statementY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const statsY = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="relative min-h-screen bg-sulva-black py-32 overflow-hidden flex items-center">
      {/* Background Atmosphere */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: bgOpacity }}
      >
        <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[100px]" />
        <div className="absolute top-[50%] right-[10%] w-[30%] h-[30%] rounded-full bg-sulva-purple/5 blur-[120px]" />
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-8 z-10 relative">
        <div className="flex flex-col lg:flex-row gap-24 lg:gap-16">
          
          {/* Left Side: Typography */}
          <div className="w-full lg:w-3/5">
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tight leading-[1.1] text-white"
              style={{ y: statementY }}
            >
              Technology Should Feel <span className="text-sulva-white-warm/70">Intelligent,</span> Human, And Timeless.
            </motion.h2>

            <motion.div
              id="vision"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mt-16 sm:mt-24 max-w-xl space-y-8"
            >
              <p className="text-lg sm:text-xl text-sulva-white-warm/80 font-light leading-relaxed">
                 My philosophy is simple: technology should feel like an extension of human intention. Building scalable systems and sophisticated infrastructure requires more than code - it demands a visionary understanding of macro-level architecture and human emotion.
              </p>
              <p className="text-lg sm:text-xl text-sulva-white-warm/80 font-light leading-relaxed">
                I engineer premium, AI-driven experiences that position African innovation at the apex of global technological competition. For me, it is not just about solving today's problems; it's about anticipating the needs of a fundamentally transformed future.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Floating Metrics / Glass Panels */}
          <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-end justify-center relative mt-16 lg:mt-0">
            <motion.div 
              className="w-full max-w-sm space-y-6"
              style={{ y: statsY }}
            >
              {/* Stat 1 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="glass-panel p-8 rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="text-sm font-mono text-sulva-white-warm/50 mb-2 uppercase tracking-widest">Experience</div>
                <div className="text-4xl sm:text-5xl font-medium text-white tracking-tight">10+ Years</div>
                <div className="mt-2 text-sm text-sulva-white-warm/70">Engineering Digital Excellence</div>
              </motion.div>

              {/* Stat 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="glass-panel p-8 rounded-2xl relative overflow-hidden group ml-0 lg:-ml-12"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sulva-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="text-sm font-mono text-sulva-white-warm/50 mb-2 uppercase tracking-widest">Global Reach</div>
                <div className="text-4xl sm:text-5xl font-medium text-white tracking-tight">African DNA</div>
                <div className="mt-2 text-sm text-sulva-white-warm/70">Global Technological Standard</div>
              </motion.div>

               {/* Stat 3 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass-panel p-8 rounded-2xl relative overflow-hidden group ml-0 lg:ml-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sulva-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="text-sm font-mono text-sulva-white-warm/50 mb-2 uppercase tracking-widest">Focus</div>
                <div className="text-4xl sm:text-5xl font-medium text-white tracking-tight">Intelligence</div>
                <div className="mt-2 text-sm text-sulva-white-warm/70">AI-Driven Infrastructure Systems</div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
