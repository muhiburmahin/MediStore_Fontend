"use client";

import * as Icons from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
    name: string;
    iconName: string;
    color: string;
}

export default function CategoryCard({ name, iconName, color }: CategoryCardProps) {
    const IconComponent = (Icons as any)[iconName];

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer group flex flex-col items-center"
        >
            <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full ${color} flex items-center justify-center mb-4 shadow-sm group-hover:shadow-2xl group-hover:shadow-blue-200/50 transition-all duration-500 border-4 border-white dark:border-slate-800`}>
                {IconComponent && (
                    <IconComponent className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300" />
                )}
            </div>

            <h3 className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-center px-2 line-clamp-2">
                {name}
            </h3>
        </motion.div>
    );
}