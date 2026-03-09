"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { ShoppingCart, Star, Zap, ChevronRight, Lock, CheckCircle2, ShieldCheck, Award, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addToCart } from "@/store/slice/cartSlice";
import { useState, useRef, useEffect, useCallback } from "react";
import { Medicine } from "@/types/medicine.type";
import { fetchMedicineById } from "@/actions/medicine.action"; // নিশ্চিত করুন এই পাথটি সঠিক

export default function MedicineDetails() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    // States
    const [medicine, setMedicine] = useState<Medicine | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // ১. ব্যাকএন্ড থেকে ডাটা লোড করার ফাংশন
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

    useEffect(() => {
        loadMedicine();
    }, [loadMedicine]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;
        setZoomPos({ x, y });
    };

    // ২. লোডিং স্টেট (ডাটা আসার আগ পর্যন্ত দেখাবে)
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <p className="text-slate-500 font-bold animate-pulse">Fetching medicine details...</p>
            </div>
        );
    }

    // ৩. ডাটা না পাওয়া গেলে এরর স্টেট
    if (!medicine) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-bold text-red-600">Medicine Not Found</h1>
                <Link href="/shop" className="px-6 py-2 bg-blue-600 text-white rounded-lg">Back to Shop</Link>
            </div>
        );
    }

    // ৪. ডাইনামিক ডাটা লজিক (নিশ্চিত করুন medicine.images একটি অ্যারে)
    const averageRating = medicine.averageRating ?? 4.5;
    const totalReviews = medicine.totalReviews ?? 12;
    const currentMainImage = medicine.images && medicine.images.length > 0
        ? medicine.images[selectedImage]
        : "/placeholder.png";

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors pb-10">
            <div className="container mx-auto px-4 py-6 md:px-8">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-1 text-[13px] text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
                    <Link href="/shop" className="hover:text-blue-600">Medicines</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{medicine.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Column 1: Thumbnails */}
                    <div className="hidden lg:flex lg:col-span-1 flex-col gap-3">
                        {medicine.images?.map((img, idx) => (
                            <div
                                key={idx}
                                onMouseEnter={() => setSelectedImage(idx)}
                                className={`w-16 h-16 border-2 rounded-xl p-1 cursor-pointer transition-all bg-white ${selectedImage === idx ? 'border-blue-600 ring-2 ring-blue-50 shadow-md' : 'border-slate-200 dark:border-slate-800'}`}
                            >
                                <Image src={img} alt="thumb" width={60} height={60} className="object-contain w-full h-full" />
                            </div>
                        ))}
                    </div>

                    {/* Column 2: Main Image with Zoom */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                        <div
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="relative aspect-square w-full bg-white border border-slate-100 dark:border-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm cursor-zoom-in"
                        >
                            <Image
                                src={currentMainImage}
                                alt={medicine.name}
                                fill
                                priority
                                className={`object-contain p-8 transition-transform duration-200 ${isHovered ? 'scale-[2.3]' : 'scale-100'}`}
                                style={{ transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }}
                            />
                        </div>

                        {/* Mobile Thumbnails */}
                        <div className="flex lg:hidden gap-3 mt-6 overflow-x-auto w-full pb-2">
                            {medicine.images?.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`min-w-[70px] h-20 border-2 rounded-xl p-1 flex-shrink-0 bg-white ${selectedImage === idx ? 'border-blue-600 shadow-md' : 'border-slate-200'}`}
                                >
                                    <Image src={img} alt="thumb" width={70} height={70} className="object-contain w-full h-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Info & Price */}
                    <div className="lg:col-span-6 grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-2 space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                    {medicine.name}
                                </h1>
                                <p className="text-blue-600 font-bold text-sm tracking-wide">
                                    Brand: {medicine.manufacturer}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
                                <div className="flex text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(averageRating) ? "fill-current" : "text-slate-300"}`} />
                                    ))}
                                </div>
                                <span className="text-sm font-black text-slate-400">
                                    {averageRating} | <span className="text-blue-600 hover:underline cursor-pointer">{totalReviews} Reviews</span>
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="bg-green-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-sm uppercase tracking-tighter">Certified Product</span>
                                    <span className="text-sm font-bold text-slate-500">Category: <span className="text-blue-600">{medicine.category?.name || "Medicine"}</span></span>
                                </div>
                                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    {medicine.description}
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl text-blue-600 text-xs font-bold border border-blue-100 dark:border-blue-800">
                                    <ShieldCheck className="w-4 h-4" /> 100% Genuine
                                </div>
                                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl text-green-600 text-xs font-bold border border-green-100 dark:border-green-800">
                                    <Award className="w-4 h-4" /> Pharma Grade
                                </div>
                            </div>
                        </div>

                        {/* Price Card */}
                        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-6 h-fit sticky top-6 space-y-6 shadow-xl bg-white dark:bg-slate-900 ring-4 ring-slate-50 dark:ring-slate-800/50">
                            <div>
                                <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-1">Selling Price</p>
                                <div className="flex items-baseline gap-1 text-blue-600">
                                    <span className="text-xl font-bold">৳</span>
                                    <span className="text-5xl font-black tracking-tighter">{medicine.price}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-green-600 text-xl font-black flex items-center gap-1.5">
                                        <CheckCircle2 className="w-5 h-5" /> In Stock
                                    </p>
                                    <Zap className="w-5 h-5 fill-amber-400 text-amber-400 animate-pulse" />
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button
                                    onClick={() => dispatch(addToCart({
                                        medicine: { ...medicine, createdAt: String(medicine.createdAt), updatedAt: String(medicine.updatedAt) },
                                        quantity: 1
                                    }))}
                                    className="w-full h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-green-600 text-white text-lg font-black shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-[0.97] border-none"
                                >
                                    <ShoppingCart className="w-5 h-5 mr-3 stroke-[3px]" />
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}