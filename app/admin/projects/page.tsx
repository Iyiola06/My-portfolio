import React from 'react';
import Link from 'next/link';
import { Plus, Eye, CheckCircle, Clock, Filter } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import ProjectsTable from '@/components/admin/ProjectsTable';

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  const totalProjects = projects?.length || 0;
  const publishedCount = projects?.filter((p: any) => p.status === 'Published').length || 0;
  const draftCount = projects?.filter((p: any) => p.status === 'Draft').length || 0;
  const categoriesCount = new Set(projects?.map((p: any) => p.category)).size;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Projects</h1>
          <p className="text-gray-400 mt-1">Manage and organize your portfolio projects.</p>
        </div>
        <Link href="/admin/projects/new">
          <button className="flex items-center gap-2 bg-[#d39e17] hover:bg-[#e5b02b] text-[#0A0A0A] px-4 py-2 rounded-md font-bold text-sm transition-all shadow-[0_0_15px_-3px_rgba(211,158,23,0.3)] hover:shadow-[0_0_20px_-3px_rgba(211,158,23,0.5)]">
            <Plus size={18} />
            Add New Project
          </button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: totalProjects.toString().padStart(2, '0'), icon: CheckCircle, color: 'text-blue-400' },
          { label: 'Published', value: publishedCount.toString().padStart(2, '0'), icon: Eye, color: 'text-green-400' },
          { label: 'Drafts', value: draftCount.toString().padStart(2, '0'), icon: Clock, color: 'text-yellow-400' },
          { label: 'Categories', value: categoriesCount.toString().padStart(2, '0'), icon: Filter, color: 'text-purple-400' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#141414] border border-[#2A2A25] p-5 rounded-lg flex items-center justify-between group hover:border-[#d39e17]/30 transition-colors">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1 font-mono">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full bg-[#1a1a15] group-hover:bg-[#1a1a15]/80 transition-colors ${stat.color}`}>
              <stat.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      <ProjectsTable initialProjects={projects || []} />
    </div>
  );
}
