"use client";
import { MapPin, User, Phone, Home } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateShippingInfo } from "@/store/slice/checkoutSlice";

export const ShippingForm = () => {
    const dispatch = useDispatch();
    const { shippingInfo } = useSelector((state: RootState) => state.checkout);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(updateShippingInfo({ [e.target.name]: e.target.value }));
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white">
                <MapPin className="text-blue-600" size={22} /> Shipping Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
                        <input
                            name="fullName"
                            value={shippingInfo.fullName}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Enter your name"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3.5 text-slate-400" size={18} />
                        <input
                            name="phone"
                            value={shippingInfo.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            placeholder="01xxxxxxxxx"
                        />
                    </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Delivery Address</label>
                    <div className="relative">
                        <Home className="absolute left-3 top-3.5 text-slate-400" size={18} />
                        <textarea
                            name="address"
                            value={shippingInfo.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="House, Road, Area details..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};