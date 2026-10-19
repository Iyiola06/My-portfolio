'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { projectsData } from '@/components/Projects';
import { whatsappUrl } from '@/lib/contact';

const GITHUB_URL = 'https://github.com/Iyiola06';

const PRINCIPLES = [
  {
    key: 'ship_the_whole_system',
    title: 'Ship the whole system',
    body: 'Auth, data layer, payments and an operator console, not just a front end. Every product here has an admin surface behind the public one.',
  },
  {
    key: 'payments_are_first_class',
    title: 'Payments are first-class',
    body: 'Stripe and Paystack are wired into real checkout, voting and booking flows, with webhooks and order state handled server-side.',
  },
  {
    key: 'boring_where_it_counts',
    title: 'Boring where it counts',
    body: 'TypeScript, Postgres via Prisma or Supabase, and conventional app-router structure. Novelty goes into the product, not the plumbing.',
  },
  {
    key: 'ai_where_it_earns_its_place',
    title: 'AI where it earns its place',
    body: 'Tutoring, essay grading and newsroom workflows use models for work that is slow for humans, with the app owning state and guardrails.',
  },
];

function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="text-emerald-400 select-none">$</span>
      <span className="text-white">{children}</span>
    </div>
  );
}

export function DevHero() {
  const lines = [
    { prompt: 'whoami', out: 'iyiola ogunjobi — founder @ sulva-tech, full-stack engineer' },
    { prompt: 'ls products/ | wc -l', out: String(projectsData.length) },
    { prompt: 'cat focus.txt', out: 'full-stack · ai-integrated · payments · multi-role admin systems' },
    { prompt: 'cat location.txt', out: 'lagos, nigeria — shipping globally' },
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-sulva-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-sulva-gold/5 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-12 pt-36 pb-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-xs tracking-[0.25em] uppercase text-emerald-400 mb-6"
        >
          dev_mode // iyiola.sulvatech.com
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.05] mb-10"
        >
          Full-stack systems,
          <br />
          <span className="text-emerald-400">shipped end to end.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
            <span className="w-3 h-3 rounded-full bg-red-400/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
            <span className="ml-3 font-mono text-xs text-white/40">~/iyiola — zsh</span>
          </div>
          <div className="p-5 sm:p-7 font-mono text-sm sm:text-base space-y-5">
            {lines.map((line, i) => (
              <motion.div
                key={line.prompt}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.35 }}
                className="space-y-1"
              >
                <Prompt>{line.prompt}</Prompt>
                <div className="pl-6 text-white/60">{line.out}</div>
              </motion.div>
            ))}
            <div className="flex gap-3">
              <span className="text-emerald-400 select-none">$</span>
              <span className="inline-block w-2.5 h-5 bg-emerald-400 animate-pulse" aria-hidden />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="group flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-emerald-400 text-sulva-black font-mono text-sm font-semibold tracking-wide hover:bg-emerald-300 transition-colors"
          >
            ./view_projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 px-7 py-4 rounded-xl border border-white/20 hover:border-white/50 text-white font-mono text-sm tracking-wide transition-colors"
          >
            github.com/Iyiola06
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href={whatsappUrl("Hi Iyiola, I saw your dev portfolio and I'd like to talk about a build.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 px-7 py-4 rounded-xl border border-sulva-gold/40 hover:border-sulva-gold/80 text-white font-mono text-sm tracking-wide transition-colors"
          >
            chat --whatsapp
            <ArrowUpRight className="w-4 h-4 text-sulva-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function DevStack() {
  const { rows, unique } = useMemo(() => {
    const counts = new Map<string, number>();
    projectsData.forEach((project) =>
      project.technologies.forEach((tech) => counts.set(tech, (counts.get(tech) ?? 0) + 1)),
    );
    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    return { rows: sorted.slice(0, 10), unique: counts.size };
  }, []);

  return (
    <section id="stack" className="relative bg-sulva-black py-28">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-12">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-emerald-400 mb-4">01 // stack</p>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-4">What the work is built on.</h2>
        <p className="text-white/60 font-light max-w-2xl mb-14">
          Counted from the {projectsData.length} systems below: how many of them use each technology, across {unique} distinct
          tools.
        </p>

        <div className="grid sm:grid-cols-2 gap-x-14 gap-y-5">
          {rows.map(([name, count], i) => (
            <div key={name} className="font-mono text-sm">
              <div className="flex justify-between mb-2">
                <span className="text-white">{name}</span>
                <span className="text-white/40">
                  {count}/{projectsData.length}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(count / projectsData.length) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.05, ease: [0.2, 0.65, 0.3, 0.9] }}
                  className="h-full rounded-full bg-emerald-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DevProjects() {
  const [openId, setOpenId] = useState<number | null>(projectsData[0]?.id ?? null);

  return (
    <section id="projects" className="relative bg-sulva-black py-28">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-12">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-emerald-400 mb-4">02 // projects</p>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-14">
          {projectsData.length} systems. Architecture, not screenshots.
        </h2>

        <div className="border-t border-white/10">
          {projectsData.map((project, index) => {
            const open = openId === project.id;
            return (
              <div key={project.id} className="border-b border-white/10">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : project.id)}
                  className="w-full flex items-center gap-4 sm:gap-6 py-6 text-left outline-none group"
                >
                  <span className="font-mono text-xs text-white/30 w-6">{String(index + 1).padStart(2, '0')}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-xl sm:text-2xl text-white font-medium group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </span>
                    <span className="block font-mono text-xs text-white/40 mt-1 truncate">{project.category}</span>
                  </span>
                  <span className="hidden md:flex gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-md border border-white/10 font-mono text-xs text-white/60">
                        {tech}
                      </span>
                    ))}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/40 transition-transform duration-300 ${open ? 'rotate-180 text-emerald-400' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
                      className="overflow-hidden"
                    >
                      <div className="grid lg:grid-cols-2 gap-8 pb-10 pl-0 sm:pl-12">
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-mono text-xs uppercase tracking-widest text-sulva-gold mb-2">problem</h3>
                            <p className="text-white/70 font-light leading-relaxed">{project.mission}</p>
                          </div>
                          <div>
                            <h3 className="font-mono text-xs uppercase tracking-widest text-sulva-gold mb-2">architecture</h3>
                            <p className="text-white/70 font-light leading-relaxed">{project.designPhilosophy}</p>
                          </div>
                          <div>
                            <h3 className="font-mono text-xs uppercase tracking-widest text-sulva-gold mb-2">stack</h3>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <span key={tech} className="px-3 py-1 rounded-md bg-emerald-400/10 border border-emerald-400/20 font-mono text-xs text-emerald-300">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-white/50">
                            {Object.entries(project.metrics).map(([key, value]) => (
                              <span key={key}>
                                {key}: <span className="text-white">{value}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
                          <Image
                            src={project.mockupImage}
                            alt={`${project.title} homepage`}
                            fill
                            sizes="(min-width: 1024px) 40vw, 90vw"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DevPrinciples() {
  return (
    <section id="principles" className="relative bg-sulva-black py-28">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-12">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-emerald-400 mb-4">03 // principles</p>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-14">How I build.</h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {PRINCIPLES.map((principle) => (
            <motion.div
              key={principle.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-emerald-400/30 transition-colors"
            >
              <p className="font-mono text-xs text-emerald-400 mb-3">{principle.key}</p>
              <h3 className="text-xl text-white font-medium mb-3">{principle.title}</h3>
              <p className="text-white/60 font-light leading-relaxed">{principle.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
