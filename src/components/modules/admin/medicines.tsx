import React from 'react';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Pill,
    Filter,
    MoreVertical,
    ChevronRight,
    AlertCircle
} from 'lucide-react';

// মেডিসিন ডাটা ইন্টারফেস
interface Medicine {
    id: string;
    name: string;
    genericName: string;
    category: string;
    price: number;
    stock: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    expiryDate: string;
}

const MedicinesManagement = () => {
    // ডামি ডাটা
    const medicines: Medicine[] = [
        { id: '1', name: 'Napa Extend', genericName: 'Paracetamol', category: 'Painkillers', price: 15, stock: 500, status: 'In Stock', expiryDate: '2027-12-20' },
        { id: '2', name: 'Azithrocin 500', genericName: 'Azithromycin', category: 'Antibiotics', price: 35, stock: 12, status: 'Low Stock', expiryDate: '2026-05-10' },
        { id: '3', name: 'Sergel 20', genericName: 'Esomeprazole', category: 'Gastric', price: 7, stock: 1200, status: 'In Stock', expiryDate: '2028-01-15' },
        { id: '4', name: 'Fexo 120', genericName: 'Fexofenadine', category: 'Allergy', price: 10, stock: 0, status: 'Out of Stock', expiryDate: '2025-11-30' },
    ];

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 border-b-4 border-green-600 inline-block pb-1">
                        Medicine Inventory
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium italic">Monitor and manage your pharmacy stock</p>
                </div>

                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-8 rounded-2xl transition-all shadow-xl shadow-blue-200 transform hover:-translate-y-1">
                    <Plus className="w-5 h-5 stroke-[3px]" />
                    ADD NEW MEDICINE
                </button>
            </div>

            {/* Quick Filters/Stats */}
            <div className="flex flex-wrap gap-4">
                <div className="bg-white px-6 py-3 rounded-2xl border-2 border-slate-100 flex items-center gap-3 shadow-sm">
                    <div className="w-3 h-3 rounded-full bg-green-600 shadow-[0_0_10px_rgba(22,163,74,0.5)]"></div>
                    <span className="text-sm font-black text-slate-700">In Stock: 320</span>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl border-2 border-slate-100 flex items-center gap-3 shadow-sm">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                    <span className="text-sm font-black text-slate-700">Low Stock: 15</span>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl border-2 border-slate-100 flex items-center gap-3 shadow-sm">
                    <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                    <span className="text-sm font-black text-slate-700">Out of Stock: 4</span>
                </div>
            </div>

            {/* Search and Table Container */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-white to-blue-50/30 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name, generic, or category..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all bg-white font-bold text-slate-700 shadow-inner"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-black text-slate-600 transition-all border-b-4 border-slate-300">
                        <Filter className="w-5 h-5" />
                        FILTER
                    </button>
                </div>

                {/* Medicines Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b">Medicine Details</th>
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b">Category</th>
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b">Price</th>
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b">Stock Level</th>
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b">Status</th>
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {medicines.map((med) => (
                                <tr key={med.id} className="hover:bg-green-50/40 transition-all group">
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                                                <Pill className="text-white w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors leading-tight">{med.name}</p>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mt-1">{med.genericName}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <span className="px-4 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-black uppercase shadow-sm">
                                            {med.category}
                                        </span>
                                    </td>
                                    <td className="p-5 font-black text-slate-700">৳{med.price.toFixed(2)}</td>
                                    <td className="p-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-black text-slate-800">{med.stock} pcs</span>
                                            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                <div
                                                    className={`h-full rounded-full ${med.stock > 100 ? 'bg-green-600' : med.stock > 0 ? 'bg-yellow-500' : 'bg-red-600'}`}
                                                    style={{ width: `${Math.min((med.stock / 1000) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1 rounded-full w-fit ${med.status === 'In Stock' ? 'bg-green-100 text-green-700 border border-green-200' :
                                                med.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                                                    'bg-red-100 text-red-700 border border-red-200'
                                            }`}>
                                            {med.status === 'Low Stock' && <AlertCircle className="w-3 h-3" />}
                                            {med.status}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-100 transition-all">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2.5 bg-red-100 hover:bg-red-600 hover:text-white text-red-600 rounded-xl transition-all">
                                                <Trash2 className="w-4 h-4" />
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
};

export default MedicinesManagement;