import React from 'react';
import AdminSidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0A0A0A] text-slate-200 overflow-hidden font-sans">
      <AdminSidebar />
      <main className="flex-1 ml-64 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
