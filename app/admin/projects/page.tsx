'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    category: 'Full Stack',
    tech: ['Next.js', 'Node.js', 'PostgreSQL'],
    status: 'Published',
    date: 'Oct 24, 2023',
    image: 'https://picsum.photos/seed/1/400/300'
  },
  {
    id: 2,
    name: 'Finance Dashboard',
    category: 'Frontend',
    tech: ['React', 'Tailwind', 'Recharts'],
    status: 'Draft',
    date: 'Nov 12, 2023',
    image: 'https://picsum.photos/seed/2/400/300'
  },
  {
    id: 3,
    name: 'AI Chat Interface',
    category: 'AI/ML',
    tech: ['OpenAI', 'Python', 'FastAPI'],
    status: 'Published',
    date: 'Dec 05, 2023',
    image: 'https://picsum.photos/seed/3/400/300'
  },
  {
    id: 4,
    name: 'Crypto Wallet App',
    category: 'Web3',
    tech: ['Solidity', 'Ethers.js', 'React Native'],
    status: 'Review',
    date: 'Jan 15, 2024',
    image: 'https://picsum.photos/seed/4/400/300'
  },
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');

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
          { label: 'Total Projects', value: '12', icon: CheckCircle, color: 'text-blue-400' },
          { label: 'Published', value: '08', icon: Eye, color: 'text-green-400' },
          { label: 'Drafts', value: '04', icon: Clock, color: 'text-yellow-400' },
          { label: 'Categories', value: '06', icon: Filter, color: 'text-purple-400' },
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

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-[#141414] p-4 rounded-lg border border-[#2A2A25]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#d39e17] transition-colors placeholder-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-[#0A0A0A] border border-[#2A2A25] rounded-md py-2 px-4 text-sm text-gray-300 focus:outline-none focus:border-[#d39e17] cursor-pointer">
            <option>All Categories</option>
            <option>Full Stack</option>
            <option>Frontend</option>
            <option>Backend</option>
          </select>
          <select className="bg-[#0A0A0A] border border-[#2A2A25] rounded-md py-2 px-4 text-sm text-gray-300 focus:outline-none focus:border-[#d39e17] cursor-pointer">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Review</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-[#141414] border border-[#2A2A25] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1a1a15] text-gray-400 uppercase text-xs font-medium border-b border-[#2A2A25]">
              <tr>
                <th className="px-6 py-4">Project Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Tech Stack</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A25]">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-[#1a1a15]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-gray-800 overflow-hidden border border-[#2A2A25] relative">
                        <Image src={project.image} alt={project.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="font-medium text-white">{project.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{project.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-[#2A2A25] text-gray-400 border border-[#333]">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      project.status === 'Published' ? 'bg-green-900/20 text-green-400 border-green-900/30' :
                      project.status === 'Draft' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-900/30' :
                      'bg-blue-900/20 text-blue-400 border-blue-900/30'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        project.status === 'Published' ? 'bg-green-400' :
                        project.status === 'Draft' ? 'bg-yellow-400' :
                        'bg-blue-400'
                      }`}></span>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">{project.date}</td>
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
        
        {/* Pagination */}
        <div className="bg-[#1a1a15] px-6 py-4 border-t border-[#2A2A25] flex items-center justify-between">
          <span className="text-xs text-gray-500">Showing 1-4 of 12 projects</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs rounded border border-[#2A2A25] text-gray-400 hover:text-white hover:border-gray-600 disabled:opacity-50 transition-colors" disabled>Previous</button>
            <button className="px-3 py-1 text-xs rounded border border-[#2A2A25] text-gray-400 hover:text-white hover:border-gray-600 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
