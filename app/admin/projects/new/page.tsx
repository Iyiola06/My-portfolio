'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Upload, Image as ImageIcon, X, Globe, Github, Code, Layout, Type } from 'lucide-react';

export default function NewProjectPage() {
  const [activeTab, setActiveTab] = useState('content');
  const [status, setStatus] = useState('Draft');

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="p-2 rounded-full bg-[#141414] border border-[#2A2A25] text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Add New Project</h1>
            <p className="text-gray-400 text-sm">Create a new case study for your portfolio.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Discard
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-[#141414] border border-[#2A2A25] rounded-md text-white hover:bg-[#1a1a15] transition-colors flex items-center gap-2">
            <Save size={16} />
            Save Draft
          </button>
          <button className="px-4 py-2 text-sm font-bold bg-[#d39e17] text-[#0A0A0A] rounded-md hover:bg-[#e5b02b] transition-colors shadow-[0_0_15px_-3px_rgba(211,158,23,0.3)] hover:shadow-[0_0_20px_-3px_rgba(211,158,23,0.5)]">
            Publish Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Basic Info Card */}
          <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Project Name</label>
              <input 
                type="text" 
                placeholder="e.g. E-Commerce Platform Redesign" 
                className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors placeholder-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Short Description</label>
              <textarea 
                rows={3}
                placeholder="Brief overview of the project for the card preview..." 
                className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors placeholder-gray-600 resize-none"
              />
            </div>
          </div>

          {/* Editor Tabs */}
          <div className="bg-[#141414] border border-[#2A2A25] rounded-lg overflow-hidden flex flex-col min-h-[500px]">
            <div className="flex border-b border-[#2A2A25] bg-[#1a1a15]">
              {['Content', 'Problem Statement', 'Solution'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                  className={`px-6 py-3 text-sm font-medium border-r border-[#2A2A25] transition-colors ${
                    activeTab === tab.toLowerCase().split(' ')[0]
                      ? 'bg-[#141414] text-[#d39e17] border-t-2 border-t-[#d39e17]'
                      : 'text-gray-400 hover:text-white hover:bg-[#141414]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 border-b border-[#2A2A25] bg-[#141414]">
              <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded"><Type size={16} /></button>
              <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded font-bold">B</button>
              <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded italic">I</button>
              <div className="w-px h-4 bg-[#2A2A25] mx-1"></div>
              <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded"><Code size={16} /></button>
              <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded"><Layout size={16} /></button>
            </div>

            <textarea 
              className="flex-1 w-full bg-[#0A0A0A] p-6 text-gray-300 font-mono text-sm focus:outline-none resize-none"
              placeholder="# Project Case Study..."
              defaultValue={`## Overview\n\nThis project was designed to solve...\n\n### Key Features\n\n- Feature 1\n- Feature 2\n`}
            />
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          
          {/* Status Card */}
          <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Publishing</h3>
            
            <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded border border-[#2A2A25]">
              <span className="text-sm text-gray-400">Status</span>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                status === 'Published' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'
              }`}>
                {status}
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-[#1a1a15] text-[#d39e17] focus:ring-[#d39e17]/20" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Feature on Homepage</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-[#1a1a15] text-[#d39e17] focus:ring-[#d39e17]/20" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Allow Comments</span>
              </label>
            </div>
          </div>

          {/* Category & Tech Stack */}
          <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Organization</h3>
            
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-400 uppercase">Category</label>
              <select className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded p-2 text-sm text-white focus:outline-none focus:border-[#d39e17]">
                <option>Select Category...</option>
                <option>Full Stack Development</option>
                <option>Frontend Engineering</option>
                <option>Backend Architecture</option>
                <option>DevOps & Cloud</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-400 uppercase">Tech Stack</label>
              <input 
                type="text" 
                placeholder="Add tags..." 
                className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded p-2 text-sm text-white focus:outline-none focus:border-[#d39e17]"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {['React', 'Next.js', 'Tailwind'].map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#2A2A25] text-xs text-gray-300 border border-[#333]">
                    {tag}
                    <button className="hover:text-white"><X size={12} /></button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Links</h3>
            
            <div className="space-y-3">
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Live Demo URL" 
                  className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded p-2 pl-9 text-sm text-white focus:outline-none focus:border-[#d39e17]"
                />
              </div>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="GitHub Repository" 
                  className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded p-2 pl-9 text-sm text-white focus:outline-none focus:border-[#d39e17]"
                />
              </div>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Project Thumbnail</h3>
            
            <div className="border-2 border-dashed border-[#2A2A25] rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-[#d39e17]/50 hover:bg-[#1a1a15] transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-[#1a1a15] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon className="text-gray-500 group-hover:text-[#d39e17]" size={24} />
              </div>
              <p className="text-sm text-gray-300 font-medium">Click to upload</p>
              <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 3MB)</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
