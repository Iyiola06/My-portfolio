'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Check, Type, Code, Layout } from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase';

export default function EditBlogPostPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [content, setContent] = useState('');

    const router = useRouter();
    const params = useParams();
    const supabase = createBrowserSupabaseClient();

    useEffect(() => {
        async function fetchPost() {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) {
                alert('Error fetching post: ' + error.message);
                router.push('/admin/blog');
                return;
            }

            if (data) {
                setTitle(data.title || '');
                setCategory(data.category || 'Engineering');
                setStatus(data.status || 'Draft');
                setContent(data.content || '');
            }
            setLoading(false);
        }

        fetchPost();
    }, [params.id, supabase, router]);

    const handleSubmit = async (e: React.FormEvent, finalStatus?: string) => {
        e.preventDefault();
        setSaving(true);
        const useStatus = finalStatus || status;

        try {
            const { error } = await supabase.from('blog_posts').update({
                title,
                category,
                content,
                status: useStatus,
            }).eq('id', params.id);

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                router.refresh();
            }, 2000);

        } catch (err: any) {
            alert('Error updating post: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="animate-spin text-[#d39e17]" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog" className="p-2 rounded-full bg-[#141414] border border-[#2A2A25] text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Edit Blog Post</h1>
                        <p className="text-gray-400 text-sm">Update your article details.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={(e) => handleSubmit(e)}
                        disabled={saving || success}
                        className="px-4 py-2 text-sm font-bold bg-[#d39e17] text-[#0A0A0A] rounded-md hover:bg-[#e5b02b] transition-colors shadow-[0_0_15px_-3px_rgba(211,158,23,0.3)] hover:shadow-[0_0_20px_-3px_rgba(211,158,23,0.5)] flex items-center gap-2 disabled:opacity-50"
                    >
                        {success ? <Check size={16} /> : (saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />)}
                        {success ? 'Changes Saved!' : (saving ? 'Saving...' : 'Save Changes')}
                    </button>
                </div>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Blog Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors placeholder-gray-600"
                                required
                            />
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="bg-[#141414] border border-[#2A2A25] rounded-lg overflow-hidden flex flex-col min-h-[500px]">
                        <div className="flex border-b border-[#2A2A25] bg-[#1a1a15]">
                            <button
                                type="button"
                                className="px-6 py-3 text-sm font-medium border-r border-[#2A2A25] bg-[#141414] text-[#d39e17] border-t-2 border-t-[#d39e17]"
                            >
                                Content
                            </button>
                        </div>

                        <div className="flex items-center gap-1 p-2 border-b border-[#2A2A25] bg-[#141414]">
                            <button type="button" className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded"><Type size={16} /></button>
                            <button type="button" className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded font-bold">B</button>
                            <button type="button" className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded italic">I</button>
                            <div className="w-px h-4 bg-[#2A2A25] mx-1"></div>
                            <button type="button" className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded"><Code size={16} /></button>
                            <button type="button" className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded"><Layout size={16} /></button>
                        </div>

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="flex-1 w-full bg-[#0A0A0A] p-6 text-gray-300 font-mono text-sm focus:outline-none resize-none"
                            placeholder="# Write your blog content here..."
                        />
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-5 space-y-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Settings</h3>

                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-gray-400 uppercase">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded p-2 text-sm text-white focus:outline-none focus:border-[#d39e17]"
                            >
                                <option>Engineering</option>
                                <option>Tutorial</option>
                                <option>Opinion</option>
                                <option>Personal</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-gray-400 uppercase">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className={`w-full bg-[#0A0A0A] border border-[#2A2A25] rounded p-2 text-sm focus:outline-none focus:border-[#d39e17] ${status === 'Published' ? 'text-green-400' : 'text-yellow-400'
                                    }`}
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
