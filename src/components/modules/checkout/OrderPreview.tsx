"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";

export const OrderPreview = () => {
    const cart = useSelector((state: RootState) => state.cart.items);
    const total = cart.reduce((acc, item) => acc + item.quantity * item.medicine.price, 0);

    return (
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-lg mb-4 dark:text-white">Order Items</h3>
            <div className="space-y-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                    <div key={item.medicine.id} className="flex items-center gap-3">
                        <div className="h-12 w-12 relative rounded-lg bg-white overflow-hidden border border-slate-100">
                            <Image src={item.medicine.imageUrl} alt={item.medicine.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold dark:text-slate-200 truncate">{item.medicine.name}</p>
                            <p className="text-xs text-slate-500">{item.quantity} x ৳{item.medicine.price}</p>
                        </div>
                        <p className="font-bold text-sm dark:text-white">৳{item.quantity * item.medicine.price}</p>
                    </div>
                ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-bold dark:text-slate-400">Total</span>
                <span className="text-2xl font-black text-blue-600">৳{total}</span>
            </div>
        </div>
    );
};