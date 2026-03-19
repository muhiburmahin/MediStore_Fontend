import { CustomerStats } from "@/components/modules/customer/CustomerDashboardContent";
import { userService } from "@/services/user.service";
import { PlusCircle, ShoppingCart, Package } from "lucide-react";
import Link from "next/link";

export default async function CustomerDashboardPage() {
    const [statsResponse, profileResponse] = await Promise.all([
        userService.getStats("customer"),
        userService.getMyProfile()
    ]);

    const stats = statsResponse?.data || null;
    const profile = profileResponse?.data || null;

    return (
        <div className="max-w-7xl mx-auto space-y-10 py-10 px-6 min-h-screen">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 dark:border-slate-800 pb-10 gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white">
                        Hello, <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            {profile?.name?.split(" ")[0] || "Health Partner"}!
                        </span> 👋
                    </h1>
                    <p className="text-slate-400 mt-3 font-extrabold text-sm uppercase tracking-[0.2em] italic">
                        Your health is our priority
                    </p>
                </div>

                <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 text-sm font-bold">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <main className="space-y-12">
                <CustomerStats stats={stats} />

                {/* Quick Actions */}
                <div className="w-full bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem]">
                    <h3 className="text-xl font-black mb-8 text-slate-800 dark:text-white tracking-tight">Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <Link href="/shop" className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-blue-900/30 text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-[1.03] transition-all group shadow-sm">
                            <ShoppingCart size={32} className="mb-3 group-hover:rotate-12 transition-transform" />
                            <span className="text-sm font-black uppercase tracking-tight">Continue Shopping</span>
                        </Link>

                        <button className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-white dark:bg-slate-800 border-2 border-emerald-100 dark:border-emerald-900/30 text-emerald-600 hover:bg-emerald-600 hover:text-white hover:scale-[1.03] transition-all group shadow-sm">
                            <PlusCircle size={32} className="mb-3 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-black uppercase tracking-tight">Upload Prescription</span>
                        </button>

                        <Link href="/dashboard/my-orders" className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-700 hover:text-white hover:scale-[1.03] transition-all group shadow-sm">
                            <Package size={32} className="mb-3 group-hover:-translate-y-1 transition-transform" />
                            <span className="text-sm font-black uppercase tracking-tight">Track Order</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}