'use client';

import React, { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export interface BlogPost {
    id: string;
    title: string;
    category: string;
    status: string;
    views: number;
    created_at: string;
}

export default function BlogTable({ initialPosts }: { initialPosts: BlogPost[] }) {
    const [posts, setPosts] = useState(initialPosts);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const router = useRouter();
    const supabase = createBrowserSupabaseClient();

    const totalPages = Math.max(1, Math.ceil(posts.length / itemsPerPage));
    const paginatedPosts = posts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = async (id: string, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            const { error } = await supabase.from('blog_posts').delete().eq('id', id);
            if (error) {
                alert('Error deleting post: ' + error.message);
            } else {
                setPosts(posts.filter(p => p.id !== id));
                router.refresh();
            }
        }
    };

    return (
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
                        {paginatedPosts.map((post) => (
                            <tr key={post.id} className="hover:bg-[#1a1a15]/50 transition-colors group">
                                <td className="px-6 py-4 font-medium text-white">{post.title}</td>
                                <td className="px-6 py-4 text-gray-300">{post.category}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${post.status === 'Published' ? 'bg-green-900/20 text-green-400 border-green-900/30' :
                                        'bg-yellow-900/20 text-yellow-400 border-yellow-900/30'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'Published' ? 'bg-green-400' : 'bg-yellow-400'
                                            }`}></span>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                                    {new Date(post.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-gray-400 font-mono text-xs">{post.views}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/admin/blog/${post.id}/edit`}>
                                            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded transition-colors">
                                                <Eye size={16} />
                                            </button>
                                        </Link>
                                        <Link href={`/admin/blog/${post.id}/edit`}>
                                            <button className="p-1.5 text-gray-400 hover:text-[#d39e17] hover:bg-[#d39e17]/10 rounded transition-colors">
                                                <Edit size={16} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id, post.title)}
                                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {posts.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        No blog posts found.
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="bg-[#1a1a15] px-6 py-4 border-t border-[#2A2A25] flex items-center justify-between">
                <span className="text-xs text-gray-500">
                    Showing {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, posts.length)} of {posts.length} posts
                </span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 text-xs font-medium bg-[#141414] border border-[#2A2A25] rounded text-gray-300 hover:text-white hover:bg-[#2A2A25] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-xs text-gray-400 font-mono px-2">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 text-xs font-medium bg-[#141414] border border-[#2A2A25] rounded text-gray-300 hover:text-white hover:bg-[#2A2A25] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
