"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client";
import { zodValidator } from "@tanstack/zod-form-adapter";
import * as z from "zod";
import { toast, Toaster } from "sonner";
import { Chrome, Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // TanStack Form Setup
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      setLoading(true);
      const toastId = toast.loading("Logging in to MediStore...");

      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: "/",
        });

        if (error) {
          toast.error(error.message || "Login failed", { id: toastId });
          return;
        }

        toast.success("Welcome back!", { id: toastId });
        router.push("/");
        router.refresh();
      } catch (err: unknown) {
        toast.error("An unexpected error occurred", { id: toastId });
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border-b-8 border-green-600 w-full max-w-md mx-auto transition-all duration-300">
      <Toaster richColors position="top-center" />

      <div className="text-center mb-8">
        <div className="flex flex-col items-center gap-3 mb-2">
          <div className="relative w-20 h-20 shadow-xl rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 bg-white">
            <Image src="/logo.png" alt="Logo" fill className="object-contain p-1" />
          </div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            <span className="text-blue-600">Medi</span><span className="text-green-600">Store</span>
          </h2>
        </div>
        <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent italic">
          Secure Login
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        <form.Field name="email" validators={{ onChange: loginSchema.shape.email }}>
          {(field) => (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-1">
                <Mail size={14} /> Email Address
              </label>
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="email"
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-600 outline-none dark:text-slate-100 transition-all"
                placeholder="Enter Your Email"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-[10px] font-bold mt-1">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Password Field */}
        <form.Field name="password" validators={{ onChange: loginSchema.shape.password }}>
          {(field) => (
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Lock size={14} /> Password
                </label>
                <Link href="#" className="text-[10px] text-blue-600 font-bold hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-green-600 outline-none dark:text-slate-100 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-[10px] font-bold mt-1">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <div className="space-y-4 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-xl font-black text-lg shadow-xl active:scale-95 disabled:grayscale flex justify-center items-center transition-all"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "LOGIN NOW"}
          </button>

          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase">OR</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
          </div>

          <button
            type="button"
            onClick={async () => {
              await authClient.signIn.social({ provider: "google", callbackURL: "http://localhost:3000" });
            }}
            className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center gap-3 p-3.5 rounded-xl hover:shadow-lg transition-all active:scale-95"
          >
            <Chrome className="text-red-500" size={20} />
            <span className="font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
              Login with Google
            </span>
          </button>
        </div>
      </form>

      <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-10 font-medium">
        New to MediStore? <Link href="/register" className="text-green-600 font-bold hover:underline">Create Account</Link>
      </p>
    </div>
  );
}





