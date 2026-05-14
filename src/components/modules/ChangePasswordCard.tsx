"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import * as z from "zod";
import { toastApiFlattenedErrors, toastZodIssues } from "@/lib/validation-toasts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const changeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirm: z.string().min(1, "Confirm your new password"),
  })
  .refine((d) => d.newPassword === d.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export function ChangePasswordCard() {
  const [currentPassword, setCurrent] = useState("");
  const [newPassword, setNew] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = changeSchema.safeParse({ currentPassword, newPassword, confirm });
    if (!parsed.success) {
      toastZodIssues(parsed.error);
      return;
    }

    setLoading(true);
    const id = toast.loading("Updating password...");
    try {
      const res = await fetch("/api/v1/auth/change-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: parsed.data.currentPassword,
          newPassword: parsed.data.newPassword,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        message?: string;
        errors?: { formErrors?: string[]; fieldErrors?: Record<string, string[] | undefined> };
      };
      if (!res.ok) {
        if (json.errors) toastApiFlattenedErrors(json.errors);
        else toast.error(json.message || "Could not change password", { id });
        return;
      }
      toast.success(json.message || "Password changed successfully", { id });
      setCurrent("");
      setNew("");
      setConfirm("");
      router.refresh();
    } catch {
      toast.error("Something went wrong", { id });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 shadow-xl">
      <div className="flex items-center gap-2 mb-2">
        <Lock className="size-5 text-blue-600" />
        <h3 className="text-xl font-black text-slate-900 dark:text-white">Change password</h3>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Use your current password, then choose a new one that matches MediStore rules (6+ chars, one
        lowercase letter, one number).
      </p>
      <form onSubmit={submit} className="grid gap-4 max-w-lg">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">
            Current password
          </label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrent(e.target.value)}
            autoComplete="current-password"
            className="rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">
            New password
          </label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNew(e.target.value)}
            autoComplete="new-password"
            className="rounded-xl"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">
            Confirm new password
          </label>
          <Input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            className="rounded-xl"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto rounded-2xl font-black uppercase tracking-widest"
        >
          {loading ? <Loader2 className="animate-spin size-5" /> : "Update password"}
        </Button>
      </form>
    </div>
  );
}
