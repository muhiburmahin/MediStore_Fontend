"use client";

import { Order } from "@/types/order.type";
import { Package, MapPin, ChevronRight, CheckCircle2, Clock } from "lucide-react";

export const OrderList = ({ orders }: { orders: Order[] }) => {
    return (
        <div className="space-y-6">
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="group relative p-[2px] rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200"
                >
                    {/* Brand Color Gradient Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 opacity-20 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>

                    <div className="relative bg-white rounded-[30px] p-6 flex flex-wrap md:flex-nowrap items-center gap-6">

                        {/* Icon Box */}
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                                <Package size={28} />
                            </div>
                            {order.status === 'DELIVERED' && (
                                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
                                    <CheckCircle2 size={12} />
                                </div>
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black bg-emerald-600 text-white px-2.5 py-1 rounded-lg uppercase italic tracking-tighter">Pharmacy Order</span>
                                <span className="text-blue-600 font-mono text-xs font-black tracking-widest">#{order.id.slice(0, 8).toUpperCase()}</span>
                            </div>
                            <h4 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                                Ordered on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </h4>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="flex items-center gap-1.5 text-gray-500 text-[11px] font-bold uppercase tracking-widest">
                                    <MapPin size={14} className="text-emerald-600" /> {order.shippingAddress.split(',')[0]}
                                </span>
                            </div>
                        </div>

                        {/* Price & Status */}
                        <div className="flex items-center gap-8 pl-6 border-l-2 border-gray-50">
                            <div className="text-right">
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Total Paid</p>
                                <p className="text-3xl font-black text-blue-600 tracking-tight">৳{order.totalAmount}</p>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border-2 ${order.status === 'DELIVERED'
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                    : "bg-blue-50 text-blue-600 border-blue-100 animate-pulse"
                                    }`}>
                                    {order.status === 'DELIVERED' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                                    {order.status}
                                </span>
                                <button className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase hover:text-blue-600 transition-colors">
                                    Details <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};