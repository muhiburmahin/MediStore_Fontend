import React from 'react';
import {
    Search,
    Eye,
    Truck,
    CheckCircle2,
    Clock,
    XCircle,
    MoreVertical,
    Download,
    Filter
} from 'lucide-react';

// অর্ডার ডাটা ইন্টারফেস
interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    totalAmount: number;
    status: 'Placed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    paymentStatus: 'Paid' | 'Pending';
    createdAt: string;
}

const OrdersManagement = () => {
    // ডামি ডাটা (আপনার ব্যাকএন্ড স্ট্রাকচার অনুযায়ী)
    const orders: Order[] = [
        { id: 'ORD-7721', customerName: 'Md Mahin', customerEmail: 'mahin@gmail.com', totalAmount: 1250, status: 'Delivered', paymentStatus: 'Paid', createdAt: '2024-03-06' },
        { id: 'ORD-8832', customerName: 'Arif Ahmed', customerEmail: 'arif@outlook.com', totalAmount: 850, status: 'Processing', paymentStatus: 'Paid', createdAt: '2024-03-07' },
        { id: 'ORD-9910', customerName: 'Sultana Razia', customerEmail: 'razia@yahoo.com', totalAmount: 3200, status: 'Shipped', paymentStatus: 'Paid', createdAt: '2024-03-05' },
        { id: 'ORD-1025', customerName: 'Rakib Hossain', customerEmail: 'rakib@gmail.com', totalAmount: 450, status: 'Placed', paymentStatus: 'Pending', createdAt: '2024-03-07' },
        { id: 'ORD-4412', customerName: 'Nabil Khan', customerEmail: 'nabil@gmail.com', totalAmount: 1500, status: 'Cancelled', paymentStatus: 'Pending', createdAt: '2024-03-04' },
    ];

    // স্ট্যাটাস অনুযায়ী আইকন এবং কালার ম্যাপিং
    const statusConfig = {
        Placed: { color: 'text-blue-600 bg-blue-50 border-blue-200', icon: <Clock className="w-3 h-3" /> },
        Processing: { color: 'text-yellow-600 bg-yellow-50 border-yellow-200', icon: <Clock className="w-3 h-3" /> },
        Shipped: { color: 'text-indigo-600 bg-indigo-50 border-indigo-200', icon: <Truck className="w-3 h-3" /> },
        Delivered: { color: 'text-green-600 bg-green-50 border-green-200', icon: <CheckCircle2 className="w-3 h-3" /> },
        Cancelled: { color: 'text-red-600 bg-red-50 border-red-200', icon: <XCircle className="w-3 h-3" /> },
    };

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 border-b-4 border-blue-600 inline-block pb-1">
                        Order Management
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium italic">Track and update customer orders efficiently</p>
                </div>

                <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-black py-3 px-6 rounded-2xl transition-all shadow-lg shadow-green-100 transform hover:scale-105">
                    <Download className="w-5 h-5" />
                    EXPORT ORDERS
                </button>
            </div>

            {/* Main Table Container */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
                {/* Search & Filter Bar */}
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center bg-gradient-to-r from-white to-blue-50/20">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by Order ID or Customer..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all bg-white font-bold text-slate-700 shadow-inner"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-black text-slate-600 transition-all border-b-4 border-slate-300">
                            <Filter className="w-5 h-5" />
                            FILTERS
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80">
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b">Order Info</th>
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b">Customer</th>
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b">Amount</th>
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b">Status</th>
                                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest border-b text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-blue-50/40 transition-all group">
                                    <td className="p-5">
                                        <div className="flex flex-col">
                                            <span className="font-black text-blue-600 text-base">{order.id}</span>
                                            <span className="text-xs font-bold text-slate-400">{order.createdAt}</span>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex flex-col">
                                            <p className="font-black text-slate-800 leading-tight">{order.customerName}</p>
                                            <p className="text-xs font-medium text-slate-400">{order.customerEmail}</p>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-800">৳{order.totalAmount.toLocaleString()}</span>
                                            <span className={`text-[10px] font-black uppercase ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-500'}`}>
                                                {order.paymentStatus}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase border shadow-sm ${statusConfig[order.status].color}`}>
                                            {statusConfig[order.status].icon}
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            <button className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-100 transition-all transform hover:scale-110">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all">
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

export default OrdersManagement;