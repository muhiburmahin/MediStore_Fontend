"use client";
import { useEffect, useState } from "react";
import { Order } from "@/types/order.type";
import { customerDashboardService, IDashboardStats } from "@/services/dashboard.service";
import { CustomerStats } from "@/components/modules/customer/CustomerStats";
import { RecentOrders } from "@/components/modules/customer/RecentOrders";
import { DashboardOverview } from "@/components/modules/customer/DashboardOverview";

export default function CustomerDashboard() {
    const [stats, setStats] = useState<IDashboardStats | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const [statsData, ordersData] = await Promise.all([
                customerDashboardService.getDashboardStats(),
                customerDashboardService.getRecentOrders()
            ]);
            setStats(statsData);
            setOrders(ordersData);
        };
        loadData();
    }, []);

    if (!stats) return (
        <div className="h-screen flex items-center justify-center bg-black">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-12 py-6 px-4">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                        Hello, <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">User!</span> 👋
                    </h1>
                    <p className="text-slate-500 mt-2 font-bold text-sm italic uppercase tracking-widest">
                        `Your health is our priority`
                    </p>
                </div>
            </div>

            <main className="py-2">
                <div className="py-2">
                    <CustomerStats stats={stats} />
                </div>
                <div className="py-2"><DashboardOverview /></div>
                <div className="py-2"><RecentOrders orders={orders} /></div>
            </main >


        </div >
    );
}