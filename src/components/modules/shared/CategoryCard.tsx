"use client";

import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CategoryCardProps {
    name: string;
    iconName?: string; // এটি এখন অপশনাল কারণ ইমেজ থাকতে পারে
    imageUrl?: string | null; // ডাটাবেস থেকে আসা ইমেজ URL
    color?: string; // ডিফল্ট কালার থাকতে পারে
}

export default function CategoryCard({ name, iconName, imageUrl, color = "bg-blue-50 text-blue-600" }: CategoryCardProps) {

    // Lucide Icons-এর জন্য টাইপ সেফ এক্সেস
    const IconComponent = iconName ? (Icons[iconName as keyof typeof Icons] as React.ElementType) : null;

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer group flex flex-col items-center w-full max-w-[120px]"
        >
            <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full ${color} flex items-center justify-center mb-4 shadow-sm group-hover:shadow-2xl group-hover:shadow-blue-200/50 transition-all duration-500 border-4 border-white dark:border-slate-800 overflow-hidden`}>

                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    IconComponent && (
                        <IconComponent className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300" />
                    )
                )}
            </div>

            <h3 className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-center px-1 line-clamp-2">
                {name}
            </h3>
        </motion.div>
    );
}