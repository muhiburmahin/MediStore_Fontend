"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { authClient } from "@/lib/auth-client";
import * as z from "zod";
import { toast, Toaster } from "sonner";
import {
  Chrome,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Loader2,
  Camera
} from "lucide-react";
import { useRouter } from "next/navigation";

// schima velidation
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["CUSTOMER", "SELLER"]),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "CUSTOMER" as "CUSTOMER" | "SELLER",
    } as RegisterFormValues,

    //validatorAdapter: zodValidator(),
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      const toastId = toast.loading("Creating account...");
      try {
        const { error } = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name,
          callbackURL: "/",
        });

        if (error) {
          toast.error(error.message || "Registration failed", { id: toastId });
        } else {
          toast.success(`Welcome ${value.name}! Registration Successful.`, { id: toastId });
          router.push("/login");
        }
      } catch (err) {
        toast.error("An unexpected error occurred", { id: toastId });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border-t-8 border-blue-600 w-full max-w-lg mx-auto transition-all duration-300">
      <Toaster richColors position="top-center" />

      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex flex-col items-center gap-3 mb-2">
          <div className="relative w-20 h-20 shadow-xl rounded-2xl overflow-hidden border-2 border-slate-100 bg-white">
            <Image src="/logo.png" alt="Logo" fill className="object-contain p-1" />
          </div>
          <h2 className="text-4xl font-black tracking-tight">
            <span className="text-blue-600">Medi</span><span className="text-green-500">Store</span>
          </h2>
        </div>
        <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent italic">
          Create Your Account
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Photo Upload */}
        <div className="flex flex-col items-center mb-6">
          <label className="relative cursor-pointer group">
            <div className={`w-24 h-24 rounded-full border-4 border-double ${imagePreview ? 'border-green-500' : 'border-blue-600'} flex items-center justify-center overflow-hidden bg-slate-50 shadow-inner group-hover:opacity-80 transition-all`}>
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <Camera className="text-blue-600" size={32} />
              )}
            </div>
            <input type="file" className="hidden" onChange={handleImageChange} />
          </label>
          <span className="text-[10px] mt-2 text-slate-500 font-bold uppercase tracking-widest">Profile Photo</span>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name="name">
            {(field) => (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-1">
                  <User size={14} className="text-blue-600" /> Full Name
                </label>
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
                {field.state.meta.errors && <p className="text-red-500 text-[10px] font-bold uppercase">{field.state.meta.errors.join(", ")}</p>}
              </div>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-1">
                  <Mail size={14} className="text-blue-600" /> Email Address
                </label>
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="mail@example.com"
                />
                {field.state.meta.errors && <p className="text-red-500 text-[10px] font-bold uppercase">{field.state.meta.errors.join(", ")}</p>}
              </div>
            )}
          </form.Field>
        </div>

        {/* Role Selector */}
        <form.Field name="role">
          {(field) => (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Join As</label>
              <select
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as "CUSTOMER" | "SELLER")}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none font-medium"
              >
                <option value="CUSTOMER">Customer (Buy Medicines)</option>
                <option value="SELLER">Seller (Shop Owner)</option>
              </select>
            </div>
          )}
        </form.Field>

        {/* Password Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field name="password">
            {(field) => (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-1">
                  <Lock size={14} className="text-blue-600" /> Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {field.state.meta.errors && <p className="text-red-500 text-[10px] font-bold uppercase">{field.state.meta.errors.join(", ")}</p>}
              </div>
            )}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Confirm Password</label>
                <input
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                {field.state.meta.errors && <p className="text-red-500 text-[10px] font-bold uppercase">{field.state.meta.errors.join(", ")}</p>}
              </div>
            )}
          </form.Field>
        </div>

        {/* Buttons */}
        <div className="space-y-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white p-3.5 rounded-xl font-black text-lg shadow-xl active:scale-95 disabled:grayscale flex justify-center items-center transition-all"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "REGISTER NOW"}
          </button>

          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase">Or Join With</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
          </div>

          <button
            type="button"
            onClick={async () => await authClient.signIn.social({ provider: "google", callbackURL: "http://localhost:3000" })}
            className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center gap-3 p-3 rounded-xl active:scale-95 hover:bg-slate-50 transition-all group"
          >
            <Chrome className="text-red-500 group-hover:rotate-12 transition-transform" size={20} />
            <span className="font-bold text-slate-700 dark:text-slate-200">Continue with Google</span>
          </button>
        </div>
      </form>

      <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-8 font-medium">
        Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline underline-offset-4">Log In</Link>
      </p>
    </div>
  );
}