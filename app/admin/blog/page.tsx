import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import BlogTable from '@/components/admin/BlogTable';

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  const totalPosts = posts?.length || 0;
  const publishedCount = posts?.filter((p: any) => p.status === 'Published').length || 0;
  const draftCount = posts?.filter((p: any) => p.status === 'Draft').length || 0;
  const totalViews = posts?.reduce((sum: number, p: any) => sum + (p.views || 0), 0) || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Blog Posts</h1>
          <p className="text-gray-400 mt-1">Manage your articles and thoughts.</p>
        </div>
        <Link href="/admin/blog/new">
          <button className="flex items-center gap-2 bg-[#d39e17] hover:bg-[#e5b02b] text-[#0A0A0A] px-4 py-2 rounded-md font-bold text-sm transition-all shadow-[0_0_15px_-3px_rgba(211,158,23,0.3)] hover:shadow-[0_0_20px_-3px_rgba(211,158,23,0.5)]">
            <Plus size={18} />
            New Post
          </button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Posts', value: totalPosts.toString().padStart(2, '0'), color: 'text-blue-400' },
          { label: 'Published', value: publishedCount.toString().padStart(2, '0'), color: 'text-green-400' },
          { label: 'Drafts', value: draftCount.toString().padStart(2, '0'), color: 'text-yellow-400' },
          { label: 'Total Views', value: totalViews.toLocaleString(), color: 'text-purple-400' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#141414] border border-[#2A2A25] p-5 rounded-lg hover:border-[#d39e17]/30 transition-colors">
            <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 font-mono ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <BlogTable initialPosts={posts || []} />
    </div>
  );
}
