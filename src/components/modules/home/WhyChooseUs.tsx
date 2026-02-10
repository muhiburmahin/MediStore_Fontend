"use client";

import { Truck, ShieldCheck, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: Truck,
        title: "Fast Delivery",
        desc: "Get your medicines delivered to your doorstep within 24 hours.",
        color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
    },
    {
        icon: ShieldCheck,
        title: "100% Genuine",
        desc: "We source products directly from manufacturers & trusted distributors.",
        color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
        icon: Clock,
        title: "24/7 Support",
        desc: "Our pharmacists are available round the clock for your help.",
        color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
    },
    {
        icon: Award,
        title: "Best Prices",
        desc: "We offer the most competitive prices and regular discounts.",
        color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="px-5 py-1.5 text-[11px] font-black tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/30 rounded-full"
                    >
                        Our Values
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
                        <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"> Why Choose Us?</span>
                    </h2>
                    <div className="h-1.5 w-60 bg-gradient-to-r from-blue-600 to-green-500 rounded-full" />
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                {item.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}