"use client";

import { MOCK_MEDICINES } from "@/data/medicines";
import MedicineCard from "../shared/MedicineCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MedicineList() {
    // ১২টি মেডিসিন লিমিট
    const displayedMedicines = MOCK_MEDICINES.slice(0, 12);

    return (
        /* bg-[#F8FAFF] ডার্ক মোডে bg-slate-950 হয়ে যাবে */
        <section className="py-24 bg-[#F8FAFF] dark:bg-slate-950 border-y border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="px-5 py-1.5 text-[11px] font-black tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase bg-blue-100/50 dark:bg-blue-900/30 rounded-full"
                    >
                        Top Selections
                    </motion.div>

                    {/* text-slate-900 ডার্ক মোডে white হয়ে যাবে */}
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                        <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"> Featured Medicines</span>
                    </h2>

                    <div className="h-1.5 w-50 bg-gradient-to-r from-blue-600 to-green-500 rounded-full" />

                    <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto pt-2 font-medium">
                        Explore our premium range of essential healthcare products curated just for you.
                    </p>
                </div>

                {/* Grid Section */}
                <div className="p-2 md:p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {displayedMedicines.map((med) => (
                            <MedicineCard key={med.id} medicine={med} />
                        ))}
                    </div>
                </div>

                {/* Footer Link & Button */}
                <div className="mt-20 flex flex-col items-center space-y-6">
                    {/* Divider line */}
                    <div className="h-px w-full max-w-[200px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

                    <Link
                        href="/shop"
                        className="group flex items-center gap-4 bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 text-white px-10 py-4 rounded-2xl font-bold shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(34,197,94,0.3)] hover:-translate-y-1.5 transition-all duration-500"
                    >
                        <span className="text-lg">View Full Store</span>
                        <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-all">
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </div>
                    </Link>

                    <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">
                        Discover more than 500+ healthcare products
                    </p>
                </div>

            </div>
        </section>
    );
}