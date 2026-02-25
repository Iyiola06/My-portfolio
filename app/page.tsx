'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, Linkedin, Twitter, Mail, ExternalLink, Code, Database, Server, Layout, Terminal, Cpu, ChevronRight, Send, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Project Inquiry', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: 'Project Inquiry', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-200 font-sans selection:bg-[#d39e17] selection:text-black">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#1a1a15]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded bg-[#d39e17]/10 border border-[#d39e17]/20 flex items-center justify-center text-[#d39e17] group-hover:bg-[#d39e17] group-hover:text-[#0A0A0A] transition-all duration-300">
              <Terminal size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-[#d39e17] transition-colors">Iyiola.dev</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#about" className="hover:text-[#d39e17] transition-colors">About</a>
            <a href="#work" className="hover:text-[#d39e17] transition-colors">Work</a>
            <a href="#process" className="hover:text-[#d39e17] transition-colors">Process</a>
            <a href="#contact" className="hover:text-[#d39e17] transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[#2A2A25] hover:border-[#d39e17] hover:text-[#d39e17] transition-all text-xs font-mono uppercase tracking-wider">
                <Terminal size={14} />
                Admin
              </button>
            </Link>
            <button className="bg-[#d39e17] hover:bg-[#e5b02b] text-[#0A0A0A] px-5 py-2.5 rounded-md font-bold text-sm transition-all shadow-[0_0_15px_-3px_rgba(211,158,23,0.3)] hover:shadow-[0_0_20px_-3px_rgba(211,158,23,0.5)]">
              Let&apos;s Talk
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#d39e17]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-[#2A2A25] rounded-full opacity-20 animate-spin-slow pointer-events-none"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 border border-[#d39e17]/10 rounded-full opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d39e17]/10 border border-[#d39e17]/20 text-[#d39e17] font-mono text-xs tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d39e17] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d39e17]"></span>
              </span>
              Available for new projects
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              I build systems <br />
              that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d39e17] to-[#b08312]">scale.</span>
            </h1>

            <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
              Senior Full Stack Developer specializing in high-performance web applications,
              distributed systems, and modern frontend architecture.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-[#d39e17] hover:bg-[#e5b02b] text-[#0A0A0A] px-8 py-4 rounded-md font-bold text-sm transition-all shadow-[0_0_15px_-3px_rgba(211,158,23,0.3)] hover:shadow-[0_0_20px_-3px_rgba(211,158,23,0.5)] flex items-center gap-2">
                View Selected Work
                <ArrowRight size={18} />
              </button>
              <button className="px-8 py-4 rounded-md border border-[#2A2A25] hover:border-white text-white font-medium text-sm transition-all flex items-center gap-2 bg-[#141414]/50 backdrop-blur-sm">
                <Github size={18} />
                Github
              </button>
            </div>

            <div className="pt-8 flex items-center gap-6 text-gray-500">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A0A0A] bg-[#1a1a15] flex items-center justify-center text-xs font-bold text-gray-400">
                    U{i}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="block text-white font-bold">50+ Happy Clients</span>
                <span className="text-xs">Worldwide</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative z-10 bg-[#141414] border border-[#2A2A25] rounded-2xl p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#d39e17] rounded-full blur-[40px] opacity-20"></div>
              <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/hero/600/400"
                  alt="Developer Workspace"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Floating Code Card */}
              <div className="absolute -bottom-10 -left-10 bg-[#0F0F0A] border border-[#2A2A25] p-4 rounded-lg shadow-xl max-w-xs">
                <div className="flex items-center gap-2 mb-3 border-b border-[#2A2A25] pb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-500 ml-2 font-mono">config.ts</span>
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex gap-2">
                    <span className="text-purple-400">const</span>
                    <span className="text-blue-400">developer</span>
                    <span className="text-white">=</span>
                    <span className="text-yellow-400">{`{`}</span>
                  </div>
                  <div className="pl-4 flex gap-2">
                    <span className="text-red-400">name:</span>
                    <span className="text-green-400">&apos;Iyiola&apos;</span>,
                  </div>
                  <div className="pl-4 flex gap-2">
                    <span className="text-red-400">role:</span>
                    <span className="text-green-400">&apos;Senior Dev&apos;</span>,
                  </div>
                  <div className="pl-4 flex gap-2">
                    <span className="text-red-400">status:</span>
                    <span className="text-green-400">&apos;Online&apos;</span>
                  </div>
                  <div className="text-yellow-400">{`}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <div className="py-10 border-y border-[#1a1a15] bg-[#0F0F0A] overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0F0F0A] to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0F0F0A] to-transparent z-10"></div>

        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Figma'].map((tech, i) => (
            <div key={i} className="flex items-center gap-2 text-xl font-bold text-gray-500 hover:text-[#d39e17] transition-colors cursor-default">
              <span className="text-[#d39e17] opacity-50 text-sm">●</span>
              {tech}
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Figma'].map((tech, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-2 text-xl font-bold text-gray-500 hover:text-[#d39e17] transition-colors cursor-default">
              <span className="text-[#d39e17] opacity-50 text-sm">●</span>
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Expertise Section */}
      <section id="about" className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Expertise</h2>
            <div className="w-20 h-1 bg-[#d39e17]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Frontend Architecture', icon: Layout, desc: 'Building complex, scalable UI systems with React, Next.js, and modern CSS frameworks.' },
              { title: 'Backend Engineering', icon: Server, desc: 'Designing robust APIs and microservices using Node.js, Python, and Go.' },
              { title: 'Database Design', icon: Database, desc: 'Optimizing data schemas and queries for PostgreSQL, MongoDB, and Redis.' },
              { title: 'DevOps & Cloud', icon: Cpu, desc: 'Automating CI/CD pipelines and managing infrastructure on AWS and Google Cloud.' },
              { title: 'Web3 Development', icon: Code, desc: 'Smart contract development and dApp integration with Ethereum and Solana.' },
              { title: 'System Design', icon: Terminal, desc: 'Architecting distributed systems for high availability and fault tolerance.' },
            ].map((skill, idx) => (
              <div key={idx} className="group p-8 rounded-xl bg-[#141414] border border-[#2A2A25] hover:border-[#d39e17]/50 transition-all hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 rounded bg-[#1a1a15] flex items-center justify-center mb-6 text-[#d39e17] group-hover:scale-110 transition-transform">
                  <skill.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#d39e17] transition-colors">{skill.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="work" className="py-24 px-6 bg-[#0F0F0A] border-y border-[#1a1a15]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Selected Work</h2>
              <div className="w-20 h-1 bg-[#d39e17]"></div>
            </div>
            <div className="flex gap-4">
              {['All', 'Full Stack', 'Mobile', 'Web3'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.toLowerCase()
                    ? 'bg-[#d39e17] text-[#0A0A0A]'
                    : 'bg-[#141414] text-gray-400 hover:text-white border border-[#2A2A25]'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-24">
            {/* Project 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group">
              <div className="relative order-2 lg:order-1">
                <div className="absolute inset-0 bg-[#d39e17]/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative rounded-xl overflow-hidden border border-[#2A2A25] group-hover:border-[#d39e17]/30 transition-colors h-[400px]">
                  <Image
                    src="https://picsum.photos/seed/proj1/800/600"
                    alt="Project Preview"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60"></div>
                </div>
              </div>

              <div className="space-y-6 order-1 lg:order-2">
                <div className="flex items-center gap-3">
                  <span className="text-[#d39e17] font-mono text-xs tracking-widest uppercase">E-Commerce</span>
                  <span className="w-12 h-px bg-[#2A2A25]"></span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">Multi-Vendor Marketplace</h3>
                <p className="text-gray-400 leading-relaxed">
                  A comprehensive e-commerce solution enabling multiple vendors to sell products.
                  Features real-time inventory management, advanced analytics dashboard, and
                  seamless payment integration.
                </p>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#1a1a15]">
                  <div>
                    <span className="block text-2xl font-bold text-white font-mono">50k+</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Daily Users</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-white font-mono">99.9%</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Uptime</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'].map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-[#141414] border border-[#2A2A25] text-xs text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex gap-4">
                  <button className="flex items-center gap-2 text-[#d39e17] font-bold hover:gap-3 transition-all">
                    View Case Study <ArrowRight size={18} />
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ExternalLink size={18} /> Live Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Project 2 - Reversed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group">
              <div className="space-y-6 order-1">
                <div className="flex items-center gap-3">
                  <span className="text-[#d39e17] font-mono text-xs tracking-widest uppercase">Fintech</span>
                  <span className="w-12 h-px bg-[#2A2A25]"></span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">Crypto Asset Dashboard</h3>
                <p className="text-gray-400 leading-relaxed">
                  Real-time cryptocurrency tracking and portfolio management tool.
                  Integrates with multiple exchanges via WebSocket APIs for live price updates
                  and automated trading execution.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'WebSockets', 'D3.js', 'Firebase'].map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-[#141414] border border-[#2A2A25] text-xs text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex gap-4">
                  <button className="flex items-center gap-2 text-[#d39e17] font-bold hover:gap-3 transition-all">
                    View Case Study <ArrowRight size={18} />
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <Github size={18} /> View Code
                  </button>
                </div>
              </div>

              <div className="relative order-2">
                <div className="absolute inset-0 bg-[#d39e17]/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative rounded-xl overflow-hidden border border-[#2A2A25] group-hover:border-[#d39e17]/30 transition-colors h-[400px]">
                  <Image
                    src="https://picsum.photos/seed/proj2/800/600"
                    alt="Project Preview"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Process</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A systematic approach to building high-quality software, ensuring scalability and performance from day one.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#2A2A25] -translate-y-1/2 hidden lg:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { step: '01', title: 'Discovery', desc: 'Understanding requirements and defining the technical roadmap.' },
                { step: '02', title: 'Architecture', desc: 'Designing scalable database schemas and system infrastructure.' },
                { step: '03', title: 'Development', desc: 'Writing clean, maintainable code with rigorous testing.' },
                { step: '04', title: 'Deployment', desc: 'CI/CD pipelines, monitoring, and performance optimization.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#141414] border border-[#2A2A25] p-8 rounded-xl hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#1a1a15] border border-[#2A2A25] flex items-center justify-center text-[#d39e17] font-bold font-mono mb-6 mx-auto lg:mx-0 relative z-20">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center lg:text-left">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed text-center lg:text-left">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-[#0F0F0A] border-t border-[#1a1a15]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d39e17]/10 border border-[#d39e17]/20 text-[#d39e17] font-mono text-xs tracking-wider mb-6">
            <Mail size={14} />
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Have a project in mind?</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            I&apos;m currently available for freelance work and open to full-time opportunities.
            Let&apos;s discuss how I can help your team.
          </p>
          <div className="bg-[#141414] border border-[#2A2A25] rounded-2xl p-8 md:p-12 text-left">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {submitStatus === 'success' && (
                <div className="md:col-span-2 p-4 bg-green-900/20 border border-green-900/30 text-green-400 rounded-md text-center">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="md:col-span-2 p-4 bg-red-900/20 border border-red-900/30 text-red-400 rounded-md text-center">
                  Something went wrong. Please try again.
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-300">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors"
                >
                  <option>Project Inquiry</option>
                  <option>Job Opportunity</option>
                  <option>Consultation</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-300">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#d39e17] hover:bg-[#e5b02b] text-[#0A0A0A] py-4 rounded-md font-bold text-sm transition-all shadow-[0_0_15px_-3px_rgba(211,158,23,0.3)] hover:shadow-[0_0_20px_-3px_rgba(211,158,23,0.5)] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0A0A0A] border-t border-[#1a1a15]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#d39e17]/10 border border-[#d39e17]/20 flex items-center justify-center text-[#d39e17]">
              <Terminal size={16} />
            </div>
            <span className="font-bold text-white">Iyiola.dev</span>
          </div>

          <div className="text-gray-500 text-sm">
            © 2024 Iyiola Ogunjobi. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-[#d39e17] transition-colors"><Github size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-[#d39e17] transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-[#d39e17] transition-colors"><Twitter size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
