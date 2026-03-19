"use client";

import MedicineCard from "../shared/MedicineCard";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Medicine } from "@/types/medicine.type";

interface MedicineListProps {
    medicines: Medicine[];
}

export default function FeaturedMedicines({ medicines }: MedicineListProps) {
    const safeMedicines = Array.isArray(medicines) ? medicines : [];
    const displayedMedicines = safeMedicines.slice(0, 8);

    return (
        <section className="py-24 bg-[#F8FAFF] dark:bg-slate-950 border-y border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 px-5 py-1.5 text-[11px] font-black tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase bg-blue-100/50 dark:bg-blue-900/30 rounded-full"
                    >
                        <Sparkles className="w-3 h-3" />
                        Top Selections
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                        <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                            Featured Medicines
                        </span>
                    </h2>

                    <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-green-500 rounded-full" />

                    <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto pt-2 font-medium">
                        Explore our premium range of essential healthcare products curated just for you.
                    </p>
                </div>

                {/* Grid Section - Fixed the double grid issue */}
                <div className="w-full">
                    {displayedMedicines.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center"
                        >
                            {displayedMedicines.map((med: Medicine) => (
                                <MedicineCard key={med.id} medicine={med} />
                            ))}
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                                <Sparkles className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 italic font-medium">
                                No featured medicines found at the moment.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Section */}
                <div className="mt-24 flex flex-col items-center space-y-8 text-center">
                    <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

                    <Link
                        href="/shop"
                        className="group relative flex items-center gap-4 bg-slate-900 dark:bg-blue-600 text-white px-12 py-5 rounded-2xl font-bold overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)] active:scale-95"
                    >
                        <span className="relative z-10 text-lg">Explore Full Store</span>
                        <div className="relative z-10 bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-all">
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </div>
                        {/* Hover Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Link>
                </div>

            </div>
        </section>
    );
}