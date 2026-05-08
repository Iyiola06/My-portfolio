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

export default function Home() {
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
    <main className="bg-sulva-black min-h-screen">
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <IntelligenceCore />
      <Contact />
    </main>
  );
}
