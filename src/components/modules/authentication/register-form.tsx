"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, Toaster } from "sonner";
import { Camera, Chrome } from "lucide-react";

const registerSchema = z.object({
    name: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    role: z.enum(["CUSTOMER", "SELLER"]),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    profileImage: z.any().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { role: "CUSTOMER" }
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: RegisterFormValues) => {
        setLoading(true);
        console.log("Form Data:", data);
        setTimeout(() => {
            toast.success("Registration Successful!");
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border-t-8 border-blue-600 w-full max-w-lg mx-auto transition-all duration-300">
            <Toaster richColors position="top-center" />

            {/* Profile Logo & Header */}
            <div className="text-center mb-6">
                <div className="flex flex-col items-center gap-3 mb-2">
                    <div className="relative w-20 h-20 shadow-xl rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 bg-white">
                        <Image
                            src="/logo.png"
                            alt="MediStore Logo"
                            fill
                            className="object-contain p-1"
                        />
                    </div>
                    <h2 className="text-4xl font-black tracking-tight">
                        <span className="text-blue-600">Medi</span><span className="text-green-600">Store</span>
                    </h2>
                </div>
                <p className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-green-600 bg-clip-text text-transparent italic">
                    Create Your Account
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Photo Upload Section */}
                <div className="flex flex-col items-center mb-6">
                    <label className="relative group cursor-pointer">
                        <div className={`w-24 h-24 rounded-full border-4 border-double ${imagePreview ? 'border-green-500' : 'border-blue-600'} flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-800 shadow-inner group-hover:opacity-80 transition-all`}>
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <Camera className="text-blue-600 dark:text-blue-400" size={32} />
                            )}
                        </div>
                        <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow-lg border-2 border-white dark:border-slate-900">
                            <Camera size={14} />
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                    <span className="text-[10px] mt-2 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Profile Photo <span className="text-red-500">*</span></span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Full Name <span className="text-red-500">*</span></label>
                        <input {...register("name")} className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-600 outline-none dark:text-slate-100" placeholder="Enter Your Name" required />
                        {errors.name && <p className="text-red-500 text-[10px]">{errors.name.message}</p>}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address <span className="text-red-500">*</span></label>
                        <input {...register("email")} type="email" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-green-600 outline-none dark:text-slate-100" placeholder="Enter Your Email" required />
                        {errors.email && <p className="text-red-500 text-[10px]">{errors.email.message}</p>}
                    </div>
                </div>

                {/* Join As */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Join As <span className="text-red-500">*</span></label>
                    <select {...register("role")} className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-600 outline-none dark:text-slate-100 font-medium">
                        <option value="CUSTOMER" className="dark:bg-slate-800">Customer (Default)</option>
                        <option value="SELLER" className="dark:bg-slate-800">Seller</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Password <span className="text-red-500">*</span></label>
                        <input {...register("password")} type="password" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-green-600 outline-none dark:text-slate-100" placeholder="At least 8 digits" required />
                        {errors.password && <p className="text-red-500 text-[10px]">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Confirm Password <span className="text-red-500">*</span></label>
                        <input {...register("confirmPassword")} type="password" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-green-600 outline-none dark:text-slate-100" placeholder="Confirm Password" required />
                        {errors.confirmPassword && <p className="text-red-500 text-[10px]">{errors.confirmPassword.message}</p>}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-4">
                    <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90 text-white p-3.5 rounded-xl font-black text-lg shadow-xl transition-all transform active:scale-95 disabled:grayscale">
                        {loading ? "Processing..." : "REGISTER NOW"}
                    </button>

                    <div className="relative flex items-center py-1">
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                        <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold">OR JOIN WITH</span>
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                    </div>

                    <button type="button" className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center gap-3 p-3 rounded-xl hover:shadow-lg transition-all group active:scale-95">
                        <Chrome className="text-red-500" size={20} />
                        <span className="font-bold bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">
                            Login with Google
                        </span>
                    </button>
                </div>
            </form>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-8 font-medium">
                Already have an account? <Link href="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Log In</Link>
            </p>
        </div>
    );
}