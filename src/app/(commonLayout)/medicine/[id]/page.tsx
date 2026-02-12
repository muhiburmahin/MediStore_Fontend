"use client";
import { MOCK_MEDICINES } from "@/data/medicines";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ShoppingCart, ShieldCheck, ArrowLeft, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MedicineDetails() {
    const { id } = useParams();
    const medicine = MOCK_MEDICINES.find((m) => m.id === id);

    if (!medicine) {
        return <div className="text-center py-20 font-bold text-red-500">Medicine not found!</div>;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 py-12 transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-12">

                <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-10 font-bold transition-colors group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Image Container */}
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-[3.5rem] p-8 md:p-16 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-inner">
                        <div className="relative w-full aspect-square">
                            <Image
                                src={medicine.imageUrl}
                                alt={medicine.name}
                                fill
                                className="object-contain hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Right: Info Content */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black rounded-full uppercase tracking-[0.2em]">
                                    {medicine.manufacturer}
                                </span>
                                <div className="flex items-center text-amber-500 gap-1 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full text-xs font-bold">
                                    <Star className="w-3 h-3 fill-amber-500" /> 4.8 Rating
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white">
                                {medicine.name}
                            </h1>

                            <div className="flex flex-wrap gap-6 text-sm font-bold">
                                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                    <ShieldCheck className="w-5 h-5" /> 100% Genuine
                                </div>
                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                    <Truck className="w-5 h-5" /> Fast Delivery
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            {medicine.description}
                        </p>

                        <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-baseline gap-3 mb-8">
                                <span className="text-5xl font-black text-slate-900 dark:text-white">
                                    ৳{medicine.price.toFixed(2)}
                                </span>
                                <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Per Unit</span>
                            </div>

                            {/* Colorful Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="flex-[2] h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white text-lg font-black shadow-xl shadow-blue-500/25 transition-all active:scale-95">
                                    <ShoppingCart className="w-6 h-6 mr-3" /> Add to Cart
                                </Button>

                                <Button variant="outline" className="flex-1 h-16 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-lg font-black hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}