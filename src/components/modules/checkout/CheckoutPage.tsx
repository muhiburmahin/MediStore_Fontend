"use client";
import { ShippingForm } from "@/components/modules/checkout/ShippingForm";
import { OrderPreview } from "@/components/modules/checkout/OrderPreview";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";

export const CheckoutModule = () => {
    const cart = useSelector((state: RootState) => state.cart.items);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">

            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link href="/cart" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-2 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Cart</span>
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent inline-block">
                        Checkout Process
                    </h1>
                </div>

                <div className="flex items-center gap-3 mt-2">
                    <div className="bg-blue-600 dark:bg-blue-500 h-8 w-1.5 rounded-full"></div> {/* একটি স্টাইলিশ ইন্ডিকেটর */}
                    <p className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-200">
                        Total Items: <span className="text-blue-600 dark:text-blue-400 font-black">{totalItems}</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                <div className="lg:col-span-2 space-y-8">
                    <ShippingForm />

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 dark:text-white">Payment Method</h2>
                        <div className="p-4 rounded-2xl border-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 flex justify-between items-center">
                            <span className="font-bold text-blue-700 dark:text-blue-300">Cash on Delivery</span>
                            <div className="h-5 w-5 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>
                        </div>
                    </div>
                </div>

                {/* ডান পাশ: OrderPreview এবং Confirm Button */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <OrderPreview />
                        <Link href="/order-success" className="w-full">
                            <Button className="w-full h-16 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl text-xl font-black shadow-xl hover:shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-2">
                                Place Order <ArrowRight size={24} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};