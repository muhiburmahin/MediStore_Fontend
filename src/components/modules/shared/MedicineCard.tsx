"use client";

import Image from "next/image";
import { Medicine } from "@/types/medicine.type";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Info, Star, Tag, Images } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slice/cartSlice";
import { AppDispatch } from "@/store";
import Link from "next/link";

interface MedicineCardProps {
    medicine: Medicine;
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
    const dispatch = useDispatch<AppDispatch>();

    // ইমেজ হ্যান্ডলিং
    const displayImage = medicine.images && medicine.images.length > 0
        ? medicine.images[0]
        : "/placeholder-medicine.png";

    /**
     * ডাইনামিক রেটিং ক্যালকুলেশন:
     * ১. যদি ব্যাকএন্ড থেকে সরাসরি averageRating আসে তবে সেটি ব্যবহার করবে।
     * ২. না থাকলে reviews অ্যারে থেকে গড় (Average) বের করবে।
     */
    const calculateRating = () => {
        if (medicine.averageRating) return medicine.averageRating;

        if (medicine.reviews && medicine.reviews.length > 0) {
            const totalRating = medicine.reviews.reduce((acc, curr) => acc + curr.rating, 0);
            return totalRating / medicine.reviews.length;
        }
        return 0; // কোনো রিভিউ না থাকলে ০
    };

    const finalRating = calculateRating();
    const totalReviews = medicine.totalReviews || medicine.reviews?.length || 0;

    const handleAddToCart = () => {
        const serializedMedicine = {
            ...medicine,
            createdAt: medicine.createdAt ? String(medicine.createdAt) : "",
            updatedAt: medicine.updatedAt ? String(medicine.updatedAt) : "",
        };

        dispatch(addToCart({
            medicine: serializedMedicine,
            quantity: 1
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
            {/* Badges & Indicators */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <button className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                    <Heart className="w-4 h-4" />
                </button>
                {medicine.images && medicine.images.length > 1 && (
                    <div className="p-2 rounded-full bg-blue-600 text-white shadow-lg">
                        <Images className="w-3.5 h-3.5" />
                    </div>
                )}
            </div>

            {/* Image Section */}
            <Link href={`/medicine/${medicine.id}`}>
                <div className="relative h-52 w-full bg-[#F8FAFC] dark:bg-slate-800/50 overflow-hidden cursor-pointer">
                    <Image
                        src={displayImage}
                        alt={medicine.name}
                        fill
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
            </Link>

            {/* Content Section */}
            <div className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                        {medicine.manufacturer}
                    </span>

                    {/* Dynamic Rating Display */}
                    <div className="flex items-center gap-1.5">
                        <div className="flex items-center">
                            <Star className={`w-3.5 h-3.5 ${finalRating > 0 ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`} />
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                            {finalRating > 0 ? finalRating.toFixed(1) : "New"}
                        </span>
                        {totalReviews > 0 && (
                            <span className="text-[10px] text-slate-400">({totalReviews})</span>
                        )}
                    </div>
                </div>

                <Link href={`/medicine/${medicine.id}`}>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer">
                        {medicine.name}
                    </h3>
                </Link>

                <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                    <Tag className="w-2.5 h-2.5" />
                    <span>{medicine.category?.name || "Healthcare"}</span>
                </div>

                {/* Price & Cart */}
                <div className="flex items-end justify-between pt-2">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-medium italic">Price</span>
                        <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                            ৳{medicine.price.toFixed(2)}
                        </span>
                    </div>

                    <Button
                        onClick={handleAddToCart}
                        disabled={medicine.stock === 0}
                        size="sm"
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-green-600 hover:shadow-lg active:scale-95"
                    >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {medicine.stock === 0 ? "Out" : "Add"}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}