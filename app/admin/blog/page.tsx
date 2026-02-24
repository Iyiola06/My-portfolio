'use client';

import React from 'react';
import { FileText, Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

const posts = [
  {
    id: 1,
    title: 'Building Scalable Systems with Next.js',
    category: 'Engineering',
    status: 'Published',
    date: 'Oct 15, 2023',
    views: 1240,
  },
  {
    id: 2,
    title: 'The Future of Web Development: AI Integration',
    category: 'Opinion',
    status: 'Draft',
    date: 'Nov 02, 2023',
    views: 0,
  },
  {
    id: 3,
    title: 'Optimizing React Performance',
    category: 'Tutorial',
    status: 'Published',
    date: 'Sep 28, 2023',
    views: 856,
  },
];

export default function BlogPage() {
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

      {/* Posts Table */}
      <div className="bg-[#141414] border border-[#2A2A25] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1a1a15] text-gray-400 uppercase text-xs font-medium border-b border-[#2A2A25]">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A25]">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#1a1a15]/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-white">{post.title}</td>
                  <td className="px-6 py-4 text-gray-300">{post.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      post.status === 'Published' ? 'bg-green-900/20 text-green-400 border-green-900/30' :
                      'bg-yellow-900/20 text-yellow-400 border-yellow-900/30'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        post.status === 'Published' ? 'bg-green-400' : 'bg-yellow-400'
                      }`}></span>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">{post.date}</td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">{post.views}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-[#d39e17] hover:bg-[#d39e17]/10 rounded transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
