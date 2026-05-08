'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout;
    let isLoaded = document.readyState === 'complete';
    let phase2Done = false;

    const handleLoad = () => {
      isLoaded = true;
      checkTransition();
    };

    if (!isLoaded) {
      window.addEventListener('load', handleLoad);
    }

    const checkTransition = () => {
      if (isLoaded && phase2Done) {
        t2 = setTimeout(() => setPhase(3), 500); 
        t3 = setTimeout(() => onComplete(), 2100);
      }
    };

    // System Init -> Reveal
    t1 = setTimeout(() => {
      setPhase(2);
      setTimeout(() => {
        phase2Done = true;
        checkTransition();
      }, 2000); // Wait at least 2 seconds in Phase 2
    }, 1600); 

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('load', handleLoad);
    };
  }, [onComplete]);

  return (
    <motion.div
       className="fixed inset-0 z-[100] bg-sulva-black flex items-center justify-center overflow-hidden"
       initial={{ opacity: 1 }}
       exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.05 }}
       transition={{ duration: 1.5, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      {/* Ambient Background Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
         <motion.div 
           animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
           transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
           className="absolute w-[60vh] h-[60vh] rounded-full bg-sulva-white-warm/5 blur-[100px]" 
         />
         <motion.div 
           animate={{ scale: [1, 1.5, 1], opacity: [0.05, 0.15, 0.05] }}
           transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
           className="absolute w-[50vh] h-[50vh] rounded-full bg-sulva-gold/10 blur-[120px]" 
         />
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 1: System Init */}
        {phase === 1 && (
          <motion.div
            key="phase1"
            className="relative flex items-center justify-center w-full h-full z-10"
            exit={{ opacity: 0, filter: 'blur(10px)', y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              key="phase1-text"
              className="absolute text-sulva-white-warm/60 font-mono text-xs sm:text-sm tracking-[0.1em] md:tracking-[0.2em] uppercase text-center w-full px-6"
              animate={{ 
                opacity: [0, 1, 1, 0], 
                filter: ['blur(5px)', 'blur(0px)', 'blur(0px)', 'blur(5px)'], 
                y: [10, 0, 0, -10] 
              }}
              transition={{ 
                duration: 1.6, 
                times: [0, 0.2, 0.8, 1], 
                ease: 'easeInOut' 
              }}
            >
              Initializing Founder Profile...
            </motion.div>
          </motion.div>
        )}

        {/* PHASE 2: Founder Identity Reveal */}
        {phase === 2 && (
          <motion.div
            key="phase2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative flex flex-col items-center justify-center z-10 w-full px-6"
          >
            {/* Founder Pulse */}
            <motion.div
              animate={{ scale: [1, 2, 3], opacity: [0.15, 0.05, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
              className="absolute w-32 h-32 md:w-48 md:h-48 border border-sulva-gold rounded-full mix-blend-screen"
            />

            <motion.h1
              initial={{ letterSpacing: '0.05em', opacity: 0 }}
              animate={{ letterSpacing: '0.2em', opacity: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium z-10 mb-4 text-center tracking-widest uppercase"
            >
              Iyiola Ogunjobi
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sulva-white-warm/70 font-mono tracking-[0.15em] sm:tracking-widest uppercase text-[10px] sm:text-xs mb-6 text-center"
            >
              Founder & Systems Architect
            </motion.p>

            <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.8 }}
               className="text-sulva-white-warm/40 font-light text-sm sm:text-base italic text-center"
            >
              "Building intelligent digital futures."
            </motion.p>
          </motion.div>
        )}

        {/* PHASE 3: Entering System */}
        {phase === 3 && (
          <motion.div
            key="phase3"
            className="relative flex items-center justify-center z-10 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
             <motion.div
                animate={{ opacity: [0, 1, 0], filter: ['blur(10px)', 'blur(0px)', 'blur(10px)'] }}
                transition={{ duration: 1.0, times: [0, 0.5, 1], ease: 'easeInOut' }}
                className="text-sulva-white-warm/60 font-mono tracking-[0.2em] text-xs sm:text-sm uppercase absolute text-center w-full"
             >
               Entering System...
             </motion.div>
             <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
                className="text-white font-sans font-medium tracking-wide text-2xl sm:text-3xl xl:text-4xl absolute text-center w-full"
             >
               Welcome.
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
