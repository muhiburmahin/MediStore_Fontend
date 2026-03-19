"use client";

import React, { useState, useTransition, useRef } from 'react';
import {
    Plus, Search, Trash2, Layers, CheckCircle2, X, Loader2,
    Upload, ChevronLeft, ChevronRight, Image as ImageIcon,
    Filter, Database
} from 'lucide-react';
import { createCategoryAction, deleteCategoryAction } from "@/actions/category.action";
import { toast } from "sonner";

interface Category {
    id: string;
    name: string;
    imageUrl?: string | null;
    status?: string;
    createdAt: string;
}

const CategoriesManagement = ({ initialCategories = [] }: { initialCategories: Category[] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [searchQuery, setSearchQuery] = useState("");

    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredCategories = initialCategories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        if (selectedFile) formData.append("image", selectedFile);

        startTransition(async () => {
            const result = await createCategoryAction(formData);
            if (result.success) {
                toast.success(result.message);
                setIsModalOpen(false);
                setName("");
                setSelectedFile(null);
                setPreviewUrl(null);
            } else {
                toast.error(result.message);
            }
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        startTransition(async () => {
            const result = await deleteCategoryAction(id);
            if (result.success) toast.success(result.message);
            else toast.error(result.message);
        });
    };

    return (
        <div className="p-4 md:p-6 space-y-6 md:space-y-8 bg-slate-50 dark:bg-slate-950 min-h-screen font-sans transition-colors duration-300">

            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg shrink-0">
                            <Database className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <h1 className="text-xl md:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                            Category <span className="text-blue-600">Hub</span>
                        </h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:ml-11">Organize and manage your medicine catalog</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-3.5 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all shadow-lg active:scale-95 overflow-hidden"
                >
                    <Plus className="w-5 h-5" />
                    <span className="text-sm md:text-base">Add New</span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>

            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 p-5 md:p-6 rounded-2xl md:rounded-[2rem] shadow-xl shadow-blue-100 dark:shadow-none group">
                    <div className="relative z-10 flex items-center gap-4 md:gap-5">
                        <div className="p-3 md:p-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
                            <Layers className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <div>
                            <p className="text-blue-100 font-bold uppercase tracking-widest text-[10px] md:text-xs">Total Inventory</p>
                            <p className="text-3xl md:text-4xl font-black text-white">{initialCategories.length}</p>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 p-5 md:p-6 rounded-2xl md:rounded-[2rem] shadow-xl shadow-emerald-100 dark:shadow-none group">
                    <div className="relative z-10 flex items-center gap-4 md:gap-5">
                        <div className="p-3 md:p-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
                            <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <div>
                            <p className="text-emerald-100 font-bold uppercase tracking-widest text-[10px] md:text-xs">System Pulse</p>
                            <p className="text-3xl md:text-4xl font-black text-white italic">Live</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Table Section --- */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">

                {/* Search Bar */}
                <div className="p-4 md:p-6 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/30 dark:bg-slate-900/50">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-transparent bg-white dark:bg-slate-800 shadow-sm focus:border-blue-600 focus:ring-0 outline-none transition-all font-semibold text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
                        <Filter className="w-4 h-4" />
                        <span>{currentItems.length} categories found</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead>
                            <tr className="bg-slate-50/80 dark:bg-slate-800/50">
                                <th className="py-3 px-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Visual</th>
                                <th className="py-3 px-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Name</th>
                                <th className="py-3 px-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="py-3 px-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {currentItems.map((cat) => (
                                <tr key={cat.id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all">
                                    <td className="py-2 px-5">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white dark:bg-slate-800 shadow-sm overflow-hidden border border-slate-100 dark:border-slate-700 p-0.5 group-hover:border-blue-200 transition-all">
                                            {cat.imageUrl ? (
                                                <img src={cat.imageUrl} alt="" className="w-full h-full object-cover rounded-md" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full bg-slate-50 dark:bg-slate-700 rounded-md">
                                                    <ImageIcon className="text-slate-300 w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-2 px-5">
                                        <span className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{cat.name}</span>
                                    </td>
                                    <td className="py-2 px-5">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">Active</span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-5 text-right">
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            disabled={isPending}
                                            className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition-all active:scale-90 disabled:opacity-30"
                                        >
                                            {isPending ? <Loader2 className="animate-spin w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- Pagination --- */}
                <div className="p-4 md:p-5 bg-slate-50/30 dark:bg-slate-900/50 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                        Page <span className="text-blue-600 dark:text-blue-400">{currentPage}</span> of {totalPages || 1}
                    </p>
                    <div className="flex gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 text-slate-600 dark:text-slate-400 disabled:opacity-30 transition-all shadow-sm"
                        >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 text-slate-600 dark:text-slate-400 disabled:opacity-30 transition-all shadow-sm"
                        >
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Responsive Modal --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden border border-white/20 dark:border-slate-800">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-emerald-600" />

                        <div className="flex justify-between items-center mb-6 md:mb-8">
                            <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">New Category</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all text-slate-400">
                                <X className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="space-y-5 md:space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category Name</label>
                                <input
                                    required
                                    className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-[1.25rem] border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 focus:border-blue-600 outline-none font-bold text-slate-700 dark:text-slate-200 transition-all"
                                    placeholder="Enter title..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Visual Cover</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="group border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-blue-600 dark:hover:border-blue-500 hover:bg-blue-50/30 transition-all"
                                >
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                                    {previewUrl ? (
                                        <div className="relative">
                                            <img src={previewUrl} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl shadow-lg border-4 border-white dark:border-slate-800" alt="Preview" />
                                            <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-[10px] uppercase">Change</div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                                                <Upload className="text-blue-600 w-6 h-6 md:w-8 md:h-8" />
                                            </div>
                                            <div className="text-center">
                                                <span className="text-xs md:text-sm font-black text-slate-600 dark:text-slate-300 block">Select Image</span>
                                                <span className="text-[10px] font-bold text-slate-400">Max size 2MB</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <button
                                disabled={isPending}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 md:py-4 rounded-xl md:rounded-[1.25rem] font-black text-base md:text-lg shadow-xl shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                            >
                                {isPending ? <Loader2 className="animate-spin" /> : <>Save Category</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesManagement;