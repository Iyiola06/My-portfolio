'use client';

import { motion } from 'motion/react';
import { useViewMode, type ViewMode } from '@/lib/view-mode';

const OPTIONS: { value: ViewMode; label: string }[] = [
  { value: 'human', label: 'Human' },
  { value: 'dev', label: 'Dev' },
];

export function ModeToggle({ id }: { id: string }) {
  const { mode, setMode } = useViewMode();

  return (
    <div
      role="group"
      aria-label="Portfolio view"
      className="relative flex items-center p-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md"
    >
      {OPTIONS.map((option) => {
        const active = mode === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => setMode(option.value)}
            className={`relative z-10 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase outline-none transition-colors duration-300 ${
              option.value === 'dev' ? 'font-mono' : ''
            } ${active ? 'text-sulva-black' : 'text-white/60 hover:text-white'}`}
          >
            {active && (
              <motion.span
                layoutId={`mode-pill-${id}`}
                className={`absolute inset-0 -z-10 rounded-full ${option.value === 'dev' ? 'bg-emerald-400' : 'bg-sulva-gold'}`}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
