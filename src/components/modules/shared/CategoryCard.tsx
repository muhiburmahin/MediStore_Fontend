"use client";

import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CategoryCardProps {
    name: string;
    iconName?: string;
    imageUrl?: string | null;
    color?: string;
}

export default function CategoryCard({ name, iconName, imageUrl, color = "bg-blue-50 text-blue-600" }: CategoryCardProps) {

    const IconComponent = iconName ? (Icons[iconName as keyof typeof Icons] as React.ElementType) : null;

    const hasValidImage = imageUrl && typeof imageUrl === "string" && imageUrl.trim() !== "";

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer group flex flex-col items-center w-full max-w-[120px]"
        >
            <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full ${color} flex items-center justify-center mb-4 shadow-sm group-hover:shadow-2xl group-hover:shadow-blue-200/50 transition-all duration-500 border-4 border-white dark:border-slate-800 overflow-hidden bg-white`}>

                {hasValidImage ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100px, 120px"
                        className="object-cover group-hover:scale-110 transition-transform duration-500 p-1"
                    />
                ) : (
                    IconComponent ? (
                        <IconComponent className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300" />
                    ) : (
                        <Icons.LayoutGrid className="w-10 h-10" />
                    )
                )}
            </div>

            <h3 className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-center px-1 line-clamp-2">
                {name}
            </h3>
        </motion.div>
    );
}