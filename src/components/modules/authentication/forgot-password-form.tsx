"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import * as z from "zod";
import { isAllowedMailboxEmail } from "@/lib/email-policy";
import { toastApiFlattenedErrors, toastZodIssues } from "@/lib/validation-toasts";

const schema = z
  .string()
  .email("Invalid email address")
  .refine((e) => isAllowedMailboxEmail(e), {
    message:
      "Use a real email provider (temporary or disposable addresses are not allowed)",
  });

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(email);
    if (!parsed.success) {
      toastZodIssues(parsed.error);
      return;
    }

    setLoading(true);
    const id = toast.loading("Sending reset link...");
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const res = await fetch("/api/v1/auth/forget-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: parsed.data,
          redirectTo: `${origin}/reset-password`,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        message?: string;
        errors?: { formErrors?: string[]; fieldErrors?: Record<string, string[] | undefined> };
      };
      if (!res.ok) {
        if (json.errors) toastApiFlattenedErrors(json.errors);
        else toast.error(json.message || "Request failed", { id });
        return;
      }
      toast.success(json.message || "Check your email for reset instructions.", { id });
    } catch {
      toast.error("Something went wrong", { id });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-md mx-auto">
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 mb-6 hover:underline"
      >
        <ArrowLeft className="size-4" /> Back to login
      </Link>
      <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Forgot password</h1>
      <p className="text-sm text-slate-500 mb-6">
        Enter the email on your account. If it exists, we will send reset instructions.
      </p>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1 mb-1">
            <Mail className="size-3.5" /> Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin size-5" /> : "Send reset link"}
        </button>
      </form>
    </div>
  );
}
