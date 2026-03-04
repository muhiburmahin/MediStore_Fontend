"use client";

import CategoryCard from "../shared/CategoryCard";
import { motion } from "framer-motion";
// নিশ্চিত করুন এই পাথটি আপনার ফোল্ডার স্ট্রাকচারের সাথে মেলে
import { Category } from "@/types/category.type";

interface ExtendedCategory extends Category {
    iconName?: string;
    color?: string;
}

interface CategoryListProps {
    categories: ExtendedCategory[];
}

export default function CategoryList({ categories }: CategoryListProps) {
    // ডাটা না থাকলে এরর হ্যান্ডেল করার জন্য খালি অ্যারে চেক
    const displayedCategories = categories?.slice(0, 12) || [];

    return (
        <section className="py-16 bg-slate-50/80 dark:bg-slate-950 border-y border-slate-200/60 dark:border-slate-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-12">

                <div className="flex flex-col items-center mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-4 text-[12px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-100 dark:border-blue-800"
                    >
                        Our Departments
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                        <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">Browse by Category</span>
                    </h2>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-green-500 rounded-full" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-6">
                    {displayedCategories.length > 0 ? (
                        displayedCategories.map((cat) => (
                            <CategoryCard
                                key={cat.id}
                                name={cat.name}
                                imageUrl={cat.imageUrl}
                                iconName={cat.iconName || "LayoutGrid"}
                                color={cat.color || "bg-blue-50 text-blue-600"}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-slate-400 italic">
                            No categories found.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}