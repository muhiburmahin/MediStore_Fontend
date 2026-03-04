
import { userService } from "@/services/user.service";
import OrderStatusPie from "@/components/modules/seller/dashboard/Orders";
import TotalsPie from "@/components/modules/seller/dashboard/Totals";
import { Package, ShoppingBag, Pill, Star, Activity, DollarSign } from "lucide-react";

const COLOR_MAP: Record<string, string> = {
    Category: "#2563eb", // Blue-600
    Order: "#16a34a",    // Green-600
    Medicine: "#0ea5e9", // Sky-500
    Review: "#f59e0b",   // Amber-500

    // Order Success (Blue-600 & Green-600 priority)
    Placed: "#2563eb",
    Processing: "#3b82f6",
    Shipped: "#059669",  // Emerald-600
    Delivered: "#16a34a", // Green-600
    Cancelled: "#dc2626",

    // Revenue Flow (Blue-600 & Green-600 priority)
    "Placed Amount": "#2563eb",
    "Processing Amount": "#60a5fa",
    "Shipped Amount": "#10b981",
    "Delivered Amount": "#16a34a",
    "Cancelled Amount": "#ef4444",
};

export default async function DashboardPage() {
    const { data, error } = await userService.getSellerStats();

    if (error) return (
        <div className="h-96 flex items-center justify-center p-10">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-800 text-center">
                <h1 className="text-red-600 dark:text-red-400 font-black uppercase italic tracking-widest">Error Occurred</h1>
                <p className="text-red-400 dark:text-red-500/70 text-sm mt-2">{error.message}</p>
            </div>
        </div>
    );

    if (!data) return (
        <div className="h-96 flex items-center justify-center italic text-slate-400 dark:text-slate-600 font-bold animate-pulse">
            SYNCING COMMAND CENTER...
        </div>
    );

    const stats = data?.data;

    const cardData = [
        { name: "Category", value: stats?.category?.total || 0, icon: Package, fill: COLOR_MAP["Category"] },
        { name: "Order", value: stats?.order?.total || 0, icon: ShoppingBag, fill: COLOR_MAP["Order"] },
        { name: "Medicine", value: stats?.medicine?.total || 0, icon: Pill, fill: COLOR_MAP["Medicine"] },
        { name: "Review", value: stats?.review?.total || 0, icon: Star, fill: COLOR_MAP["Review"] },
    ];

    const totalsData = cardData.map(({ name, value, fill }) => ({ name, value, fill }));

    const orderStatusData = [
        { name: "Placed", value: stats?.order?.placed || 0 },
        { name: "Processing", value: stats?.order?.processing || 0 },
        { name: "Shipped", value: stats?.order?.shipped || 0 },
        { name: "Delivered", value: stats?.order?.delivered || 0 },
        { name: "Cancelled", value: stats?.order?.cancelled || 0 },
    ].filter(item => item.value > 0).map(item => ({ ...item, fill: COLOR_MAP[item.name] }));

    const orderAmountStatusData = [
        { name: "Placed Amount", value: stats?.order?.placedAmount || 0 },
        { name: "Processing Amount", value: stats?.order?.processingAmount || 0 },
        { name: "Shipped Amount", value: stats?.order?.shippedAmount || 0 },
        { name: "Delivered Amount", value: stats?.order?.deliveredAmount || 0 },
        { name: "Cancelled Amount", value: stats?.order?.cancelledAmount || 0 },
    ].filter(item => item.value > 0).map(item => ({ ...item, fill: COLOR_MAP[item.name] }));

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
                    <div key={item.name} className="group bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:border-slate-700 transition-all duration-300">
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
                    <div className="flex justify-center h-[300px]">
                        <TotalsPie totalsData={totalsData} />
                    </div>
                </div>

                {/* Order Success - Brand Color Modified */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1.5 h-6 bg-green-600 dark:bg-green-500 rounded-full"></div>
                        <h4 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter italic flex items-center gap-2">
                            Order Success <Activity size={16} className="text-green-600" />
                        </h4>
                    </div>
                    <div className="flex justify-center h-[300px]">
                        <OrderStatusPie orderStatusData={orderStatusData} />
                    </div>
                </div>

                {/* Revenue Flow - Brand Color Modified */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm lg:col-span-2 xl:col-span-1">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1.5 h-6 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                        <h4 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter italic flex items-center gap-2">
                            Revenue Flow <DollarSign size={16} className="text-blue-600" />
                        </h4>
                    </div>
                    {/* <div className="flex justify-center h-[300px]">
                        <OrderAmountStatus orderAmountStatusData={orderAmountStatusData} />
                    </div> */}
                </div>
            </div>
        </div>
    );
}
// import OrderAmountStatus from "@/components/modules/admin/dashboard/OrderAmountStatus";
// import OrderStatusPie from "@/components/modules/seller/dashboard/Orders";
// import TotalsPie from "@/components/modules/seller/dashboard/Totals";
// import { userService } from "@/services/user.service";

// const COLOR_MAP: Record<string, string> = {
//     Category: "#2563eb",
//     Order: "#16a34a",
//     Medicine: "#f59e0b",
//     Review: "#dc2626",

//     Placed: "#2563eb",
//     Processing: "#f59e0b",
//     Shipped: "#7c3aed",
//     Delivered: "#16a34a",
//     Cancelled: "#dc2626",

//     "Placed Amount": "#60a5fa",
//     "Processing Amount": "#fb923c",
//     "Shipped Amount": "#818cf8",
//     "Delivered Amount": "#34d399",
//     "Cancelled Amount": "#ef4444",
// };

// export default async function DashboardPage() {
//     const { data, error } = await userService.getSellerStats();
//     if (error) return <h1>{error.message}</h1>;
//     if (!data) return <h1>Loading...</h1>;
//     const stats = data?.data;

//     const totalsData = [
//         { name: "Category", value: stats?.category.total },
//         { name: "Order", value: stats.order.total },
//         { name: "Medicine", value: stats.medicine.total },
//         { name: "Review", value: stats.review.total },
//     ]
//         .filter((item) => item.value > 0)
//         .map((item) => ({
//             ...item,
//             fill: COLOR_MAP[item.name],
//         }));

//     const orderStatusData = [
//         { name: "Placed", value: stats.order.placed },
//         { name: "Processing", value: stats.order.processing },
//         { name: "Shipped", value: stats.order.shipped },
//         { name: "Delivered", value: stats.order.delivered },
//         { name: "Cancelled", value: stats.order.cancelled },
//     ]
//         .filter((item) => item.value > 0)
//         .map((item) => ({
//             ...item,
//             fill: COLOR_MAP[item.name],
//         }));

//     const orderAmountStatusData = [
//         { name: "Placed Amount", value: stats.order.placedAmount },
//         { name: "Processing Amount", value: stats.order.processingAmount },
//         { name: "Shipped Amount", value: stats.order.shippedAmount },
//         { name: "Delivered Amount", value: stats.order.deliveredAmount },
//         { name: "Cancelled Amount", value: stats.order.cancelledAmount },
//     ]
//         .filter((item) => item.value > 0)
//         .map((item) => ({
//             ...item,
//             fill: COLOR_MAP[item.name],
//         }));

//     return (
//         <div>
//             <h2 className="text-2xl font-semibold mb-5">Seller Dashboard</h2>
//             <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
//                 <TotalsPie totalsData={totalsData} />
//                 <OrderStatusPie orderStatusData={orderStatusData} />
//                 <OrderAmountStatus
//                     orderAmountStatusData={orderAmountStatusData}
//                 />
//             </div>
//         </div>
//     );
// }