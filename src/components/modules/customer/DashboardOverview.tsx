import { MapPin, PlusCircle, ShoppingCart } from "lucide-react";
import Link from "next/link";

export const DashboardOverview = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link href="/shop" className="flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-600/10 border border-blue-600/20 text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
                        <ShoppingCart className="mb-2" />
                        <span className="text-xs font-bold">Continue Shopping</span>
                    </Link>
                    <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-green-600/10 border border-green-600/20 text-green-500 hover:bg-green-600 hover:text-white transition-all">
                        <PlusCircle className="mb-2" />
                        <span className="text-xs font-bold">Upload Prescription</span>
                    </button>
                    <Link href="/dashboard/my-orders" className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all">
                        <ShoppingCart className="mb-2" />
                        <span className="text-xs font-bold">Track Order</span>
                    </Link>
                </div>
            </div>

            {/* Default Address Card */}
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-300"><MapPin size={18} /> Delivery Address</h3>
                <div className="space-y-2">
                    <p className="text-sm font-bold text-white">Home Address</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        House #24, Road #05, Dhanmondi, Dhaka - 1209, Bangladesh.
                    </p>
                    <button className="text-[10px] font-black text-blue-500 uppercase mt-4 hover:underline">Edit Address</button>
                </div>
            </div>
        </div>
    );
};