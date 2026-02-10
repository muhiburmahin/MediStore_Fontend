// "use client";

// import Image from "next/image";
// import { Medicine } from "@/types/medicine.type";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart, Heart, Info, Star } from "lucide-react";
// import { motion } from "framer-motion";

// interface MedicineCardProps {
//     medicine: Medicine;
// }

// export default function MedicineCard({ medicine }: MedicineCardProps) {
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
//                         size="sm"
//                         className="rounded-xl bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg shadow-blue-200 transition-all active:scale-95 group/btn"
//                     >
//                         <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
//                         Add
//                     </Button>
//                 </div>
//             </div>

//             {/* Quick Info Hover Overlay (Optional) */}
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
import { ShoppingCart, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface MedicineCardProps {
    medicine: Medicine;
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden"
        >
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {medicine.stock < 10 && (
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-pulse">
                        Low Stock
                    </span>
                )}
                <span className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Genuine
                </span>
            </div>

            {/* Image Section */}
            <div className="relative h-56 w-full bg-slate-50 dark:bg-slate-800/50 overflow-hidden">
                <Image
                    src={medicine.imageUrl}
                    alt={medicine.name}
                    fill
                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
                        {medicine.manufacturer}
                    </span>
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">4.8</span>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-black text-slate-800 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {medicine.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                        {medicine.description}
                    </p>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Price</span>
                        <span className="text-xl font-black text-slate-900 dark:text-white">৳{medicine.price.toFixed(2)}</span>
                    </div>

                    <Button
                        size="sm"
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 group/btn px-5"
                    >
                        <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                        Add
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}