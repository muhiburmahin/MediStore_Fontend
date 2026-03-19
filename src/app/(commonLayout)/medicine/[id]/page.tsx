"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import {
    ShoppingCart, Star, Zap, ChevronRight, CheckCircle2,
    ShieldCheck, Award, Loader2, MessageSquare, User, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addToCart } from "@/store/slice/cartSlice";
import { useState, useRef, useEffect, useCallback } from "react";
import { Medicine } from "@/types/medicine.type";
import { fetchMedicineById } from "@/actions/medicine.action";

export default function MedicineDetails() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const [medicine, setMedicine] = useState<Medicine | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const loadMedicine = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await fetchMedicineById(id as string);
            if (response?.data) {
                setMedicine(response.data);
            }
        } catch (error) {
            console.error("Failed to load medicine:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => { loadMedicine(); }, [loadMedicine]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;
        setZoomPos({ x, y });
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-slate-500 font-bold animate-pulse">Fetching medicine details...</p>
        </div>
    );

    if (!medicine) return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4 px-4 text-center">
            <h1 className="text-2xl font-bold text-red-600">Medicine Not Found</h1>
            <Link href="/shop" className="px-6 py-2 bg-blue-600 text-white rounded-lg">Back to Shop</Link>
        </div>
    );

    const averageRating = medicine.averageRating ?? 0;
    const totalReviews = medicine.totalReviews ?? 0;
    const starCounts = medicine.starCounts || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const medicineId = medicine.id ? medicine.id.slice(0, 6) : "N/A";

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20 transition-colors">
            <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">

                {/* 1. Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-6 md:mb-8 font-medium overflow-x-auto whitespace-nowrap no-scrollbar">
                    <Link href="/shop" className="hover:text-blue-600 transition-colors">Pharmacy</Link>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                    <span className="text-blue-600 font-semibold truncate">{medicine.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">

                    <div className="lg:col-span-6 flex flex-col md:grid md:grid-cols-12 gap-4">

                        {/* Main Image Display */}
                        <div className="order-1 md:order-2 md:col-span-10">
                            <div
                                ref={containerRef}
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={() => setIsHovered(!isHovered)}
                                className="relative aspect-square w-full bg-white border border-slate-200 dark:border-slate-800 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm md:cursor-zoom-in"
                            >
                                <Image
                                    src={medicine.images?.[selectedImage] || "/placeholder.png"}
                                    alt={medicine.name}
                                    fill priority
                                    className={`object-contain p-6 md:p-10 transition-transform duration-300 ${isHovered ? 'scale-[2.2]' : 'scale-100'}`}
                                    style={{ transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }}
                                />
                                {isHovered && (
                                    <div className="absolute bottom-4 right-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded md:hidden">
                                        Pinch to zoom / Click to reset
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Thumbnail Gallery: Horizontal on Mobile, Vertical on Desktop */}
                        <div className="order-2 md:order-1 md:col-span-2 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 no-scrollbar">
                            {medicine.images?.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`relative flex-shrink-0 w-16 h-16 md:w-full md:aspect-square rounded-xl overflow-hidden border-2 bg-white p-1 transition-all ${selectedImage === idx ? 'border-blue-600 shadow-sm ring-2 ring-blue-50' : 'border-slate-100 hover:border-blue-300'}`}
                                >
                                    <Image src={img} alt={`thumb-${idx}`} fill className="object-contain p-1" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Info & Buying */}
                    <div className="lg:col-span-6 space-y-6 md:space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Top Rated</span>
                                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">SKU: MED-{medicineId}</span>
                            </div>
                            <h1 className="text-2xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{medicine.name}</h1>
                            <p className="text-blue-600 font-bold text-base md:text-lg">Manufacturer: {medicine.manufacturer}</p>

                            <div className="flex items-center gap-4 py-2 border-y border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg border border-amber-100 dark:border-amber-800">
                                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    <span className="text-amber-700 dark:text-amber-400 font-black">{averageRating}</span>
                                </div>
                                <span className="text-slate-500 font-medium text-xs md:text-sm underline decoration-slate-300 underline-offset-4 cursor-pointer">
                                    {totalReviews} Verified Reviews
                                </span>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl md:text-5xl font-black text-blue-600">৳{medicine.price}</span>
                                </div>

                                <div className="flex items-center justify-between text-green-600 font-bold bg-green-50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-100 dark:border-green-900/30">
                                    <div className="flex items-center gap-3 text-sm md:text-base">
                                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                                        <span>In Stock - Fast Delivery</span>
                                    </div>
                                    <Zap className="w-4 h-4 md:w-5 md:h-5 fill-amber-400 text-amber-400 animate-pulse" />
                                </div>

                                {/* Updated Button with Blue & Green Gradient */}
                                <Button
                                    size="lg"
                                    onClick={() => dispatch(addToCart({
                                        medicine: { ...medicine, createdAt: String(medicine.createdAt), updatedAt: String(medicine.updatedAt) },
                                        quantity: 1
                                    }))}
                                    className="w-full h-14 md:h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-black text-lg md:text-xl shadow-lg transition-all active:scale-[0.98]"
                                >
                                    <ShoppingCart className="mr-3 h-5 w-5 md:h-6 md:w-6 stroke-[3px]" /> Add to Shopping Bag
                                </Button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl md:rounded-2xl">
                                    <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                                </div>
                                <span className="text-[10px] md:text-xs font-black text-slate-700 dark:text-slate-300 uppercase leading-tight">100% Genuine<br />Product</span>
                            </div>
                            <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                <div className="p-2 md:p-3 bg-green-50 dark:bg-green-900/20 rounded-xl md:rounded-2xl">
                                    <Award className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                                </div>
                                <span className="text-[10px] md:text-xs font-black text-slate-700 dark:text-slate-300 uppercase leading-tight">Pharma Grade<br />Certified</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- REVIEWS & STATS SECTION --- */}
                <div className="mt-16 md:mt-24 border-t border-slate-200 dark:border-slate-800 pt-12 md:pt-16">
                    <div className="flex items-center gap-4 mb-8 md:mb-12">
                        <div className="p-2.5 md:p-3 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl md:rounded-2xl shadow-lg">
                            <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Customer Reviews</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

                        {/* Rating Distribution Card */}
                        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm h-fit">
                            <div className="text-center mb-8 md:mb-10">
                                <p className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white">{averageRating}</p>
                                <div className="flex justify-center my-3 text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 md:w-6 md:h-6 ${i < Math.round(averageRating) ? "fill-current" : "text-slate-200"}`} />
                                    ))}
                                </div>
                                <p className="text-slate-500 font-bold text-xs tracking-wide uppercase">Based on {totalReviews} Reviews</p>
                            </div>

                            <div className="space-y-4">
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div key={star} className="flex items-center gap-3 md:gap-4 text-xs md:text-sm font-bold">
                                        <span className="w-4 text-slate-600">{star}</span>
                                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                                        <div className="flex-1 h-2 md:h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600 transition-all duration-1000"
                                                style={{ width: `${totalReviews > 0 ? (starCounts[star as keyof typeof starCounts] / totalReviews) * 100 : 0}%` }}
                                            />
                                        </div>
                                        <span className="w-8 text-slate-400 text-right">{starCounts[star as keyof typeof starCounts]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Customer Reviews List */}
                        <div className="lg:col-span-2 space-y-4 md:space-y-6">
                            {medicine.reviews && medicine.reviews.length > 0 ? (
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                medicine.reviews.map((review: any) => (
                                    <div key={review.id} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-blue-100 transition-all group">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden">
                                                    {review.user?.image ? (
                                                        <Image src={review.user.image} alt="user" width={48} height={48} className="object-cover" />
                                                    ) : (
                                                        <User className="text-slate-400 w-5 h-5 md:w-6 md:h-6" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 dark:text-white text-base md:text-lg">{review.user?.name || "Verified Customer"}</p>
                                                    <div className="flex gap-1 text-amber-500">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={`w-3 h-3 md:w-3.5 md:h-3.5 ${i < review.rating ? "fill-current" : "text-slate-200"}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full w-fit">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(review.createdat).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="relative pl-4">
                                            <span className="absolute -top-3 -left-1 text-4xl md:text-6xl text-slate-100 dark:text-slate-800 font-serif pointer-events-none group-hover:text-blue-50 transition-colors">“</span>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed font-medium relative z-10">
                                                {review.comment}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-16 md:py-24 bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                                    <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-500 font-black text-lg md:text-xl">No reviews yet.</p>
                                    <p className="text-slate-400 text-xs md:text-sm mt-2 font-medium">Be the first to share your experience!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar CSS */}
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}

