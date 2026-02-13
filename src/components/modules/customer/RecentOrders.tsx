import { Order, OrderStatus } from "@/types/order.type";
import { Package, ChevronRight } from "lucide-react";
import Link from "next/link";

export const RecentOrders = ({ orders }: { orders: Order[] }) => {
    return (
        <div className="bg-[#0a0a0a] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                    <Package className="text-blue-500" /> Recent Orders
                </h2>
                <Link href="/dashboard/my-orders" className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1 uppercase tracking-tighter">
                    View All <ChevronRight size={14} />
                </Link>
            </div>

            <div className="overflow-x-auto ">
                <table className="w-full text-left">
                    <thead className="bg-slate-900 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                        <tr>
                            <th className="p-5">Order ID</th>
                            <th className="p-5">Date</th>
                            <th className="p-5">Product</th>
                            <th className="p-5">Amount</th>
                            <th className="p-5">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 ">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-blue-600/5 transition-colors group">
                                <td className="p-5 font-mono text-xs text-blue-500 font-bold uppercase tracking-tighter">
                                    #{order.id.split("-")[0]}
                                </td>
                                <td className="p-5 text-slate-400 text-sm">
                                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                                </td>
                                <td className="p-5 text-white font-semibold text-sm">
                                    {order.items?.[0]?.medicine?.name || "Medicine Item"}
                                </td>
                                <td className="p-5 font-black text-white text-lg">
                                    ৳{order.totalAmount}
                                </td>
                                <td className="p-5">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight shadow-sm ${order.status === OrderStatus.DELIVERED
                                        ? "bg-green-500/10 text-green-500 border border-green-500/20"
                                        : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};