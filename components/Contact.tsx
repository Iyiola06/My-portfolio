'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, whatsappUrl } from '@/lib/contact';
import { useViewMode } from '@/lib/view-mode';

// Contact is shared by both views, so its palette follows the active one.
const THEMES = {
  human: {
    section: 'bg-paper',
    eyebrowDot: 'bg-sulva-gold',
    eyebrow: 'text-ink/60',
    heading: 'text-ink',
    headingAccent: 'text-bronze',
    body: 'text-ink/70',
    label: 'text-ink/45',
    link: 'text-ink hover:text-bronze',
    card: 'bg-paper-raised border border-ink/10 shadow-[0_30px_80px_-40px_rgba(20,20,20,0.35)]',
    input: 'bg-paper text-ink placeholder:text-ink/35 border-ink/15 hover:border-ink/30',
    inputFocus: 'border-ink ring-1 ring-ink/20 bg-white',
    button: 'bg-ink text-paper hover:bg-black',
    note: 'text-bronze',
  },
  dev: {
    section: 'bg-sulva-black',
    eyebrowDot: 'bg-emerald-400',
    eyebrow: 'text-emerald-400 font-mono',
    heading: 'text-white',
    headingAccent: 'text-emerald-400',
    body: 'text-white/65',
    label: 'text-white/40 font-mono',
    link: 'text-white hover:text-emerald-300',
    card: 'bg-white/[0.03] border border-white/10',
    input: 'bg-white/[0.02] text-white placeholder:text-white/25 border-white/10 hover:border-white/30',
    inputFocus: 'border-emerald-400 ring-1 ring-emerald-400/40 bg-white/[0.05]',
    button: 'bg-emerald-400 text-sulva-black hover:bg-emerald-300',
    note: 'text-emerald-300',
  },
};

export function Contact() {
  const { mode } = useViewMode();
  const t = THEMES[mode];
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const field = (key: string) => String(data.get(key) ?? '').trim();
    const lines = [`Hi Iyiola, my name is ${field('name')}.`];
    if (field('company')) lines.push(`Company: ${field('company')}`);
    if (field('projectType')) lines.push(`Project type: ${field('projectType')}`);
    lines.push(`Email: ${field('email')}`, '', field('message'));
    window.open(whatsappUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const inputProps = (name: string) => ({
    name,
    className: `w-full border rounded-xl px-4 py-4 outline-none transition-all duration-300 ${t.input} ${
      focusedField === name ? t.inputFocus : ''
    }`,
    onFocus: () => setFocusedField(name),
    onBlur: () => setFocusedField(null),
  });

  return (
    <section id="contact" className={`relative py-28 sm:py-36 overflow-hidden ${t.section}`}>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid xl:grid-cols-2 gap-16 xl:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className={`w-1.5 h-1.5 rounded-full ${t.eyebrowDot}`} />
            <span className={`text-sm ${t.eyebrow}`}>{mode === 'dev' ? '04 // contact' : 'Contact'}</span>
          </div>
          <h2 className={`font-display text-5xl sm:text-6xl tracking-tight leading-[1.05] mb-8 ${t.heading}`}>
            <span className="font-light">Let&apos;s build something </span>
            <span className={`font-semibold ${t.headingAccent}`}>meaningful.</span>
          </h2>
          <p className={`text-lg leading-relaxed max-w-lg mb-12 ${t.body}`}>
            Have a product to launch, a platform to rebuild or a system that needs to scale? Message me on WhatsApp and
            we&apos;ll talk it through.
          </p>

          <div className="space-y-7">
            <div className="flex flex-col">
              <span className={`text-xs uppercase tracking-widest mb-2 ${t.label}`}>WhatsApp</span>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-xl transition-colors ${t.link}`}
              >
                {WHATSAPP_DISPLAY}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            <div className="flex flex-col">
              <span className={`text-xs uppercase tracking-widest mb-2 ${t.label}`}>Email</span>
              <a href={`mailto:${CONTACT_EMAIL}`} className={`text-xl transition-colors ${t.link}`}>
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="flex flex-col">
              <span className={`text-xs uppercase tracking-widest mb-2 ${t.label}`}>Base</span>
              <span className={`text-xl ${t.heading}`}>Lagos, Nigeria · Working globally</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
          className={`self-center w-full rounded-3xl p-7 sm:p-12 ${t.card}`}
        >
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input type="text" required placeholder="Full name" {...inputProps('name')} />
              <input type="email" required placeholder="Email address" {...inputProps('email')} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input type="text" placeholder="Company" {...inputProps('company')} />
              <input type="text" placeholder="Project type (e.g. AI, platform)" {...inputProps('projectType')} />
            </div>
            <textarea required rows={5} placeholder="Tell me about your vision..." {...inputProps('message')} className={`${inputProps('message').className} resize-none`} />

            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-3 px-8 py-5 rounded-xl font-medium tracking-wide transition-colors ${t.button}`}
            >
              Send on WhatsApp
              <ArrowUpRight className="w-4 h-4" />
            </button>
            {sent && (
              <p role="status" className={`text-sm text-center ${t.note}`}>
                WhatsApp is opening with your message. If it didn&apos;t, message me directly at {WHATSAPP_DISPLAY}.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
