"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, Toaster } from "sonner";
import { Chrome, Lock, Mail } from "lucide-react";

const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        setLoading(true);
        console.log("Login Data:", data);
        // Backend connection logic here
        setTimeout(() => {
            toast.success("Login Successful!");
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border-b-8 border-green-600 w-full max-w-md mx-auto transition-all duration-300">
            <Toaster richColors position="top-center" />

            {/* Profile Logo & Header */}
            <div className="text-center mb-8">
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
                <p className="text-lg font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent italic">
                    Welcome Back!
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Email Address */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-1">
                        <Mail size={14} /> Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-600 outline-none dark:text-slate-100 transition-all"
                        placeholder="Enter Your Email"
                        required
                    />
                    {errors.email && <p className="text-red-500 text-[10px]">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            <Lock size={14} /> Password <span className="text-red-500">*</span>
                        </label>
                        <Link href="#" className="text-[10px] text-blue-600 font-bold hover:underline">Forgot Password?</Link>
                    </div>
                    <input
                        {...register("password")}
                        type="password"
                        className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-green-600 outline-none dark:text-slate-100 transition-all"
                        placeholder="••••••••"
                        required
                    />
                    {errors.password && <p className="text-red-500 text-[10px]">{errors.password.message}</p>}
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90 text-white p-4 rounded-xl font-black text-lg shadow-xl transition-all transform active:scale-95 disabled:grayscale"
                    >
                        {loading ? "Logging in..." : "LOGIN NOW"}
                    </button>

                    <div className="relative flex items-center py-1">
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                        <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase">Or Continue With</span>
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                    </div>

                    <button
                        type="button"
                        className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center gap-3 p-3.5 rounded-xl hover:shadow-lg transition-all group active:scale-95"
                    >
                        <Chrome className="text-red-500" size={20} />
                        <span className="font-bold bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">
                            Login with Google
                        </span>
                    </button>
                </div>
            </form>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-10 font-medium">
                New to MediStore? <Link href="/register" className="text-green-600 dark:text-green-400 font-bold hover:underline decoration-2">Create Account</Link>
            </p>
        </div>
    );
}