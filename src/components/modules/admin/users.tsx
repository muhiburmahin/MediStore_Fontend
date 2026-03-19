"use client";

import React, { useState, useMemo } from 'react';
import {
    Search, UserPlus, Mail, ShieldCheck, User, Store,
    MoreVertical, Ban, Filter, ChevronLeft, ChevronRight, CheckCircle2
} from 'lucide-react';

interface UserData {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'SELLER' | 'CUSTOMER';
    status: 'ACTIVE' | 'BANNED';
    createdAt: string;
    image?: string;
}

const UsersManagement = ({ initialUsers = [] }: { initialUsers: UserData[] }) => {
    const [users, setUsers] = useState<UserData[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const toggleUserStatus = (userId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'ACTIVE' ? 'BANNED' : 'ACTIVE';

        // লোকাল স্টেট আপডেট
        setUsers(prev => prev.map(user =>
            user.id === userId ? { ...user, status: newStatus as 'ACTIVE' | 'BANNED' } : user
        ));
    };

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const roleConfig = {
        ADMIN: { color: 'text-purple-700 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800', icon: <ShieldCheck className="w-3 h-3" /> },
        SELLER: { color: 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800', icon: <Store className="w-3 h-3" /> },
        CUSTOMER: { color: 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800', icon: <User className="w-3 h-3" /> },
    };

    return (
        <div className="p-4 md:p-6 space-y-6 bg-slate-50 dark:bg-[#0f172a] min-h-screen transition-colors duration-300">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white border-b-4 border-blue-600 inline-block pb-1">
                        User Management
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-xs md:sm mt-1 font-medium italic">Admin control panel for user access</p>
                </div>

                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-blue-100 dark:shadow-none transform hover:-translate-y-1">
                    <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="uppercase text-sm">Invite User</span>
                </button>
            </div>

            {/* Main Table Container */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/60 dark:shadow-none">

                {/* Search Bar */}
                <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center bg-white dark:bg-slate-900">
                    <div className="relative flex-1 w-full group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            placeholder="Search users..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 bg-white dark:bg-slate-950 font-bold text-slate-700 dark:text-slate-200 outline-none"
                        />
                    </div>
                    <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl font-black text-slate-600 dark:text-slate-300 border-b-4 border-slate-300 dark:border-slate-950">
                        <Filter className="w-4 h-4" /> FILTER
                    </button>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50/80 dark:bg-slate-800/50">
                                <th className="px-5 py-4 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b dark:border-slate-800">Account</th>
                                <th className="px-5 py-4 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b dark:border-slate-800 text-center">Role</th>
                                <th className="px-5 py-4 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b dark:border-slate-800 text-center">Status</th>
                                <th className="px-5 py-4 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b dark:border-slate-800 text-center">Joined</th>
                                <th className="px-5 py-4 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b dark:border-slate-800 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {currentUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-blue-50/40 dark:hover:bg-blue-900/10 transition-all group">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-black text-blue-600 dark:text-blue-400 border-2 border-white dark:border-slate-800 overflow-hidden shrink-0">
                                                {user.image ? <img src={user.image} className="w-full h-full object-cover" /> : user.name?.charAt(0)}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-black text-slate-800 dark:text-slate-200 text-sm truncate">{user.name}</p>
                                                <span className="text-[10px] text-slate-400 flex items-center gap-1 truncate font-medium uppercase"><Mail className="w-3 h-3" /> {user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase border ${roleConfig[user.role]?.color}`}>
                                            {roleConfig[user.role]?.icon} {user.role}
                                        </span>
                                    </td>

                                    {/* STATUS COLUMN - Bright and Clear */}
                                    <td className="px-5 py-3 text-center">
                                        <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all duration-300 shadow-sm
                                            ${user.status === 'BANNED'
                                                ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                                : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                                            {user.status || 'ACTIVE'}
                                        </span>
                                    </td>

                                    <td className="px-5 py-3 text-center text-xs font-bold text-slate-600 dark:text-slate-400">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => toggleUserStatus(user.id, user.status)}
                                                className={`p-2 rounded-lg transition-all border shadow-sm
                                                    ${user.status === 'ACTIVE'
                                                        ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500'
                                                        : 'bg-emerald-500 dark:bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-600 hover:scale-105'}`}
                                                title={user.status === 'ACTIVE' ? "Ban User" : "Activate User"}
                                            >
                                                {user.status === 'ACTIVE' ? <Ban className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                            </button>
                                            <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md shadow-blue-500/20">
                                                <MoreVertical className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="px-6 py-4 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 border-t dark:border-slate-800">
                    <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tighter">Page {currentPage} of {totalPages}</span>
                    <div className="flex gap-2">
                        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg disabled:opacity-20 bg-white dark:bg-slate-950 dark:text-white transition-all hover:border-blue-600"><ChevronLeft className="w-4 h-4" /></button>
                        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg disabled:opacity-20 bg-white dark:bg-slate-950 dark:text-white transition-all hover:border-blue-600"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersManagement;