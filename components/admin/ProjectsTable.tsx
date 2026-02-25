'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export interface Project {
    id: string;
    name: string;
    category: string;
    tech: string[];
    status: string;
    created_at: string;
    image_url: string;
}

export default function ProjectsTable({ initialProjects }: { initialProjects: Project[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [projects, setProjects] = useState(initialProjects);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const router = useRouter();
    const supabase = createBrowserSupabaseClient();

    const filteredProjects = projects.filter((project) => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All Categories' || project.category === categoryFilter;
        const matchesStatus = statusFilter === 'All Status' || project.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 when filters change
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };
    const handleCategoryChange = (value: string) => {
        setCategoryFilter(value);
        setCurrentPage(1);
    };
    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) {
                alert('Error deleting project: ' + error.message);
            } else {
                setProjects(projects.filter(p => p.id !== id));
                router.refresh();
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 bg-[#141414] p-4 rounded-lg border border-[#2A2A25]">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#d39e17] transition-colors placeholder-gray-600"
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        className="bg-[#0A0A0A] border border-[#2A2A25] rounded-md py-2 px-4 text-sm text-gray-300 focus:outline-none focus:border-[#d39e17] cursor-pointer"
                        value={categoryFilter}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                        <option>All Categories</option>
                        <option>Full Stack</option>
                        <option>Frontend</option>
                        <option>Backend</option>
                        <option>AI/ML</option>
                        <option>Web3</option>
                    </select>
                    <select
                        className="bg-[#0A0A0A] border border-[#2A2A25] rounded-md py-2 px-4 text-sm text-gray-300 focus:outline-none focus:border-[#d39e17] cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => handleStatusChange(e.target.value)}
                    >
                        <option>All Status</option>
                        <option>Published</option>
                        <option>Draft</option>
                        <option>Review</option>
                    </select>
                </div>
            </div>

            {/* Table */}
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
                            {paginatedProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-[#1a1a15]/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded bg-gray-800 overflow-hidden border border-[#2A2A25] relative">
                                                {project.image_url ? (
                                                    <Image src={project.image_url} alt={project.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-700 flex items-center justify-center text-[10px] text-gray-500">NO IMG</div>
                                                )}
                                            </div>
                                            <span className="font-medium text-white">{project.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300">{project.category}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {project.tech?.map((t, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-[#2A2A25] text-gray-400 border border-[#333]">{t}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${project.status === 'Published' ? 'bg-green-900/20 text-green-400 border-green-900/30' :
                                            project.status === 'Draft' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-900/30' :
                                                'bg-blue-900/20 text-blue-400 border-blue-900/30'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Published' ? 'bg-green-400' :
                                                project.status === 'Draft' ? 'bg-yellow-400' :
                                                    'bg-blue-400'
                                                }`}></span>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                                        {new Date(project.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/admin/projects/${project.id}/edit`}>
                                                <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2A2A25] rounded transition-colors">
                                                    <Eye size={16} />
                                                </button>
                                            </Link>
                                            <Link href={`/admin/projects/${project.id}/edit`}>
                                                <button className="p-1.5 text-gray-400 hover:text-[#d39e17] hover:bg-[#d39e17]/10 rounded transition-colors">
                                                    <Edit size={16} />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id, project.name)}
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
                    {filteredProjects.length === 0 && (
                        <div className="p-12 text-center">
                            <p className="text-gray-500">No projects found matching your criteria.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="bg-[#1a1a15] px-6 py-4 border-t border-[#2A2A25] flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                        Showing {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
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
        </div>
    );
}
