'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Type, Code, Layout, Image as ImageIcon, X } from 'lucide-react';

export default function NewBlogPostPage() {
  const [activeTab, setActiveTab] = useState('write');

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 rounded-full bg-[#141414] border border-[#2A2A25] text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">New Blog Post</h1>
            <p className="text-gray-400 text-sm">Share your thoughts and expertise.</p>
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
            Publish Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="space-y-2">
            <input 
              type="text" 
              placeholder="Post Title" 
              className="w-full bg-transparent border-none text-4xl font-bold text-white placeholder-gray-600 focus:ring-0 px-0"
            />
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-4 border-b border-[#2A2A25]">
            <button 
              onClick={() => setActiveTab('write')}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === 'write' ? 'text-[#d39e17]' : 'text-gray-400 hover:text-white'
              }`}
            >
              Write
              {activeTab === 'write' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d39e17]"></div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === 'preview' ? 'text-[#d39e17]' : 'text-gray-400 hover:text-white'
              }`}
            >
              Preview
              {activeTab === 'preview' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d39e17]"></div>
              )}
            </button>
          </div>

          {/* Editor */}
          {activeTab === 'write' ? (
            <div className="bg-[#141414] border border-[#2A2A25] rounded-lg overflow-hidden flex flex-col min-h-[600px]">
              {/* Toolbar */}
              <div className="flex items-center gap-1 p-2 border-b border-[#2A2A25] bg-[#1a1a15]">
                <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded"><Type size={16} /></button>
                <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded font-bold">B</button>
                <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded italic">I</button>
                <div className="w-px h-4 bg-[#2A2A25] mx-1"></div>
                <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded"><Code size={16} /></button>
                <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded"><Layout size={16} /></button>
                <div className="w-px h-4 bg-[#2A2A25] mx-1"></div>
                <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded"><ImageIcon size={16} /></button>
              </div>

              <textarea 
                className="flex-1 w-full bg-[#0A0A0A] p-6 text-gray-300 font-mono text-lg leading-relaxed focus:outline-none resize-none"
                placeholder="Start writing your story..."
              />
            </div>
          ) : (
            <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-8 min-h-[600px] prose prose-invert max-w-none">
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>Preview mode is not available yet.</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          
          {/* Organization */}
          <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Details</h3>
            
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-400 uppercase">Category</label>
              <select className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded p-2 text-sm text-white focus:outline-none focus:border-[#d39e17]">
                <option>Engineering</option>
                <option>Tutorial</option>
                <option>Opinion</option>
                <option>Career</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-400 uppercase">Tags</label>
              <input 
                type="text" 
                placeholder="Add tags..." 
                className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded p-2 text-sm text-white focus:outline-none focus:border-[#d39e17]"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {['Next.js', 'React'].map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#2A2A25] text-xs text-gray-300 border border-[#333]">
                    {tag}
                    <button className="hover:text-white"><X size={12} /></button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Cover Image</h3>
            
            <div className="border-2 border-dashed border-[#2A2A25] rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-[#d39e17]/50 hover:bg-[#1a1a15] transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-[#1a1a15] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon className="text-gray-500 group-hover:text-[#d39e17]" size={24} />
              </div>
              <p className="text-sm text-gray-300 font-medium">Click to upload</p>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">SEO</h3>
            
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-400 uppercase">Slug</label>
              <input 
                type="text" 
                placeholder="post-url-slug" 
                className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded p-2 text-sm text-white focus:outline-none focus:border-[#d39e17]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-400 uppercase">Meta Description</label>
              <textarea 
                rows={3}
                placeholder="Description for search engines..." 
                className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded p-2 text-sm text-white focus:outline-none focus:border-[#d39e17] resize-none"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
