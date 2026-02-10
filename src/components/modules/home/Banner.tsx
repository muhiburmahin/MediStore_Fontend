import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Banner() {
    return (
        <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden bg-[#f8fafc]">
            <Image
                src="/image1.png"
                alt="MediStore Premium Banner"
                fill
                priority
                className="object-cover object-right md:object-center opacity-95"
            />

            {/* Brand-aligned soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-transparent md:from-white/50" />

            <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-6 md:px-16">
                <div className="max-w-3xl space-y-6 md:space-y-8">

                    {/* Unique Badge Design */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border-l-4 border-blue-600 text-blue-800 text-xs md:text-sm font-bold tracking-wide uppercase shadow-sm">
                        <Sparkles className="w-4 h-4 text-green-500 animate-pulse" />
                        <span>Premium Healthcare Experience</span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-none">
                            Smart Care for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-600">
                                A Better Life
                            </span>
                        </h1>
                        <div className="h-2 w-32 bg-green-500 rounded-full md:mt-2" />
                    </div>

                    <p className="text-lg md:text-2xl text-slate-700 max-w-xl font-medium leading-relaxed">
                        Your health is our ultimate priority. Get <span className="text-blue-700 font-bold">100% Genuine</span> medicines and healthcare essentials delivered with speed and care.
                    </p>

                    <div className="flex flex-wrap gap-5 pt-4">
                        <Link href="#medicine-home">
                            <Button
                                size="lg"
                                className="group text-lg px-12 py-8 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-1 font-bold"
                            >
                                <ShoppingBag className="mr-2 w-6 h-6 group-hover:scale-110 transition-transform" />
                                Order Now
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            size="lg"
                            className="text-lg px-10 py-8 rounded-2xl border-2 border-green-500 text-green-700 hover:bg-green-50 font-bold shadow-md transition-all hover:border-blue-600 hover:text-blue-700"
                        >
                            View Details
                            <ArrowRight className="ml-2 w-6 h-6" />
                        </Button>
                    </div>

                    {/* Trust Factors in English */}
                    <div className="pt-6 flex gap-8 items-center text-slate-500 font-semibold text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            24/7 Support
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            Expert Consultation
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-400" />
                            Fast Delivery
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}