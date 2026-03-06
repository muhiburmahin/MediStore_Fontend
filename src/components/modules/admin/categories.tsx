import React from 'react';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Layers,
    MoreVertical,
    CheckCircle2
} from 'lucide-react';

// ডামি ডাটা ইন্টারফেস
interface Category {
    id: string;
    name: string;
    slug: string;
    medicineCount: number;
    status: 'active' | 'inactive';
    createdAt: string;
}

const CategoriesManagement = () => {
    // ডামি ডাটা
    const categories: Category[] = [
        { id: '1', name: 'Antibiotics', slug: 'antibiotics', medicineCount: 45, status: 'active', createdAt: '2024-03-01' },
        { id: '2', name: 'Painkillers', slug: 'painkillers', medicineCount: 32, status: 'active', createdAt: '2024-02-15' },
        { id: '3', name: 'Vitamins', slug: 'vitamins', medicineCount: 28, status: 'active', createdAt: '2024-01-20' },
        { id: '4', name: 'Supplements', slug: 'supplements', medicineCount: 15, status: 'inactive', createdAt: '2024-03-05' },
    ];

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 border-b-4 border-blue-600 inline-block pb-1">
                        Categories Management
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Manage your medicine classifications</p>
                </div>

                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-200 transform hover:scale-105">
                    <Plus className="w-5 h-5" />
                    Add New Category
                </button>
            </div>

            {/* Stats Quick View */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-100">
                        <Layers className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Categories</p>
                        <p className="text-2xl font-black text-slate-800">{categories.length}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-green-600 rounded-xl shadow-lg shadow-green-100">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Status</p>
                        <p className="text-2xl font-black text-green-600">3 Categories</p>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Table Filters */}
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between bg-slate-50/50">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all bg-white font-medium"
                        />
                    </div>
                </div>

                {/* Categories Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-wider border-b">Category Name</th>
                                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-wider border-b">Slug</th>
                                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-wider border-b text-center">Medicines</th>
                                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-wider border-b">Status</th>
                                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-wider border-b text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="p-4">
                                        <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{cat.name}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{cat.slug}</span>
                                    </td>
                                    <td className="p-4 text-center font-black text-blue-600">{cat.medicineCount}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${cat.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {cat.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors" title="Edit">
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors" title="Delete">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center text-xs font-bold text-slate-400">
                    <p>Showing 1 to 4 of 12 categories</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white border border-slate-200 rounded-md hover:bg-blue-600 hover:text-white transition-all">Prev</button>
                        <button className="px-3 py-1 bg-blue-600 text-white border border-blue-600 rounded-md shadow-sm">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesManagement;