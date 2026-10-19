'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { IntelligenceCore } from '@/components/IntelligenceCore';
import { Contact } from '@/components/Contact';
import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { DevHero, DevStack, DevProjects, DevPrinciples } from '@/components/DevPortfolio';
import { ViewModeProvider, useViewMode } from '@/lib/view-mode';

function Portfolio() {
  const { mode } = useViewMode();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  return (
    <main className={`min-h-screen ${mode === 'human' ? 'bg-paper text-ink' : 'bg-sulva-black text-white'}`}>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <Navbar />
      {mode === 'human' ? (
        <>
          <Hero />
          <About />
          <Projects />
          <IntelligenceCore />
        </>
      ) : (
        <>
          <DevHero />
          <DevStack />
          <DevProjects />
          <DevPrinciples />
        </>
      )}
      <Contact />
    </main>
  );
}

export default function Home() {
  return (
    <ViewModeProvider>
      <Portfolio />
    </ViewModeProvider>
  );
}
