"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Banner() {
    return (
        <div className="relative w-full h-[400px] md:h-[600px] lg:h-[650px] overflow-hidden bg-[#f0f9ff]">
            {/* Background Image - Optimized Zoom & Position */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/image1.png"
                    alt="MediStore Premium Banner"
                    fill
                    priority
                    className="object-contain md:object-cover object-right md:object-center transition-transform duration-700 hover:scale-105"
                />
            </div>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent md:from-white/70" />

            <div className="relative z-10 container mx-auto h-full flex items-center px-4 md:px-16">
                <div className="max-w-full md:max-w-3xl space-y-4 md:space-y-8">

                    {/* Badge - Responsive Padding */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-blue-50 border-l-4 border-blue-600 text-blue-800 text-[10px] md:text-sm font-bold tracking-wide uppercase shadow-sm">
                        <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-green-500 animate-pulse" />
                        <span>Premium Healthcare Experience</span>
                    </div>

                    {/* Headline - Responsive Font Sizes */}
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.1]">
                            Smart Care for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-green-600">
                                A Better Life
                            </span>
                        </h1>
                        <div className="h-1.5 md:h-2 w-20 md:w-32 bg-green-500 rounded-full" />
                    </div>

                    {/* Description - Hidden or smaller on very small screens if needed */}
                    <p className="text-sm sm:text-lg md:text-2xl text-slate-700 max-w-sm md:max-w-xl font-medium leading-relaxed">
                        Your health is our ultimate priority. Get <span className="text-blue-700 font-bold">100% Genuine</span> medicines delivered with speed.
                    </p>

                    {/* Buttons - Mobile Full Width or Flex Gap */}
                    {/* <div className="flex flex-col sm:flex-row gap-3 md:gap-5 pt-2 md:pt-4">
                        <Link href="#medicine-home" className="w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="w-full group text-base md:text-lg px-8 md:px-12 py-6 md:py-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl md:rounded-2xl shadow-lg transition-all hover:-translate-y-1 font-bold"
                            >
                                <ShoppingBag className="mr-2 w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                                Order Now
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto text-base md:text-lg px-8 md:px-10 py-6 md:py-8 rounded-xl md:rounded-2xl border-2 border-green-500 text-green-700 hover:bg-green-50 font-bold shadow-sm transition-all hover:border-blue-600"
                        >
                            Details
                            <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />
                        </Button>
                    </div> */}

                    {/* Trust Factors - Responsive Layout */}
                    <div className="pt-4 md:pt-6 flex flex-wrap gap-4 md:gap-8 items-center text-slate-500 font-semibold text-[10px] md:text-sm uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            24/7 Support
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            Expert Help
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-400" />
                            Fast Delivery
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}