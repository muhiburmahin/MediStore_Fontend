// "use client";

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../../../store";
// import { Minus, Plus, Trash2, ShoppingBag, ShieldCheck, ChevronRight } from "lucide-react";
// import { addToCart, removeOneFromCart, removeFromCart } from "@/store/slice/cartSlice";
// import Image from "next/image";
// import { Button } from "../../ui/button";
// import Link from "next/link";

// export default function CartPage() {
//     const [mounted, setMounted] = useState(false);
//     const dispatch = useDispatch<AppDispatch>();
//     const cart = useSelector((state: RootState) => state.cart.items);

//     useEffect(() => {
//         setMounted(true);
//     }, []);

//     const grandTotal = cart.reduce((acc, item) => acc + item.quantity * item.medicine.price, 0);

//     if (!mounted) return <div className="h-screen flex items-center justify-center font-bold text-blue-600">Loading...</div>;

//     if (cart.length === 0) {
//         return (
//             <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
//                 <ShoppingBag size={80} className="text-slate-300 dark:text-slate-700" />
//                 <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Your cart is empty</h2>
//                 <Link href="/shop" className="mt-5">
//                     <Button className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full px-8">
//                         Shop Now
//                     </Button>
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-6xl mx-auto px-4 py-10 transition-colors duration-300 pb-32 lg:pb-10">

//             <h1 className="text-3xl md:text-4xl font-black mb-10 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent inline-block">
//                 My Cart ({cart.length})
//             </h1>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//                 <div className="lg:col-span-2 space-y-4">
//                     {cart.map((item) => (
//                         <div key={item.medicine.id} className="flex flex-row items-center gap-3 md:gap-4 p-3 md:p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">

//                             <div className="relative w-20 h-20 md:w-24 md:h-24 bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden shrink-0 border border-slate-100 dark:border-slate-700">
//                                 <Image src={item.medicine.imageUrl} alt={item.medicine.name} fill className="object-cover" />
//                             </div>

//                             <div className="flex-1 min-w-0">
//                                 <h3 className="font-bold text-sm md:text-lg text-slate-800 dark:text-slate-100 truncate leading-tight">
//                                     {item.medicine.name}
//                                 </h3>
//                                 <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">
//                                     {item.medicine.manufacturer}
//                                 </p>
//                                 <p className="text-blue-600 dark:text-blue-400 font-bold mt-1 text-sm md:text-base">৳{item.medicine.price}</p>
//                             </div>

//                             <div className="flex flex-col md:flex-row items-center gap-2 md:gap-16">

//                                 <div className="flex items-center gap-2 md:gap-3 bg-slate-50 dark:bg-slate-800 p-1.5 md:p-2 rounded-full border border-slate-200 dark:border-slate-700">
//                                     <button
//                                         onClick={() => dispatch(removeOneFromCart(item.medicine.id))}
//                                         className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border-2 border-transparent bg-origin-border bg-gradient-to-r from-blue-600 to-green-600 p-[1.5px]"
//                                     >
//                                         <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-blue-600">
//                                             <Minus size={12} className="md:w-3.5 md:h-3.5" />
//                                         </div>
//                                     </button>

//                                     <span className="text-sm md:text-lg font-black text-slate-700 dark:text-slate-200 min-w-[18px] text-center">
//                                         {item.quantity}
//                                     </span>

//                                     <button
//                                         onClick={() => dispatch(addToCart({ medicine: item.medicine }))}
//                                         className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border-2 border-transparent bg-origin-border bg-gradient-to-r from-blue-600 to-green-600 p-[1.5px]"
//                                     >
//                                         <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-green-600">
//                                             <Plus size={12} className="md:w-3.5 md:h-3.5" />
//                                         </div>
//                                     </button>
//                                 </div>

//                                 <div className="text-right flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-1">
//                                     <p className="font-black text-slate-900 dark:text-slate-100 text-sm md:text-lg">৳{item.quantity * item.medicine.price}</p>
//                                     <button onClick={() => dispatch(removeFromCart(item.medicine.id))} className="text-red-400 hover:text-red-600 p-1 transition-colors">
//                                         <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="hidden lg:block lg:col-span-1">
//                     <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl sticky top-24">
//                         <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100">Order Summary</h2>

//                         <div className="space-y-4">
//                             <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium">
//                                 <span>Subtotal ({cart.length} items)</span>
//                                 <span className="text-slate-900 dark:text-slate-100 font-bold">৳{grandTotal}</span>
//                             </div>
//                             <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium">
//                                 <span>Delivery Fee</span>
//                                 <span className="text-green-600 font-bold">Free</span>
//                             </div>

//                             <div className="h-px bg-slate-100 dark:bg-slate-800 my-6" />

