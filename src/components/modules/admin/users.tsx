import React from 'react';
import {
    Search,
    UserPlus,
    Mail,
    ShieldCheck,
    User,
    Store,
    MoreVertical,
    Ban,
    CheckCircle,
    Filter
} from 'lucide-react';

// ইউজার ডাটা ইন্টারফেস (আপনার ব্যাকএন্ড Role অনুযায়ী)
interface UserData {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'SELLER' | 'CUSTOMER';
    status: 'Active' | 'Suspended';
    joinedDate: string;
}

const UsersManagement = () => {
    // ডামি ডাটা (আপনার ব্যাকএন্ড স্ট্রাকচার অনুযায়ী)
    const users: UserData[] = [
        { id: 'U-101', name: 'Md Mahin', email: 'mahin@gmail.com', role: 'ADMIN', status: 'Active', joinedDate: '2023-10-12' },
        { id: 'U-102', name: 'Arif Khan', email: 'arif.seller@medistore.com', role: 'SELLER', status: 'Active', joinedDate: '2024-01-05' },
        { id: 'U-103', name: 'Sultana Ahmed', email: 'sultana@yahoo.com', role: 'CUSTOMER', status: 'Active', joinedDate: '2024-02-20' },
        { id: 'U-104', name: 'Rakib Hossain', email: 'rakib.dev@gmail.com', role: 'CUSTOMER', status: 'Suspended', joinedDate: '2023-12-15' },
    ];

    // রোল অনুযায়ী আইকন এবং কালার কনফিগারেশন
    const roleConfig = {
        ADMIN: { color: 'text-purple-700 bg-purple-50 border-purple-200', icon: <ShieldCheck className="w-3 h-3" /> },
        SELLER: { color: 'text-green-600 bg-green-50 border-green-200', icon: <Store className="w-3 h-3" /> },
        CUSTOMER: { color: 'text-blue-600 bg-blue-50 border-blue-200', icon: <User className="w-3 h-3" /> },
    };

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 border-b-4 border-blue-600 inline-block pb-1">
                        User Management
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium italic">Manage platform access and user roles</p>
                </div>

                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-6 rounded-2xl transition-all shadow-lg shadow-blue-100 transform hover:-translate-y-1">
                    <UserPlus className="w-5 h-5" />
                    INVITE NEW USER
                </button>
            </div>

            {/* Main Container */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
                {/* Search & Filter Bar */}
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center bg-gradient-to-r from-white to-green-50/20">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name, email or role..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all bg-white font-bold text-slate-700 shadow-inner"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-black text-slate-600 transition-all border-b-4 border-slate-300">
                        <Filter className="w-5 h-5" />
                        FILTER ROLES
                    </button>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80">
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b">User Account</th>
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b text-center">Platform Role</th>
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b">Joined Date</th>
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b">Status</th>
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-green-50/40 transition-all group">
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-black text-slate-500 border-2 border-white shadow-sm overflow-hidden">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">{user.name}</p>
                                                <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                                                    <Mail className="w-3 h-3" /> {user.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-center">
                                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border shadow-sm ${roleConfig[user.role].color}`}>
                                            {roleConfig[user.role].icon}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <span className="text-sm font-bold text-slate-600">{user.joinedDate}</span>
                                    </td>
                                    <td className="p-5">
                                        <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase ${user.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-600' : 'bg-red-500'}`} />
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2.5 bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-400 rounded-xl transition-all" title="Suspend User">
                                                <Ban className="w-4 h-4" />
                                            </button>
                                            <button className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-100 transition-all">
                                                <MoreVertical className="w-4 h-4" />
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

export default UsersManagement;