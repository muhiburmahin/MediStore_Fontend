/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import {
    Users, ShoppingBag, Pill, TrendingUp,
    CheckCircle2, Clock, XCircle, Truck, Layers,
    Star
} from 'lucide-react';

// --- Types & Interfaces ---
export type OrderStatusKey = 'PLACED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REVIEWS';
export interface StatusData { count: number; amount: number; }
export interface DashboardStats {
    revenue: number;
    users: { total: number; customers: number; sellers: number; };
    inventory: { medicines: number; categories: number; };
    orders: {
        total: number;
        statusSummary: Record<Exclude<OrderStatusKey, 'REVIEWS'>, StatusData>;
    };
    reviews: number;
}
interface DashboardProps { stats: DashboardStats; }

const DashboardOverview: React.FC<DashboardProps> = ({ stats }) => {
    if (!stats) return (
        <div className="p-10 text-center font-black text-slate-400 animate-pulse">
            LOADING DASHBOARD...
        </div>
    );

    // স্ট্যাটাস বক্সের জন্য ডাইনামিক কালার কনফিগারেশন (Dark Mode Compatible)
    const statusConfigs: Record<OrderStatusKey, { bgColor: string; icon: any; textColor: string }> = {
        PLACED: { bgColor: "bg-orange-50 dark:bg-orange-950/30", textColor: "text-orange-600 dark:text-orange-400", icon: Clock },
        PROCESSING: { bgColor: "bg-blue-50 dark:bg-blue-950/30", textColor: "text-blue-600 dark:text-blue-400", icon: Layers },
        SHIPPED: { bgColor: "bg-purple-50 dark:bg-purple-950/30", textColor: "text-purple-600 dark:text-purple-400", icon: Truck },
        DELIVERED: { bgColor: "bg-emerald-50 dark:bg-emerald-950/30", textColor: "text-emerald-600 dark:text-emerald-400", icon: CheckCircle2 },
        CANCELLED: { bgColor: "bg-red-50 dark:bg-red-950/30", textColor: "text-red-600 dark:text-red-400", icon: XCircle },
        REVIEWS: { bgColor: "bg-teal-50 dark:bg-teal-950/30", textColor: "text-teal-600 dark:text-teal-400", icon: Star },
    };

    return (
        <div className="p-4 md:p-8 space-y-8 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">

            {/* --- Summary Cards Section --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <SummaryCard
                    title="TOTAL REVENUE"
                    value={`৳${stats.revenue.toLocaleString()}`}
                    desc="Delivered earnings"
                    color="bg-blue-600"
                    icon={<TrendingUp />}
                />
                <SummaryCard
                    title="TOTAL ORDERS"
                    value={stats.orders.total}
                    desc={`${stats.orders.statusSummary.DELIVERED.count} completed`}
                    color="bg-green-600"
                    icon={<ShoppingBag />}
                />
                <SummaryCard
                    title="ACTIVE USERS"
                    value={stats.users.total}
                    desc={`${stats.users.customers} Customers`}
                    color="bg-slate-800 dark:bg-slate-800"
                    icon={<Users />}
                />
                <SummaryCard
                    title="INVENTORY"
                    value={stats.inventory.medicines}
                    desc={`${stats.inventory.categories} Categories`}
                    color="bg-blue-500"
                    icon={<Pill />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                {/* --- Order Fulfillment Section --- */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[30px] md:rounded-[50px] shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3 uppercase italic">
                        <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                        Order Status
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                        {(Object.keys(statusConfigs) as OrderStatusKey[]).map((key) => {
                            const isReview = key === 'REVIEWS';
                            const data = isReview
                                ? { count: stats.reviews, amount: 0 }
                                : stats.orders.statusSummary[key as keyof typeof stats.orders.statusSummary];

                            return (
                                <StatusBox
                                    key={key}
                                    label={key}
                                    count={data.count}
                                    amount={!isReview ? data.amount : undefined}
                                    config={statusConfigs[key]}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* --- User Roles Section --- */}
                <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[30px] md:rounded-[50px] shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-8 uppercase italic">User Distribution</h3>
                    <div className="space-y-8">
                        <RoleProgress label="CUSTOMERS" count={stats.users.customers} total={stats.users.total} color="bg-blue-600" />
                        <RoleProgress label="SELLERS" count={stats.users.sellers} total={stats.users.total} color="bg-green-600" />
                        <RoleProgress label="ADMINS" count={stats.users.total - (stats.users.customers + stats.users.sellers)} total={stats.users.total} color="bg-slate-500" />
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- Sub-Components ---

const SummaryCard = ({ title, value, desc, color, icon }: any) => (
    <div className={`${color} p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-lg text-white relative overflow-hidden transition-all hover:scale-[1.03] active:scale-95`}>
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-[10px] font-black opacity-80 tracking-widest uppercase">{title}</span>
            <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl">{icon}</div>
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter relative z-10">{value}</h2>
        <p className="text-[11px] opacity-90 mt-2 font-bold italic relative z-10">{desc}</p>
    </div>
);

const StatusBox = ({ label, count, amount, config }: any) => {
    const Icon = config.icon;
    return (
        <div className={`${config.bgColor} p-5 md:p-7 rounded-[25px] md:rounded-[35px] transition-all hover:shadow-md border border-transparent hover:border-slate-200 dark:hover:border-slate-700`}>
            <div className="flex items-center gap-2 mb-4">
                <div className={`p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm ${config.textColor}`}>
                    <Icon size={16} />
                </div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter text-slate-500 dark:text-slate-400">{label}</span>
            </div>
            <div className="flex flex-col">
                <span className={`text-2xl md:text-3xl font-black tracking-tighter ${config.textColor}`}>{count}</span>
                {amount !== undefined && (
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1">৳{amount.toLocaleString()}</span>
                )}
            </div>
        </div>
    );
};

const RoleProgress = ({ label, count, total, color }: any) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
        <div className="space-y-3">
            <div className="flex justify-between text-[11px] font-black tracking-widest">
                <span className="text-slate-400 dark:text-slate-500 uppercase">{label}</span>
                <span className="text-slate-800 dark:text-slate-200">{count}</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div className={`${color} h-full rounded-full transition-all duration-1000`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

export default DashboardOverview;