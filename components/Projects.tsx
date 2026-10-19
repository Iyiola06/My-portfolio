'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import {
  X,
  ArrowRight,
  ExternalLink,
  Code2,
  Cpu,
  Globe,
  Infinity as InfinityIcon,
  BookOpen,
  ShoppingBag,
  Newspaper,
  Users,
  CalendarDays,
  GraduationCap,
  Sparkles,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';
import { whatsappUrl } from '@/lib/contact';

export const projectsData = [
  {
    id: 1,
    title: 'Studify',
    category: 'AI Learning Operating System',
    description: 'A full-stack study platform with AI tutoring, essay grading, flashcards, exam readiness tools, gamification, billing, and Supabase-backed learning data.',
    technologies: ['Next.js', 'Supabase', 'Google GenAI', 'Vercel AI SDK', 'React'],
    metrics: { modules: '10+', stack: 'Full Stack', domain: 'EdTech' },
    mockupImage: '/project-shots/studify.png',
    icon: <BookOpen className="w-6 h-6" />,
    mission: 'Make serious learning feel personal, measurable, and always available through an AI-native study workspace.',
    myThinking: 'Studify brings the messy parts of studying into one disciplined product: revision, practice, writing feedback, exam preparation, and progress loops. The goal was to make a student feel guided without needing a human tutor every hour of the day.',
    designPhilosophy: 'The architecture combines Next.js app routes, Supabase persistence, AI generation flows, billing, and feature-specific learning modules. Each surface is built around an action a student already understands: ask, practice, review, improve.',
    techStack: [
      { name: 'Next.js 15', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Supabase', icon: <Globe className="w-4 h-4" /> },
      { name: 'GenAI', icon: <Cpu className="w-4 h-4" /> },
    ]
  },
  {
    id: 2,
    title: 'SprintRoom',
    category: 'Team Focus & Productivity Platform',
    description: 'A focused work operating system with project dashboards, team pulse, offline states, authenticated workspaces, and session-based productivity flows.',
    technologies: ['Next.js', 'Supabase', 'IndexedDB', 'React', 'Tailwind'],
    metrics: { surfaces: '7+', mode: 'Offline Ready', domain: 'Productivity' },
    mockupImage: '/project-shots/sprintroom.png',
    icon: <InfinityIcon className="w-6 h-6" />,
    mission: 'Help teams protect deep work while keeping leadership visibility, accountability, and momentum clear.',
    myThinking: 'Most productivity tools either track work or help people focus, but rarely both. SprintRoom treats focus sessions, project state, and team rhythm as one connected product instead of scattered tabs.',
    designPhilosophy: 'The product is organized around authenticated app routes, dashboard modules, project settings, team views, and resilient offline behavior. It favors fast operational surfaces over decorative project management noise.',
    techStack: [
      { name: 'Next.js', icon: <Globe className="w-4 h-4" /> },
      { name: 'Supabase', icon: <Cpu className="w-4 h-4" /> },
      { name: 'PWA Patterns', icon: <Code2 className="w-4 h-4" /> },
    ]
  },
  {
    id: 3,
    title: 'Sulva LMS',
    category: 'University Learning Management System',
    description: 'A multi-role LMS for students, lecturers, admins, and superadmins, covering onboarding, course registration, assignments, attendance, announcements, and academic workflows.',
    technologies: ['Next.js', 'Supabase', 'TypeScript', 'Motion', 'Testing'],
    metrics: { roles: '4', workflows: '12+', domain: 'Education' },
    mockupImage: '/project-shots/sulva-lms.png',
    icon: <GraduationCap className="w-6 h-6" />,
    mission: 'Create a university-grade digital campus where learning, administration, and course operations live in one coherent system.',
    myThinking: 'A good LMS has to respect the different mental models of students, lecturers, and administrators. I designed Sulva LMS around role-specific dashboards so each user sees the next important academic action without digging.',
    designPhilosophy: 'The system uses a Next.js dashboard architecture with protected routes, Supabase data flows, typed utilities, and dedicated modules for registration, learning, attendance, assessment, and administration.',
    techStack: [
      { name: 'Next.js', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Supabase', icon: <Globe className="w-4 h-4" /> },
      { name: 'TypeScript', icon: <Cpu className="w-4 h-4" /> },
    ]
  },
  {
    id: 4,
    title: "Venite Founder's Week",
    category: 'Event, Voting & Payments Platform',
    description: 'A premium university event platform with programme pages, dinner-night flow, paid voting, admin dashboards, candidate management, results, and Paystack integration.',
    technologies: ['Next.js', 'Prisma', 'Neon Postgres', 'Paystack', 'Motion'],
    metrics: { modules: '8+', payments: 'Paystack', domain: 'Events' },
    mockupImage: '/project-shots/founders-week.png',
    icon: <CalendarDays className="w-6 h-6" />,
    mission: 'Turn a high-energy campus celebration into a polished digital event, voting, and payment experience.',
    myThinking: 'Event products need trust and excitement at the same time. For Founder\'s Week, the public pages had to feel premium while the admin side stayed strict enough to manage candidates, payments, settings, and results.',
    designPhilosophy: 'The app pairs Next.js routes with Prisma-backed persistence and Paystack payment flows. Admin modules are split by operational responsibility so the system can handle programme content, voting, payment verification, and result management cleanly.',
    techStack: [
      { name: 'Next.js', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Prisma', icon: <Cpu className="w-4 h-4" /> },
      { name: 'Paystack', icon: <Globe className="w-4 h-4" /> },
    ]
  },
  {
    id: 5,
    title: 'theDMAshop',
    category: 'Commerce, CMS & Payments',
    description: 'A dynamic single-store commerce app with storefront, cart, product media, customer accounts, CMS content, admin operations, Supabase, and Stripe checkout.',
    technologies: ['React', 'Vite', 'Supabase', 'Stripe', 'Playwright'],
    metrics: { areas: 'Store + Admin', payments: 'Stripe', domain: 'Commerce' },
    mockupImage: '/project-shots/thedmashop.png',
    icon: <ShoppingBag className="w-6 h-6" />,
    mission: 'Give a single-store brand the operational depth of a serious commerce platform without burying the customer experience.',
    myThinking: 'Small commerce brands often get a storefront but not the machinery behind it. I built theDMAshop as both a buying experience and an admin workspace for products, orders, customers, media, and CMS content.',
    designPhilosophy: 'The app combines a React/Vite frontend, Supabase Auth/Postgres/Storage, Stripe checkout, webhook confirmation, seed scripts, and admin browser tests. The result is a store that can be operated, not just viewed.',
    techStack: [
      { name: 'React + Vite', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Supabase', icon: <Globe className="w-4 h-4" /> },
      { name: 'Stripe', icon: <Cpu className="w-4 h-4" /> },
    ]
  },
  {
    id: 6,
    title: 'Nigerian News Platform',
    category: 'AI Editorial Publishing System',
    description: 'A monorepo news platform with public web, editorial admin, NestJS API, shared packages, Prisma/Postgres, and Gemini-powered newsroom workflows.',
    technologies: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Gemini'],
    metrics: { apps: '3', architecture: 'Monorepo', domain: 'Media' },
    mockupImage: '/project-shots/nigerian-news-platform.png',
    icon: <Newspaper className="w-6 h-6" />,
    mission: 'Build a modern Nigerian newsroom stack where publishing, editorial review, and AI assistance work together.',
    myThinking: 'A serious media product needs more than article pages. It needs a public reader experience, an editorial cockpit, a reliable API, content models, and workflows that help journalists move faster without losing control.',
    designPhilosophy: 'The platform is organized as a pnpm monorepo with separate web, admin, and API apps plus shared UI and config packages. Prisma and PostgreSQL power the content layer while Gemini supports editorial automation.',
    techStack: [
      { name: 'Next.js', icon: <Code2 className="w-4 h-4" /> },
      { name: 'NestJS', icon: <Cpu className="w-4 h-4" /> },
      { name: 'Prisma', icon: <Globe className="w-4 h-4" /> },
    ]
  },
  {
    id: 7,
    title: "It's Lola Beauty",
    category: 'Beauty Commerce & Booking Platform',
    description: 'A beauty brand platform with shop, services, checkout, bookings, order tracking, admin reports, customer management, Stripe, Supabase, and email workflows.',
    technologies: ['Next.js', 'Supabase', 'Stripe', 'Resend', 'Recharts'],
    metrics: { flows: 'Shop + Booking', admin: 'Full Console', domain: 'Beauty' },
    mockupImage: '/project-shots/its-lola-beauty.png',
    icon: <Sparkles className="w-6 h-6" />,
    mission: 'Blend product commerce and service booking into one elegant beauty experience.',
    myThinking: 'Beauty businesses need a product shelf and an appointment book, but customers should not feel the split. It\'s Lola Beauty treats shopping, services, checkout, and tracking as one continuous brand journey.',
    designPhilosophy: 'The project uses Next.js app routes, Supabase data storage, Stripe checkout endpoints, booking APIs, admin modules for products/orders/services, analytics reports, and Resend-powered communication.',
    techStack: [
      { name: 'Next.js', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Stripe', icon: <Cpu className="w-4 h-4" /> },
      { name: 'Supabase', icon: <Globe className="w-4 h-4" /> },
    ]
  },
  {
    id: 8,
    title: 'The Inner Circle',
    category: 'Private Community & Membership Platform',
    description: 'A polished community platform with brand pages, communities, departments, leadership, pricing, join flows, admin dashboard, rate limiting, and Supabase integration.',
    technologies: ['React', 'Vite', 'Supabase', 'Drizzle', 'Upstash'],
    metrics: { surfaces: '12+', admin: 'Included', domain: 'Community' },
    mockupImage: '/project-shots/the-inner-circle.png',
    icon: <Users className="w-6 h-6" />,
    mission: 'Make a private community feel premium from the first landing page through membership intake and admin operations.',
    myThinking: 'A community product lives or dies by trust and identity. The Inner Circle needed pages that sell the vision, flows that capture intent, and admin systems that keep membership operations manageable.',
    designPhilosophy: 'The implementation combines a Vite/React frontend, Supabase browser/server clients, join validation, rate limiting, admin services, reusable content data, SEO utilities, and a modular page system for community storytelling.',
    techStack: [
      { name: 'React + Vite', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Supabase', icon: <Globe className="w-4 h-4" /> },
      { name: 'Upstash', icon: <Cpu className="w-4 h-4" /> },
    ]
  },
  {
    id: 9,
    title: 'Timetable Allocator',
    category: 'Scheduling Engine & Academic Ops',
    description: 'A full-stack timetable allocation system with course matching, room and lecturer constraints, schedule generation, blocked times, runs, and dashboard workflows.',
    technologies: ['Next.js', 'Express', 'TypeScript', 'Supabase', 'Node.js'],
    metrics: { layers: 'Frontend + API', engine: 'Scheduling', domain: 'Academics' },
    mockupImage: '/project-shots/timetable-allocator.png',
    icon: <BarChart3 className="w-6 h-6" />,
    mission: 'Automate one of the most painful academic operations: matching courses, rooms, lecturers, constraints, and time into usable schedules.',
    myThinking: 'Timetabling is deceptively hard because every change has knock-on effects. I approached it as an operations engine first, then wrapped it in dashboards that make constraints visible and editable.',
    designPhilosophy: 'The system separates a Next.js frontend, Express/TypeScript backend, Supabase database, and shared types. Routes and dashboards are organized around the actual planning objects: courses, lecturers, rooms, constraints, events, matching, and generation runs.',
    techStack: [
      { name: 'Next.js', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Express', icon: <Cpu className="w-4 h-4" /> },
      { name: 'Supabase', icon: <Globe className="w-4 h-4" /> },
    ]
  },
  {
    id: 10,
    title: 'Bata Ganik',
    category: 'Advanced Commerce Admin Platform',
    description: 'A commerce system with products, collections, orders, cart APIs, newsletter, discounts, customer tools, analytics, merchandising, Stripe, Paystack, and Prisma.',
    technologies: ['Next.js', 'Prisma', 'Stripe', 'Paystack', 'Supabase'],
    metrics: { admin: 'Analytics + Ops', payments: 'Dual Gateway', domain: 'Retail' },
    mockupImage: '/project-shots/bata-ganik.png',
    icon: <ShieldCheck className="w-6 h-6" />,
    mission: 'Build a retail engine that gives operators control over catalog, payments, customers, merchandising, and growth workflows.',
    myThinking: 'Bata Ganik is the kind of commerce project where the back office matters as much as the shop. I focused on giving the admin side real operational muscle instead of leaving it as a thin product form.',
    designPhilosophy: 'The platform uses Next.js, Prisma, Supabase, Stripe, Paystack, drag-and-drop tooling, analytics routes, and a broad admin API surface for categories, collections, customers, discounts, orders, products, uploads, and merchandising.',
    techStack: [
      { name: 'Next.js', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Prisma', icon: <Cpu className="w-4 h-4" /> },
      { name: 'Stripe', icon: <Globe className="w-4 h-4" /> },
    ]
  }
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <>
      <section id="projects" className="relative bg-paper py-28 sm:py-36 w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-20 lg:mb-28 border-b border-ink/10 pb-10">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-sulva-gold" />
                <span className="text-sm text-ink/60">Selected work</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl tracking-tight text-ink">
                <span className="font-light">Ten systems, </span>
                <span className="font-semibold text-bronze">all live.</span>
              </h2>
            </div>
            <p className="max-w-sm text-ink/60 leading-relaxed">
              Real products spanning AI, education, commerce, media, community and operations.
            </p>
          </div>

          <div className="flex flex-col gap-24 lg:gap-32">
            {projectsData.map((project, index) => (
              <div
                key={project.id}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-20 items-center group`}
              >
                {/* Details */}
                <div className="w-full lg:w-5/12 flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-4 text-ink/40">
                    <span className="font-mono text-xs tracking-widest">
                      {String(index + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
                    </span>
                    <span className="h-px flex-1 max-w-16 bg-ink/15" />
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-bronze mb-3">{project.category}</h3>
                    <h2 className="font-display text-4xl sm:text-5xl font-medium text-ink tracking-tight leading-tight">
                      {project.title}
                    </h2>
                  </div>

                  <p className="text-lg text-ink/70 leading-relaxed max-w-md">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-3.5 py-1.5 text-xs text-ink/70 border border-ink/15 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="group/btn inline-flex items-center gap-6 pl-6 pr-5 py-3.5 bg-ink text-paper rounded-full text-sm font-medium transition-colors hover:bg-black"
                    >
                      Explore project
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Visual */}
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`Open ${project.title}`}
                  className="w-full lg:w-7/12 relative text-left"
                >
                  <div className="rounded-2xl overflow-hidden border border-ink/10 bg-paper-raised shadow-[0_30px_80px_-30px_rgba(20,20,20,0.35)] transition-transform duration-700 group-hover:-translate-y-1.5">
                    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-ink/10">
                      <span className="w-2 h-2 rounded-full bg-ink/15" />
                      <span className="w-2 h-2 rounded-full bg-ink/15" />
                      <span className="w-2 h-2 rounded-full bg-ink/15" />
                    </div>
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={project.mockupImage}
                        alt={`${project.title} homepage`}
                        fill
                        sizes="(min-width: 1024px) 55vw, 90vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-5 right-6 w-14 h-14 rounded-full bg-paper-raised border border-ink/10 shadow-lg flex items-center justify-center text-ink">
                    {project.icon}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULLSCREEN PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
          >
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-md" onClick={() => setSelectedProject(null)} />

            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] bg-paper rounded-3xl overflow-hidden border border-ink/10 shadow-[0_40px_120px_rgba(20,20,20,0.35)] flex flex-col z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close"
                className="absolute top-5 right-5 z-50 p-3 bg-paper-raised/90 backdrop-blur border border-ink/10 rounded-full text-ink transition-colors hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto h-full">
                <div className="p-8 sm:p-14 pb-0">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-bronze mb-4">{selectedProject.category}</h4>
                  <h2 className="font-display text-5xl sm:text-7xl font-medium text-ink tracking-tight leading-tight">
                    {selectedProject.title}
                  </h2>
                  <div className="mt-10 rounded-2xl overflow-hidden border border-ink/10 bg-paper-raised">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={selectedProject.mockupImage}
                        alt={`${selectedProject.title} homepage`}
                        fill
                        sizes="(min-width: 1024px) 70vw, 95vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-3 gap-14">
                  <div className="lg:col-span-1 space-y-10">
                    <div>
                      <h4 className="text-xs text-ink/50 uppercase tracking-[0.2em] mb-3">Mission</h4>
                      <p className="text-lg text-ink leading-relaxed">{selectedProject.mission}</p>
                    </div>

                    <div>
                      <h4 className="text-xs text-ink/50 uppercase tracking-[0.2em] mb-3">At a glance</h4>
                      <div className="divide-y divide-ink/10 border-y border-ink/10">
                        {Object.entries(selectedProject.metrics).map(([key, value]) => (
                          <div key={key} className="py-4 flex items-baseline justify-between gap-4">
                            <span className="text-sm text-ink/50 uppercase tracking-widest">{key}</span>
                            <span className="font-display text-xl font-medium text-ink text-right">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs text-ink/50 uppercase tracking-[0.2em] mb-3">Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.techStack.map((tech) => (
                          <div key={tech.name} className="flex items-center gap-2 px-3.5 py-2 border border-ink/15 rounded-full">
                            <span className="text-ink/50">{tech.icon}</span>
                            <span className="text-sm text-ink font-medium">{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-12">
                    <div>
                      <h3 className="font-display text-2xl font-medium text-ink mb-4">My thinking</h3>
                      <p className="text-lg text-ink/70 leading-relaxed">{selectedProject.myThinking}</p>
                    </div>

                    <div>
                      <h3 className="font-display text-2xl font-medium text-ink mb-4">Design &amp; architecture</h3>
                      <p className="text-lg text-ink/70 leading-relaxed">{selectedProject.designPhilosophy}</p>
                    </div>

                    <div className="pt-8 border-t border-ink/10 flex flex-col sm:flex-row gap-3">
                      <a
                        href={whatsappUrl(`Hi Iyiola, I saw ${selectedProject.title} on your portfolio and I'd like something similar built.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-ink text-paper rounded-full font-medium transition-colors hover:bg-black"
                      >
                        Build something like this
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="flex-1 flex items-center justify-center gap-3 px-8 py-4 border border-ink/20 hover:border-ink/50 rounded-full text-ink font-medium transition-colors"
                      >
                        Back to all work
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