//                             <div className="flex justify-between items-center mb-8">
//                                 <span className="text-lg font-bold text-slate-800 dark:text-slate-100">Grand Total</span>
//                                 <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
//                                     ৳{grandTotal}
//                                 </span>
//                             </div>
//                             <Link href="/checkout" className="w-full">
//                                 <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full shadow-lg">
//                                     Checkout
//                                 </Button>
//                             </Link>
//                             <div className="flex items-center justify-center gap-2 mt-6 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
//                                 <ShieldCheck className="text-green-500" size={16} />
//                                 <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold text-center">
//                                     100% Original Medicine Guaranteed
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
//                 <div className="flex justify-between items-center mb-4">
//                     <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Total Payable</span>
//                     <span className="text-2xl font-black text-blue-600">৳{grandTotal}</span>
//                 </div>
//                 <Link href="/checkout" className="w-full inline-block">
//                     <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl text-lg font-bold shadow-lg">
//                         Checkout
//                     </Button>
//                 </Link>
//                 {/* <div className="flex items-center justify-center gap-2 mt-4">
//                     <ShieldCheck size={14} className="text-green-500" />
//                     <span className="text-[10px] text-slate-400 font-bold uppercase">Secure Checkout</span>
//                 </div> */}
//             </div>
//         </div >
//     );
// }



"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { Minus, Plus, Trash2, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import { addToCart, removeOneFromCart, removeFromCart } from "@/store/slice/cartSlice";
import Image from "next/image";
import { Button } from "../../ui/button";
import Link from "next/link";

export default function CartPage() {
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.cart.items);

    useEffect(() => {
        setMounted(true);
    }, []);

    const grandTotal = cart.reduce((acc, item) => acc + item.quantity * item.medicine.price, 0);

    if (!mounted) return <div className="h-screen flex items-center justify-center font-bold text-blue-600">Loading...</div>;

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <ShoppingBag size={80} className="text-slate-300 dark:text-slate-700" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Your cart is empty</h2>
                <Link href="/shop" className="mt-5">
                    <Button className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full px-8">
                        Shop Now
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 transition-colors duration-300">
            {/* Title Section */}
            <h1 className="text-3xl md:text-4xl font-black mb-10 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent inline-block">
                My Cart ({cart.length})
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item.medicine.id} className="flex flex-row items-center gap-3 md:gap-4 p-3 md:p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">

                            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden shrink-0 border border-slate-100 dark:border-slate-700">
                                <Image src={item.medicine.imageUrl} alt={item.medicine.name} fill className="object-cover" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-sm md:text-lg text-slate-800 dark:text-slate-100 truncate leading-tight">
                                    {item.medicine.name}
                                </h3>
                                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">
                                    {item.medicine.manufacturer}
                                </p>
                                <p className="text-blue-600 dark:text-blue-400 font-bold mt-1 text-sm md:text-base">৳{item.medicine.price}</p>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-16">

                                <div className="flex items-center gap-2 md:gap-3 bg-slate-50 dark:bg-slate-800 p-1.5 md:p-2 rounded-full border border-slate-200 dark:border-slate-700">
                                    <button
                                        onClick={() => dispatch(removeOneFromCart(item.medicine.id))}
                                        className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border-2 border-transparent bg-origin-border bg-gradient-to-r from-blue-600 to-green-600 p-[1.5px]"
                                    >
                                        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-blue-600">
                                            <Minus size={12} className="md:w-3.5 md:h-3.5" />
                                        </div>
                                    </button>

                                    <span className="text-sm md:text-lg font-black text-slate-700 dark:text-slate-200 min-w-[18px] text-center">
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() => dispatch(addToCart({ medicine: item.medicine }))}
                                        className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border-2 border-transparent bg-origin-border bg-gradient-to-r from-blue-600 to-green-600 p-[1.5px]"
                                    >
                                        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-green-600">
                                            <Plus size={12} className="md:w-3.5 md:h-3.5" />
                                        </div>
                                    </button>
                                </div>

                                <div className="text-right flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-1">
                                    <p className="font-black text-slate-900 dark:text-slate-100 text-sm md:text-lg">৳{item.quantity * item.medicine.price}</p>
                                    <button onClick={() => dispatch(removeFromCart(item.medicine.id))} className="text-red-400 hover:text-red-600 p-1 transition-colors">
                                        <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Side / Bottom: Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-xl lg:sticky lg:top-24">
                        <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100">Order Summary</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium">
                                <span>Subtotal ({cart.length} items)</span>
                                <span className="text-slate-900 dark:text-slate-100 font-bold">৳{grandTotal}</span>
                            </div>
                            <div className="flex justify-between text-slate-500 dark:text-slate-400 font-medium">
                                <span>Delivery Fee</span>
                                <span className="text-green-600 font-bold uppercase text-sm">Free</span>
                            </div>

                            <div className="h-px bg-slate-100 dark:bg-slate-800 my-6" />

                            <div className="flex justify-between items-center mb-8">
                                <span className="text-lg font-bold text-slate-800 dark:text-slate-100">Grand Total</span>
                                <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                    ৳{grandTotal}
                                </span>
                            </div>

                            <Link href="/checkout" className="w-full inline-block">
                                <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-[1rem] shadow-lg hover:opacity-90 transition-opacity">
                                    Checkout
                                </Button>
                            </Link>

                            <div className="flex items-center justify-center gap-2 mt-6 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <ShieldCheck className="text-green-500" size={16} />
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold text-center">
                                    100% Original Medicine Guaranteed
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}