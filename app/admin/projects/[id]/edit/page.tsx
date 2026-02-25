'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Upload, Image as ImageIcon, X, Globe, Github, Code, Layout, Type, Loader2, Check } from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import Image from 'next/image';

export default function EditProjectPage() {
    const [activeTab, setActiveTab] = useState('content');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [liveUrl, setLiveUrl] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [tech, setTech] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');

    // Image State
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const params = useParams();
    const supabase = createBrowserSupabaseClient();

    useEffect(() => {
        async function fetchProject() {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) {
                alert('Error fetching project: ' + error.message);
                router.push('/admin/projects');
                return;
            }

            if (data) {
                setName(data.name || '');
                setDescription(data.description || '');
                setContent(data.content || '');
                setCategory(data.category || 'Full Stack Development');
                setStatus(data.status || 'Draft');
                setLiveUrl(data.live_url || '');
                setGithubUrl(data.github_url || '');
                setTech(data.tech || []);
                setImagePreview(data.image_url || null);
            }
            setLoading(false);
        }

        fetchProject();
    }, [params.id, supabase, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tech.includes(tagInput.trim())) {
                setTech([...tech, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTech(tech.filter(t => t !== tagToRemove));
    };

    const handleSubmit = async (e: React.FormEvent, finalStatus?: string) => {
        e.preventDefault();
        setSaving(true);
        const useStatus = finalStatus || status;

        try {
            let imageUrl = imagePreview;

            // 1. Upload Image if new one exists
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('project-images')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('project-images')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            // 2. Update Project
            const { error } = await supabase.from('projects').update({
                name,
                description,
                content,
                category,
                tech,
                status: useStatus,
                live_url: liveUrl,
                github_url: githubUrl,
                image_url: imageUrl
            }).eq('id', params.id);

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                router.refresh();
            }, 2000);

        } catch (err: any) {
            alert('Error updating project: ' + err.message);
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
                    <Link href="/admin/projects" className="p-2 rounded-full bg-[#141414] border border-[#2A2A25] text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Edit Project</h1>
                        <p className="text-gray-400 text-sm">Modify existing project details.</p>
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

                    {/* Basic Info Card */}
                    <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Project Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors placeholder-gray-600"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Short Description</label>
                            <textarea
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors placeholder-gray-600 resize-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Editor Tabs alternative */}
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
                            placeholder="# Project Case Study..."
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
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className={`text-xs font-bold px-2 py-1 rounded bg-[#0A0A0A] border-none focus:ring-0 cursor-pointer ${status === 'Published' ? 'text-green-400' : 'text-yellow-400'
                                    }`}
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                                <option value="Review">Review</option>
                            </select>
                        </div>
                    </div>

                    {/* Category & Tech Stack */}
                    <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-5 space-y-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Organization</h3>

                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-gray-400 uppercase">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded p-2 text-sm text-white focus:outline-none focus:border-[#d39e17]"
                            >
                                <option>Full Stack Development</option>
                                <option>Frontend Engineering</option>
                                <option>Backend Architecture</option>
                                <option>DevOps & Cloud</option>
                                <option>AI/ML</option>
                                <option>Web3</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-gray-400 uppercase">Tech Stack</label>
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                placeholder="Add tags and press Enter..."
                                className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded p-2 text-sm text-white focus:outline-none focus:border-[#d39e17]"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tech.map(tag => (
                                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#2A2A25] text-xs text-gray-300 border border-[#333]">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-white"><X size={12} /></button>
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
                                    value={liveUrl}
                                    onChange={(e) => setLiveUrl(e.target.value)}
                                    placeholder="Live Demo URL"
                                    className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded p-2 pl-9 text-sm text-white focus:outline-none focus:border-[#d39e17]"
                                />
                            </div>
                            <div className="relative">
                                <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input
                                    type="text"
                                    value={githubUrl}
                                    onChange={(e) => setGithubUrl(e.target.value)}
                                    placeholder="GitHub Repository"
                                    className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded p-2 pl-9 text-sm text-white focus:outline-none focus:border-[#d39e17]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail */}
                    <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-5 space-y-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Project Thumbnail</h3>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                        />

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-[#2A2A25] rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-[#d39e17]/50 hover:bg-[#1a1a15] transition-all cursor-pointer group relative overflow-hidden min-h-[160px]"
                        >
                            {imagePreview ? (
                                <>
                                    <Image src={imagePreview} alt="Preview" fill className="object-cover opacity-40" />
                                    <div className="relative z-10 flex flex-col items-center">
                                        <Upload className="text-white mb-2" size={24} />
                                        <p className="text-xs text-white font-bold bg-[#0A0A0A]/60 px-2 py-1 rounded">Change Image</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-full bg-[#1a1a15] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <ImageIcon className="text-gray-500 group-hover:text-[#d39e17]" size={24} />
                                    </div>
                                    <p className="text-sm text-gray-300 font-medium">Click to upload</p>
                                    <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
}
