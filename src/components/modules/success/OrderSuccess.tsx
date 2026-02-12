"use client";
import { CheckCircle, ShoppingBag, ArrowRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const OrderSuccess = () => {
    const orderId = "MS-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">

            <div className="relative mb-8">
                <div className="absolute inset-0 bg-green-200 dark:bg-green-900/30 rounded-full animate-ping scale-150 opacity-20"></div>
                <div className="bg-green-500 text-white p-6 rounded-full shadow-xl relative">
                    <CheckCircle size={60} strokeWidth={3} />
                </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white mb-4">
                Order Placed Successfully!
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 text-lg">
                Thank you for your order. We have received your request and our team is preparing your medicines.
            </p>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl w-full max-w-md mb-10">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 font-medium">Order ID:</span>
                    <span className="font-bold text-blue-600 uppercase">{orderId}</span>
                </div>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500 font-medium">Payment Method:</span>
                    <span className="font-bold dark:text-white">Cash on Delivery</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Estimate Delivery:</span>
                    <span className="font-bold text-green-600">Within 24 Hours</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Link href="/shop" className="flex-1">
                    <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
                        <ShoppingBag size={20} /> Continue Shopping
                    </Button>
                </Link>
                <Button variant="outline" className="flex-1 h-14 border-slate-200 dark:border-slate-800 rounded-2xl font-bold flex items-center justify-center gap-2 dark:text-white">
                    <Printer size={20} /> Download Invoice
                </Button>
            </div>
        </div>
    );
};