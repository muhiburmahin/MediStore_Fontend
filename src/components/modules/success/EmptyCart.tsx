"use client";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyCartProps {
    title?: string;
    description?: string;
}

export const EmptyCart = ({
    title = "Your cart is empty",
    description = "Looks like you haven't added anything to your cart yet. Explore our wide range of medicines and healthcare products."
}: EmptyCartProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in zoom-in duration-500">

            <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full scale-150 blur-2xl opacity-50"></div>
                <div className="relative bg-white dark:bg-slate-900 p-8 rounded-full border border-slate-100 dark:border-slate-800 shadow-xl">
                    <ShoppingCart size={80} className="text-slate-300 dark:text-slate-600 animate-bounce" />
                </div>
            </div>

            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4">
                {title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-10 leading-relaxed">
                {description}
            </p>

            <Link href="/shop">
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full px-10 h-14 text-lg font-bold shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2">
                    <ArrowLeft size={20} /> Start Shopping
                </Button>
            </Link>
        </div>
    );
};