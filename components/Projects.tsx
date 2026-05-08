'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
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

const projectsData = [
  {
    id: 1,
    title: 'Studify',
    category: 'AI Learning Operating System',
    description: 'A full-stack study platform with AI tutoring, essay grading, flashcards, exam readiness tools, gamification, billing, and Supabase-backed learning data.',
    technologies: ['Next.js', 'Supabase', 'Google GenAI', 'Vercel AI SDK', 'React'],
    metrics: { modules: '10+', stack: 'Full Stack', domain: 'EdTech' },
    mockupImage: 'https://picsum.photos/seed/studify/1920/1080',
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
    mockupImage: 'https://picsum.photos/seed/sprintroom/1920/1080',
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
    mockupImage: 'https://picsum.photos/seed/sulvalms/1920/1080',
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
    mockupImage: 'https://picsum.photos/seed/foundersweek/1920/1080',
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
    mockupImage: 'https://picsum.photos/seed/thedmashop/1920/1080',
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
    mockupImage: 'https://picsum.photos/seed/newsroom/1920/1080',
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
    mockupImage: 'https://picsum.photos/seed/lolabeauty/1920/1080',
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
    mockupImage: 'https://picsum.photos/seed/innercircle/1920/1080',
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
    mockupImage: 'https://picsum.photos/seed/timetable/1920/1080',
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
    mockupImage: 'https://picsum.photos/seed/bataganik/1920/1080',
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
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  return (
    <>
      <section id="projects" className="relative bg-sulva-black py-32 z-10 w-full overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-sulva-black via-sulva-purple/5 to-sulva-black pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-8 z-10">
          <div className="text-center mb-24 lg:mb-32">
            <h2 className="text-4xl sm:text-6xl font-medium text-white tracking-tight">
              Premium Projects
            </h2>
            <p className="mt-4 text-sulva-white-warm/60 font-light text-lg">
              Ten real systems spanning AI, education, commerce, media, community, and operations.
            </p>
          </div>

          <div className="flex flex-col gap-32">
            {projectsData.map((project, index) => (
              <div 
                key={project.id} 
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-24 items-center group`}
              >
                
                {/* Left Side: Typography & Details */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8">
                  <div className="flex items-center gap-4 text-sulva-white-warm/60">
                    <span className="w-8 h-[1px] bg-sulva-white-warm/30" />
                    <span className="font-mono text-sm tracking-widest uppercase">
                      {String(index + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-mono text-sulva-purple tracking-widest uppercase mb-3">
                      {project.category}
                    </h3>
                    <h2 className="text-4xl sm:text-5xl font-medium text-white tracking-tight leading-tight">
                      {project.title}
                    </h2>
                  </div>

                  <p className="text-lg text-sulva-white-warm/80 font-light leading-relaxed max-w-md">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-4">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-4 py-1.5 text-xs text-sulva-white-warm bg-white/5 border border-white/10 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-8">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="group/btn flex items-center gap-3 px-6 py-3 bg-white text-sulva-black rounded-full font-medium transition-all hover:bg-sulva-white-warm"
                    >
                      <span>Explore Project</span>
                      <ArrowRight className="w-4 h-4 group/btn-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right Side: Visuals & Mockups */}
                <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px]">
                   <div 
                     className="absolute inset-0 w-full h-full cursor-pointer"
                     onClick={() => setSelectedProject(project)}
                   >
                     {/* Main Image Plate */}
                     <div className="absolute inset-0 rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                       <Image 
                         src={project.mockupImage} 
                         alt={project.title}
                         fill
                         className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:scale-105"
                         referrerPolicy="no-referrer"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-sulva-black/80 via-transparent to-transparent opacity-60" />
                     </div>
                     
                     {/* Floating Element 1 */}
                     <motion.div 
                       animate={{ y: [0, -10, 0] }}
                       transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                       className="absolute -top-4 -right-4 lg:-top-8 lg:-right-8 w-24 h-24 lg:w-32 lg:h-32 glass-panel rounded-full flex items-center justify-center border border-white/10 shadow-2xl z-20 backdrop-blur-2xl"
                     >
                       <div className="text-sulva-white-warm scale-125">
                         {project.icon}
                       </div>
                     </motion.div>
                   </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULLSCREEN PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          >
            {/* Modal Backdrop */}
            <div 
              className="absolute inset-0 bg-sulva-black/60" 
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Content Container */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] bg-sulva-black rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-black/50 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Area */}
              <div className="overflow-y-auto h-full smooth-scrollbar">
                
                {/* Modal Hero */}
                <div className="relative h-[50vh] sm:h-[60vh] w-full flex items-end p-8 sm:p-16">
                  <Image 
                    src={selectedProject.mockupImage} 
                    alt={selectedProject.title}
                    fill
                    className="object-cover opacity-50 mix-blend-luminosity"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                  
                  <div className="relative z-10 max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <h4 className="text-sm font-mono text-sulva-purple tracking-widest uppercase mb-4">
                        {selectedProject.category}
                      </h4>
                      <h2 className="text-5xl sm:text-7xl font-medium text-white tracking-tight leading-tight mb-6">
                        {selectedProject.title}
                      </h2>
                    </motion.div>
                  </div>
                </div>

                {/* Modal Layout Grid */}
                <div className="p-8 sm:p-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
                  
                  {/* Left Column: Details */}
                  <div className="lg:col-span-1 space-y-12">
                    <div>
                      <h4 className="text-xs text-sulva-white-warm/50 font-mono uppercase tracking-widest mb-4">Project Mission</h4>
                      <p className="text-lg text-white font-light leading-relaxed">{selectedProject.mission}</p>
                    </div>

                    <div>
                      <h4 className="text-xs text-sulva-white-warm/50 font-mono uppercase tracking-widest mb-4">Impact Metrics</h4>
                      <div className="space-y-6">
                        {Object.entries(selectedProject.metrics).map(([key, value], i) => (
                          <div key={i} className="pb-4 border-b border-white/5">
                            <div className="text-3xl font-medium text-white mb-1">{value as string}</div>
                            <div className="text-sm text-sulva-white-warm/60 uppercase tracking-widest">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs text-sulva-white-warm/50 font-mono uppercase tracking-widest mb-4">Tech Stack</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.techStack.map((tech, i) => (
                          <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                            <span className="text-sulva-white-warm/70">{tech.icon}</span>
                            <span className="text-sm text-white font-medium">{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Story */}
                  <div className="lg:col-span-2 space-y-16">
                    <div>
                      <h3 className="text-2xl font-medium text-white mb-6">My Thinking</h3>
                      <p className="text-xl text-sulva-white-warm/70 font-light leading-relaxed">
                        {/* @ts-ignore */}
                        {selectedProject.myThinking}
                      </p>
                    </div>

                    {/* Mid-content Img */}
                    <div className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden glass-panel border border-white/10">
                       <Image 
                        src={selectedProject.mockupImage} 
                        alt="Project detail"
                        fill
                        className="object-cover opacity-80"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div>
                      <h3 className="text-2xl font-medium text-white mb-6">Design Philosophy & Architecture</h3>
                      <p className="text-xl text-sulva-white-warm/70 font-light leading-relaxed">
                        {/* @ts-ignore */}
                        {selectedProject.designPhilosophy}
                      </p>
                    </div>

                    {/* CTA Area */}
                    <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-6">
                      <button className="flex-1 group relative px-8 py-4 bg-white text-sulva-black rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]">
                        <span className="relative z-10 font-medium tracking-wide flex items-center justify-center gap-3">
                          View Live Experience
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </button>
                      <button className="flex-1 group relative px-8 py-4 bg-white/5 border border-white/10 hover:border-white/30 rounded-full overflow-hidden transition-all duration-500">
                        <span className="relative z-10 text-white font-medium tracking-wide flex items-center justify-center gap-3">
                          Read Case Study
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
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
