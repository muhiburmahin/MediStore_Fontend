// "use client";

// import Image from "next/image";
// import { Medicine } from "@/types/medicine.type";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart, Heart, Info, Star } from "lucide-react";
// import { motion } from "framer-motion";
// import { useDispatch } from "react-redux";
// import { addToCart } from "@/store/slice/cartSlice";
// import { AppDispatch } from "@/store";

// interface MedicineCardProps {
//     medicine: Medicine;
// }

// export default function MedicineCard({ medicine }: MedicineCardProps) {
//     const dispatch = useDispatch<AppDispatch>();
//     const handleAddToCart = () => {
//         const serializedMedicine = {
//             ...medicine,
//             createdAt: medicine.createdAt ? String(medicine.createdAt) : "",
//             updatedAt: medicine.updatedAt ? String(medicine.updatedAt) : "",
//         };

//         dispatch(addToCart({
//             medicine: serializedMedicine,
//             quantity: 1
//         }));

//         //alert(`${medicine.name} added to cart!`);
//     };
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             whileHover={{ y: -5 }}
//             className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
//         >
//             {/* Top Action Buttons (Wishlist) */}
//             <div className="absolute top-4 right-4 z-10">
//                 <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-white transition-colors">
//                     <Heart className="w-4 h-4" />
//                 </button>
//             </div>

//             {/* Product Image Section */}
//             <div className="relative h-52 w-full bg-[#F8FAFC] overflow-hidden">
//                 <Image
//                     src={medicine.imageUrl}
//                     alt={medicine.name}
//                     fill
//                     className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
//                 />
//                 {/* Stock Status Badge */}
//                 {medicine.stock < 10 && (
//                     <div className="absolute bottom-2 left-2 bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-md">
//                         Low Stock: {medicine.stock}
//                     </div>
//                 )}
//             </div>

//             {/* Content Section */}
//             <div className="p-5 space-y-3">
//                 {/* Manufacturer & Rating */}
//                 <div className="flex justify-between items-center">
//                     <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
//                         {medicine.manufacturer}
//                     </span>
//                     <div className="flex items-center gap-1">
//                         <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                         <span className="text-xs font-semibold text-slate-500">4.8</span>
//                     </div>
//                 </div>

//                 {/* Name & Description */}
//                 <div>
//                     <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
//                         {medicine.name}
//                     </h3>
//                     <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
//                         {medicine.description}
//                     </p>
//                 </div>

//                 {/* Price Section */}
//                 <div className="flex items-end justify-between pt-2">
//                     <div className="flex flex-col">
//                         <span className="text-[10px] text-slate-400 font-medium">Price</span>
//                         <span className="text-xl font-black text-slate-900">
//                             ৳{medicine.price.toFixed(2)}
//                         </span>
//                     </div>

//                     {/* Add to Cart Button */}
//                     <Button
//                         onClick={handleAddToCart}
//                         size="sm"
//                         className="rounded-xl bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg shadow-blue-200 transition-all active:scale-95 group/btn"
//                     >
//                         <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
//                         Add
//                     </Button>
//                 </div>
//             </div>

//             {/* Quick Info Hover Overlay */}
//             <div className="absolute inset-x-0 bottom-[100px] flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                 <button className="flex items-center gap-2 bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded-full shadow-2xl">
//                     <Info className="w-3 h-3" />
//                     Quick View
//                 </button>
//             </div>
//         </motion.div>
//     );
// }

"use client";

import Image from "next/image";
import { Medicine } from "@/types/medicine.type";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Info, Star, Tag } from "lucide-react";
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
            className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
            {/* Top Action Buttons (Wishlist) */}
            <div className="absolute top-4 right-4 z-10">
                <button className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-700 transition-colors">
                    <Heart className="w-4 h-4" />
                </button>
            </div>

            {/* Product Image Section */}
            <Link href={`/medicine/${medicine.id}`}>
                <div className="relative h-52 w-full bg-[#F8FAFC] dark:bg-slate-800/50 overflow-hidden cursor-pointer">
                    <Image
                        src={medicine.imageUrl}
                        alt={medicine.name}
                        fill
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Stock Status Badge */}
                    {medicine.stock < 10 && (
                        <div className="absolute bottom-2 left-2 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-sm">
                            Low Stock: {medicine.stock}
                        </div>
                    )}
                </div>
            </Link>

            {/* Content Section */}
            <div className="p-5 space-y-3">
                {/* Manufacturer & Rating */}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded w-fit">
                            {medicine.manufacturer}
                        </span>

                        <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                            <Tag className="w-2.5 h-2.5" />
                            <span>{typeof medicine.category === 'object' ? medicine.category.name : (medicine.category || "General")}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">4.8</span>
                    </div>
                </div>

                {/* Name & Description */}
                <div>
                    <Link href={`/medicine/${medicine.id}`}>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer">
                            {medicine.name}
                        </h3>
                    </Link>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {medicine.description}
                    </p>
                </div>

                {/* Price Section */}
                <div className="flex items-end justify-between pt-2">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-medium italic">Price</span>
                        <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                            ৳{medicine.price.toFixed(2)}
                        </span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        onClick={handleAddToCart}
                        size="sm"
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95 group/btn"
                    >
                        <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                        Add
                    </Button>
                </div>
            </div>

            {/* Quick Info Hover Overlay */}
            <div className="absolute inset-x-0 bottom-[100px] flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <Link href={`/medicine/${medicine.id}`}>
                    <button className="flex items-center gap-2 bg-slate-900/90 dark:bg-slate-700/90 backdrop-blur-md text-white text-[10px] px-4 py-2 rounded-full shadow-2xl border border-white/10">
                        <Info className="w-3 h-3" />
                        View Details
                    </button>
                </Link>
            </div>
        </motion.div>
    );
}