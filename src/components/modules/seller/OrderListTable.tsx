"use client";

import { useState, useMemo } from "react";
import {
    Eye, Search, X, ChevronLeft, ChevronRight, Trash2,
    User, Phone, MapPin, Package, ShoppingBag, TrendingUp
} from "lucide-react";
import { toast } from "sonner";
import { Order, OrderStatus } from "@/types";
import { updateOrderStatusAction, deleteOrderAction } from '@/actions/order.action';

interface OrderListTableProps {
    initialOrders?: Order[];
}

export default function OrderListTable({ initialOrders = [] }: OrderListTableProps) {
    const [orders, setOrders] = useState<Order[]>(initialOrders || []);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // ... (handleStatusUpdate এবং handleDeleteOrder লজিক অপরিবর্তিত)
    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        const toastId = toast.loading("Updating status...");
        try {
            const res = await updateOrderStatusAction(orderId, newStatus);
            if (res?.success || res?.data) {
                toast.success(`Status updated to ${newStatus}`, { id: toastId });
                setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as OrderStatus } : o));
                if (selectedOrder?.id === orderId) {
                    setSelectedOrder(prev => prev ? { ...prev, status: newStatus as OrderStatus } : null);
                }
            } else { toast.error("Update failed", { id: toastId }); }
        } catch (error) { toast.error("Failed to update status", { id: toastId }); }
    };

    const handleDeleteOrder = async (orderId: string) => {
        if (!confirm("Are you sure?")) return;
        const toastId = toast.loading("Deleting order...");
        try {
            const res = await deleteOrderAction(orderId);
            if (res?.success || res?.data) {
                toast.success("Order deleted", { id: toastId });
                setOrders(prev => prev.filter(o => o.id !== orderId));
                setSelectedOrder(null);
            } else { toast.error("Error deleting", { id: toastId }); }
        } catch (error) { toast.error("Error", { id: toastId }); }
    };

    const filteredOrders = useMemo(() => {
        if (!Array.isArray(orders)) return [];
        return orders.filter(order =>
            order?.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order?.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order?.phone?.includes(searchTerm)
        );
    }, [orders, searchTerm]);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            {/* Search Bar & Stats */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 md:p-5 rounded-2xl border-l-4 border-l-blue-600 shadow-md dark:shadow-blue-900/10 transition-colors">
                <div className="relative w-full lg:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 dark:text-blue-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl py-3 pl-12 pr-4 outline-none text-sm border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:ring-4 focus:ring-blue-500/10 transition-all"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <div className="w-full lg:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none flex justify-center items-center">
                    <p className="text-[11px] font-black text-white uppercase tracking-wider flex items-center gap-2">
                        <ShoppingBag size={14} /> Total: {filteredOrders.length} Orders
                    </p>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-black/20">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-5 text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest">Order ID</th>
                                <th className="px-6 py-5 text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest">Customer</th>
                                <th className="px-6 py-5 text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest text-center">Amount</th>
                                <th className="px-6 py-5 text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest text-center">Status</th>
                                <th className="px-6 py-5 text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {currentOrders.length > 0 ? currentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-blue-50/40 dark:hover:bg-blue-900/10 transition-all group">
                                    <td className="px-6 py-5 font-mono text-[11px] font-bold text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        #{order.id?.slice(-8).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                                                <User size={14} />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-extrabold text-slate-800 dark:text-slate-200 text-xs uppercase truncate">{order.customer?.name || "Anonymous"}</span>
                                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{order.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="font-black text-green-600 dark:text-green-400 italic text-base">৳{order.totalAmount}</span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => setSelectedOrder(order)} className="p-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200 dark:shadow-none transition-all">
                                                <Eye size={16} />
                                            </button>
                                            {["DELIVERED", "CANCELLED"].includes(order.status) && (
                                                <button onClick={() => handleDeleteOrder(order.id)} className="p-2.5 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-2 opacity-30 dark:opacity-50 text-slate-400">
                                            <Package size={48} />
                                            <p className="text-xs font-black uppercase italic tracking-widest">No Orders Found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-5 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">
                        Page <span className="text-blue-600 dark:text-blue-400">{currentPage}</span> of {totalPages || 1}
                    </span>
                    <div className="flex gap-3">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2.5 border-2 border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-30 hover:border-blue-600 dark:hover:border-blue-400 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all">
                            <ChevronLeft size={16} />
                        </button>
                        <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2.5 border-2 border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-30 hover:border-blue-600 dark:hover:border-blue-400 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Detail Drawer - Mobile Responsive */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
                    <div className="relative w-full sm:max-w-md bg-white dark:bg-slate-950 h-full shadow-2xl overflow-y-auto p-6 md:p-8 animate-in slide-in-from-right duration-500 border-l-4 sm:border-l-8 border-l-blue-600 transition-colors">
                        <div className="flex justify-between items-center mb-8 border-b dark:border-slate-800 pb-6">
                            <div>
                                <h3 className="font-black text-slate-900 dark:text-white uppercase italic text-2xl tracking-tighter">Order <span className="text-blue-600">Action</span></h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ref ID: {selectedOrder.id?.toUpperCase()}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-red-500 hover:text-white text-slate-400 rounded-2xl transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-8">
                            {/* Update Status */}
                            <div className="bg-blue-600 dark:bg-blue-700 p-6 rounded-[2rem] shadow-xl shadow-blue-200 dark:shadow-none">
                                <label className="text-[11px] font-black text-blue-100 uppercase block mb-4 tracking-widest flex items-center gap-2">
                                    <TrendingUp size={14} /> Update Status
                                </label>
                                <select
                                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl px-5 py-4 text-sm font-black outline-none focus:ring-4 focus:ring-white/10 transition-all cursor-pointer"
                                    value={selectedOrder.status}
                                    onChange={(e) => handleStatusUpdate(selectedOrder.id, e.target.value)}
                                >
                                    {["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map(s => (
                                        <option key={s} value={s} className="text-slate-900">{s}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Info Section */}
                            <div className="space-y-4">
                                <h4 className="text-[12px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest border-l-4 border-green-500 pl-3">Customer Info</h4>
                                <div className="space-y-3">
                                    <InfoCard icon={<User size={16} className="text-blue-600" />} label="Name" value={selectedOrder.customer?.name || "N/A"} />
                                    <InfoCard icon={<Phone size={16} className="text-green-600" />} label="Contact" value={selectedOrder.phone || "N/A"} />
                                    <InfoCard icon={<MapPin size={16} className="text-red-500" />} label="Address" value={selectedOrder.shippingAddress || "N/A"} />
                                </div>
                            </div>

                            {/* Total Amount */}
                            <div className="pt-6 border-t-2 border-dashed border-slate-100 dark:border-slate-800">
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 flex justify-between items-center border-2 border-green-100 dark:border-green-900/30">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-green-600 text-white rounded-xl">
                                            <Package size={20} />
                                        </div>
                                        <span className="text-xs font-black text-green-800 dark:text-green-400 uppercase tracking-widest">Total Payable</span>
                                    </div>
                                    <span className="text-2xl font-black text-green-600 dark:text-green-400 italic">৳{selectedOrder.totalAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all group">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-transform group-hover:scale-105">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter mb-1">{label}</p>
                <p className="text-sm font-extrabold text-slate-700 dark:text-slate-200 leading-tight break-words">{value}</p>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const config: Record<string, string> = {
        PLACED: "from-amber-400 to-orange-500 shadow-amber-100 dark:shadow-none",
        PROCESSING: "from-blue-500 to-indigo-600 shadow-blue-100 dark:shadow-none",
        SHIPPED: "from-purple-500 to-pink-600 shadow-purple-100 dark:shadow-none",
        DELIVERED: "from-green-500 to-emerald-600 shadow-green-100 dark:shadow-none",
        CANCELLED: "from-red-500 to-rose-600 shadow-red-100 dark:shadow-none",
    };
    return (
        <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black text-white bg-gradient-to-r shadow-lg uppercase tracking-widest ${config[status] || "from-slate-400 to-slate-500"}`}>
            {status}
        </span>
    );
}