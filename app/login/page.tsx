'use client';

import React, { useState } from 'react';
import { Terminal, FolderOpen, Layers, Lock, Mail, Key, Eye, EyeOff, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@iyiola.dev');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/admin/projects');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row overflow-hidden bg-[#0A0A0A] text-slate-200 font-sans">
      {/* Left Column: Branding & Context */}
      <div className="relative hidden md:flex w-full md:w-[55%] flex-col justify-between p-12 lg:p-16 bg-[#0F0F0A] border-r border-[#1a1a15] overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d39e17' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
        </div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#d39e17]/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Top Branding */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded bg-[#d39e17]/10 border border-[#d39e17]/20 flex items-center justify-center text-[#d39e17]">
              <Terminal size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Iyiola Ogunjobi</h1>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#d39e17]/5 border border-[#d39e17]/10 text-[#d39e17] font-mono text-xs tracking-wider">
              <span>{'//'}</span>
              <span>ADMIN PANEL</span>
            </div>
            <div className="w-12 h-px bg-[#d39e17]/40 my-6"></div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              Manage your <span className="text-[#d39e17]">digital presence</span> from a secure command center.
            </h2>
            <p className="text-gray-400 text-lg max-w-md mt-4 leading-relaxed">
              Access your portfolio content, case studies, and analytics metrics through this dedicated terminal.
            </p>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="relative z-10 mt-auto">
          <div className="flex items-center gap-6 p-6 rounded-lg bg-[#141414]/80 border border-[#2A2A25] backdrop-blur-sm max-w-fit">
            <div className="flex items-center gap-3 pr-6 border-r border-[#2A2A25]">
              <FolderOpen className="text-[#d39e17]" size={24} />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white font-mono">6</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Projects</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Layers className="text-[#d39e17]" size={24} />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white font-mono">2</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Categories</span>
              </div>
            </div>
          </div>
          <div className="mt-8 font-mono text-xs text-gray-600">
            <p>System Status: <span className="text-green-500">● Online</span></p>
            <p className="mt-1">v2.4.0-stable</p>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full md:w-[45%] h-full flex flex-col justify-center items-center bg-[#0A0A0A] p-6 sm:p-12 relative min-h-screen">
        <div className="absolute top-0 right-0 p-8 w-full flex justify-end">
          <Link href="/" className="text-gray-500 hover:text-[#d39e17] transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={18} />
            Back to Portfolio
          </Link>
        </div>

        <div className="w-full max-w-[420px] mx-auto z-10">
          <div className="mb-10 text-center md:text-left">
            <p className="font-mono text-[#d39e17] text-sm mb-2 tracking-widest uppercase flex items-center justify-center md:justify-start gap-2">
              <Lock size={16} />
              secure access
            </p>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Please enter your credentials to authenticate.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2 group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative gold-glow rounded transition-all duration-300 border border-[#2A2A25] bg-[#141414]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-500 group-focus-within:text-[#d39e17] transition-colors" size={20} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@iyiola.dev"
                  className="block w-full pl-10 pr-3 py-3 bg-transparent border-none text-white placeholder-gray-600 focus:ring-0 sm:text-sm font-mono focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 group">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              </div>
              <div className="relative gold-glow rounded transition-all duration-300 border border-[#2A2A25] bg-[#141414]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="text-gray-500 group-focus-within:text-[#d39e17] transition-colors" size={20} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-10 py-3 bg-transparent border-none text-white placeholder-gray-600 focus:ring-0 sm:text-sm font-mono focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-[#1a1a15] text-[#d39e17] focus:ring-[#d39e17]/20 focus:ring-offset-0 transition duration-200"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400 select-none">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-[#d39e17] hover:text-[#e5b02b] transition-colors hover:underline decoration-[#d39e17]/30 underline-offset-4">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-[#0A0A0A] bg-[#d39e17] hover:bg-[#e5b02b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0A0A] focus:ring-[#d39e17] transition-all duration-200 shadow-[0_0_15px_-3px_rgba(211,158,23,0.3)] hover:shadow-[0_0_20px_-3px_rgba(211,158,23,0.5)] disabled:opacity-50"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-[#0A0A0A]/60" />
                  ) : (
                    <ShieldCheck className="h-5 w-5 text-[#0A0A0A]/60 group-hover:text-[#0A0A0A] transition-colors" />
                  )}
                </span>
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-12 flex items-center justify-center gap-2 text-xs text-gray-600 font-mono text-center">
            <ShieldCheck size={14} />
            <span>Protected area. Authorized access only.</span>
          </div>
          <div className="mt-8 border-t border-[#1a1a15] pt-6 text-center">
            <p className="text-xs text-gray-700">
              © 2024 Iyiola Ogunjobi. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
