/* eslint-disable @typescript-eslint/no-explicit-any */
import { userService } from "@/services/user.service";
import OrderStatusPie from "@/components/modules/seller/dashboard/Orders";
import TotalsPie from "@/components/modules/seller/dashboard/Totals";
import { Package, ShoppingBag, Pill, Star, Activity, DollarSign } from "lucide-react";

const COLOR_MAP: Record<string, string> = {
    Category: "#2563eb",
    Order: "#16a34a",
    Medicine: "#0ea5e9",
    Review: "#f59e0b",

    // Order Status Colors
    Placed: "#f58606",
    Processing: "#0b22f7",
    Shipped: "#f326fa",
    Delivered: "#24fafa",
    Cancelled: "#dc2626",

    // Revenue Colors
    "Placed Amount": "#f58606",
    "Processing Amount": "#0b22f7",
    "Shipped Amount": "#10b981",
    "Delivered Amount": "#16a34a",
    "Cancelled Amount": "#ef4444",
};

export default async function DashboardPage() {
    const { data: response, error } = await userService.getSellerStats();

    if (error) return (
        <div className="h-96 flex items-center justify-center p-10">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-800 text-center">
                <h1 className="text-red-600 dark:text-red-400 font-black uppercase italic tracking-widest">Error Occurred</h1>
                <p className="text-red-400 dark:text-red-500/70 text-sm mt-2">{error.message}</p>
            </div>
        </div>
    );

    const stats = response?.data;

    if (!stats) return (
        <div className="h-96 flex items-center justify-center italic text-slate-400 dark:text-slate-600 font-bold animate-pulse">
            SYNCING COMMAND CENTER...
        </div>
    );

    const cardData = [
        { name: "Category", value: stats?.category?.total || 0, icon: Package, fill: COLOR_MAP["Category"] },
        { name: "Order", value: stats?.order?.total || 0, icon: ShoppingBag, fill: COLOR_MAP["Order"] },
        { name: "Medicine", value: stats?.medicine?.total || 0, icon: Pill, fill: COLOR_MAP["Medicine"] },
        { name: "Review", value: stats?.review?.total || 0, icon: Star, fill: COLOR_MAP["Review"] },
    ];

    const totalsData = cardData.map(({ name, value, fill }) => ({ name, value, fill }));

    const orderStatusData = [
        { name: "Placed", value: stats?.order?.placed || stats?.order?.PLACED || 0 },
        { name: "Processing", value: stats?.order?.processing || stats?.order?.PROCESSING || 0 },
        { name: "Shipped", value: stats?.order?.shipped || stats?.order?.SHIPPED || 0 },
        { name: "Delivered", value: stats?.order?.delivered || stats?.order?.DELIVERED || 0 },
        { name: "Cancelled", value: stats?.order?.cancelled || stats?.order?.CANCELLED || 0 },
    ].map(item => ({
        ...item,
        fill: COLOR_MAP[item.name]
    })).filter(item => item.value > 0);

    return (
        <div className="p-6 lg:p-10 space-y-10 bg-slate-50 dark:bg-[#020617] min-h-screen transition-colors duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-none">
                        Seller <span className="text-blue-600 dark:text-blue-500">Command</span> <span className="text-green-600 dark:text-green-500">Center</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2 ml-1">
                        MediStore Pro Suite • Real-time Sync Active
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-ping"></div>
                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Live Server Link</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cardData.map((item) => (
                    <div key={item.name} className="group bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="flex justify-between items-start">
                            <div className="p-3 rounded-2xl" style={{ backgroundColor: `${item.fill}15`, color: item.fill }}>
                                <item.icon size={24} strokeWidth={2.5} />
                            </div>
                            <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase">Active</span>
                        </div>
                        <div className="mt-6">
                            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{item.name}</p>
                            <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight italic">{item.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                {/* Inventory Chart */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1.5 h-6 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                        <h4 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter italic">Inventory Split</h4>
                    </div>
                    <div className="flex justify-center h-[350px]">
                        <TotalsPie totalsData={totalsData} />
                    </div>
                </div>

                {/* Order Success Chart */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1.5 h-6 bg-green-600 dark:bg-green-500 rounded-full"></div>
                        <h4 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter italic flex items-center gap-2">
                            Order Success <Activity size={16} className="text-green-600" />
                        </h4>
                    </div>
                    <div className="flex justify-center h-[350px]">
                        {orderStatusData.length > 0 ? (
                            <OrderStatusPie orderStatusData={orderStatusData} />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-slate-400 italic">
                                <ShoppingBag size={48} className="mb-4 opacity-20" />
                                <p>No Active Orders Found</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm lg:col-span-2 xl:col-span-1">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1.5 h-6 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                        <h4 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter italic flex items-center gap-2">
                            Revenue Stream <DollarSign size={16} className="text-blue-600" />
                        </h4>
                    </div>

                    <div className="flex flex-col items-center justify-center h-[350px] bg-slate-50/50 dark:bg-slate-800/20 rounded-3xl relative overflow-hidden">
                        <div className="flex flex-col items-center justify-center text-center z-10">
                            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                                Total Earnings
                            </p>
                            <h2 className="text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter">
                                ৳{stats?.revenue?.total?.toLocaleString() || 0}
                            </h2>
                            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                <Activity size={12} className="animate-pulse" /> Live Data
                            </div>
                        </div>

                        <DollarSign
                            size={140}
                            className="absolute -bottom-10 -right-10 text-slate-200 dark:text-slate-800/30 -rotate-12 pointer-events-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}