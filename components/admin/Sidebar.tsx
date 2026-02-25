'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderOpen, FileText, BarChart2, Settings, LogOut, Terminal } from 'lucide-react';
import { clsx } from 'clsx';

import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-[#0F0F0A] border-r border-[#1a1a15] flex flex-col transition-transform duration-300 ease-in-out transform -translate-x-full md:translate-x-0">
      {/* Brand */}
      <div className="flex items-center gap-3 h-16 px-6 border-b border-[#1a1a15]">
        <div className="w-8 h-8 rounded bg-[#d39e17]/10 border border-[#d39e17]/20 flex items-center justify-center text-[#d39e17]">
          <Terminal size={18} />
        </div>
        <span className="font-bold text-lg tracking-tight text-white">Admin Panel</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200 group',
                isActive
                  ? 'bg-[#d39e17]/10 text-[#d39e17] border border-[#d39e17]/20 shadow-[0_0_10px_-3px_rgba(211,158,23,0.1)]'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a15]'
              )}
            >
              <item.icon
                size={18}
                className={clsx(
                  'transition-colors',
                  isActive ? 'text-[#d39e17]' : 'text-gray-500 group-hover:text-white'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-[#1a1a15]">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d39e17] to-[#b08312] flex items-center justify-center text-[#0A0A0A] font-bold text-xs">
            IO
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Iyiola Ogunjobi</span>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-900/10 rounded transition-colors"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
