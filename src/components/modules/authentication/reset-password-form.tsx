"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Lock, ArrowLeft } from "lucide-react";
import * as z from "zod";
import { toastApiFlattenedErrors, toastZodIssues } from "@/lib/validation-toasts";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const formSchema = z
  .object({
    newPassword: passwordSchema,
    confirm: z.string().min(1, "Confirm your new password"),
  })
  .refine((d) => d.newPassword === d.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

function ResetPasswordInner() {
  const searchParams = useSearchParams();
  const token =
    searchParams.get("token") ??
    searchParams.get("resetToken") ??
    "";

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse({ newPassword, confirm });
    if (!parsed.success) {
      toastZodIssues(parsed.error);
      return;
    }
    if (!token) {
      toast.error("Missing reset token. Open the link from your email.");
      return;
    }

    setLoading(true);
    const id = toast.loading("Updating password...");
    try {
      const res = await fetch("/api/v1/auth/reset-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: parsed.data.newPassword }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        message?: string;
        errors?: { formErrors?: string[]; fieldErrors?: Record<string, string[] | undefined> };
      };
      if (!res.ok) {
        if (json.errors) toastApiFlattenedErrors(json.errors);
        else toast.error(json.message || "Reset failed", { id });
        return;
      }
      toast.success(json.message || "Password updated. You can sign in now.", { id });
      setNewPassword("");
      setConfirm("");
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
      <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Reset password</h1>
      <p className="text-sm text-slate-500 mb-6">
        Choose a new password for your MediStore account.
      </p>
      {!token && (
        <p className="text-sm text-amber-600 font-bold mb-4">
          No token in the URL. Use the reset link from your email, or request a new one from Forgot
          password.
        </p>
      )}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1 mb-1">
            <Lock className="size-3.5" /> New password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="new-password"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 block">
            Confirm password
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !token}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin size-5" /> : "Update password"}
        </button>
      </form>
    </div>
  );
}

export function ResetPasswordForm() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center font-bold text-slate-400">Loading reset form…</div>
      }
    >
      <ResetPasswordInner />
    </Suspense>
  );
}
