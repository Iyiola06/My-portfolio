'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sulva-black">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-sulva-purple/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sulva-gold/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0)_0%,rgba(5,5,5,0.8)_100%)]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-8 z-10 flex flex-col lg:flex-row items-center">
        
        {/* Left Side: Typography */}
        <div className="w-full lg:w-1/2 pt-32 lg:pt-32 pr-0 lg:pr-12 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-sulva-gold shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-pulse" />
              <span className="text-sulva-gold font-mono text-[10px] tracking-[0.2em] uppercase">
                Welcome to my digital universe
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-[7rem] font-medium tracking-tight text-white leading-[1] mb-8 lg:-ml-1">
              I Design<br/>Intelligent<br/>Digital<br/>
              <span className="text-sulva-gold">Futures.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
          >
            <p className="text-lg sm:text-xl text-sulva-white-warm/80 font-light max-w-md leading-relaxed mb-12">
              I am Iyiola Ogunjobi - a founder, technologist, and creative systems thinker focused on building intelligent digital experiences, scalable infrastructure, and futuristic products that shape how people interact with technology.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
          >
            <button className="group relative px-8 py-4 bg-transparent border border-sulva-gold/40 hover:border-sulva-gold/80 backdrop-blur-md rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_-5px_rgba(212,175,55,0.3)] flex items-center justify-center gap-3">
              <span className="relative z-10 text-white font-medium tracking-wide text-sm">Explore My Vision</span>
              <ArrowUpRight className="w-4 h-4 text-sulva-gold relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button className="group relative px-8 py-4 bg-transparent border border-white/20 hover:border-white/40 rounded-[2rem] overflow-hidden transition-all duration-500 flex items-center justify-center gap-3">
              <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300 font-medium tracking-wide text-sm">View Projects</span>
              <ArrowUpRight className="w-4 h-4 text-white relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Right Side: Environment */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen absolute lg:relative top-0 left-0 lg:left-auto opacity-40 lg:opacity-100 -z-10 lg:z-10 pointer-events-none lg:pointer-events-auto flex items-center justify-center">
          <motion.div 
            className="w-[150%] max-w-none relative z-10 lg:-mr-32 mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_38%,rgba(0,0,0,0.72)_58%,transparent_78%)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.2, 0.65, 0.3, 0.9] }}
          >
            <video 
               autoPlay 
               loop 
               muted 
               playsInline
               onEnded={(e) => e.currentTarget.play()} 
               className="w-full h-full object-contain bg-transparent opacity-90 [filter:contrast(1.2)_brightness(1.08)]"
               src="/hero-video.mp4"
            />
          </motion.div>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 right-12 z-20 hidden lg:flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md">
           <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
        </div>
        <span className="text-white/50 text-sm font-light">Scroll to explore</span>
      </motion.div>
    </section>
  );
}
