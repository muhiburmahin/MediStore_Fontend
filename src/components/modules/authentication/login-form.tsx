"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { Chrome, Lock, Mail, Eye, EyeOff, Loader2, Shield, Store, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { isAllowedMailboxEmail } from "@/lib/email-policy";
import { toastApiFlattenedErrors, toastZodIssues } from "@/lib/validation-toasts";
import { DEMO_LOGIN } from "@/lib/demo-accounts";
import { dashboardHrefForRole } from "@/lib/dashboard-routes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const mailboxEmail = z
  .string()
  .email("Your email is not correct.")
  .refine((e) => isAllowedMailboxEmail(e), {
    message: "Your email is not correct.",
  });

const loginSchema = z.object({
  email: mailboxEmail,
  password: z.string().min(1, "Password is required"),
});

async function postAuthJson(path: string, body: unknown) {
  const res = await fetch(path, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
    data?: { user?: { role?: string } };
    errors?: { formErrors?: string[]; fieldErrors?: Record<string, string[] | undefined> };
  };
  return { res, json };
}

const inputClass =
  "flex h-11 w-full rounded-md border border-input bg-background/90 px-3 py-2 text-sm ring-offset-background transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900/80";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const err = params.get("error");
    if (err) {
      toast.error(decodeURIComponent(err.replace(/\+/g, " ")));
      const u = new URL(window.location.href);
      u.searchParams.delete("error");
      window.history.replaceState({}, "", `${u.pathname}${u.search}`);
    }
    if (params.get("verify") === "1") {
      toast.info("Please verify your email first", {
        description: "We sent a link to your inbox. After verifying, you can sign in.",
      });
      const u = new URL(window.location.href);
      u.searchParams.delete("verify");
      window.history.replaceState({}, "", `${u.pathname}${u.search}`);
    }
    if (params.get("registered") === "1") {
      toast.success("Registration successful");
      const u = new URL(window.location.href);
      u.searchParams.delete("registered");
      window.history.replaceState({}, "", `${u.pathname}${u.search}`);
    }
    if (params.get("verified") === "1" || params.get("verified") === "true") {
      toast.success("Email verified", {
        description: "You can sign in with your email and password now.",
      });
      const u = new URL(window.location.href);
      u.searchParams.delete("verified");
      window.history.replaceState({}, "", `${u.pathname}${u.search}`);
    }
  }, []);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const parsed = loginSchema.safeParse(value);
      if (!parsed.success) {
        toastZodIssues(parsed.error);
        return;
      }

      setLoading(true);
      const toastId = toast.loading("Signing you in…");

      try {
        const { res, json } = await postAuthJson("/api/v1/auth/login", {
          email: parsed.data.email,
          password: parsed.data.password,
        });

        if (!res.ok) {
          if (json.errors) toastApiFlattenedErrors(json.errors);
          else toast.error(json.message || "Login failed", { id: toastId });
          return;
        }

        toast.success("Signed in successfully.", { id: toastId });
        let role = json.data?.user?.role as string | undefined;
        if (!role) {
          try {
            const meRes = await fetch("/api/v1/auth/me", { credentials: "include" });
            const meJson = (await meRes.json().catch(() => ({}))) as { data?: { role?: string } };
            role = meJson.data?.role;
          } catch {
            /* ignore */
          }
        }
        router.push(dashboardHrefForRole(role));
        router.refresh();
      } catch {
        toast.error("Something went wrong. Try again.", { id: toastId });
      } finally {
        setLoading(false);
      }
    },
  });

  const applyDemo = (key: keyof typeof DEMO_LOGIN) => {
    const d = DEMO_LOGIN[key];
    form.setFieldValue("email", d.email);
    form.setFieldValue("password", d.password);
    toast.message(`${d.title} demo applied`, { description: "Press Sign in to continue." });
  };

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-sky-500/15 via-white to-emerald-500/20 p-[1px] shadow-2xl shadow-blue-500/10 dark:from-sky-900/30 dark:via-slate-950 dark:to-emerald-900/20 dark:border-slate-700/50">
      <Card className="rounded-[22px] border-0 bg-card/95 shadow-none backdrop-blur-sm dark:bg-slate-950/90">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto relative size-16 overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 shadow-inner">
            <Image src="/logo.png" alt="MediStore" fill className="object-contain p-1.5" priority />
          </div>
          <div className="space-y-1">
            <CardTitle className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
              Sign in to MediStore
            </CardTitle>
            <CardDescription>Welcome back — use your account email and password.</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="login-email" className="text-sm font-medium leading-none">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-blue-500/70"
                      aria-hidden
                    />
                    <input
                      id="login-email"
                      name={field.name}
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      spellCheck={false}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={cn(inputClass, "pl-10")}
                      placeholder="you@example.com"
                    />
                  </div>
                  {(field.state.meta.errors?.length ?? 0) > 0 && (
                    <p className="text-xs font-medium text-destructive">{field.state.meta.errors?.join(", ")}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="login-password" className="text-sm font-medium leading-none">
                      Password
                    </label>
                    <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 hover:underline dark:text-sky-400">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-emerald-600/70"
                      aria-hidden
                    />
                    <input
                      id="login-password"
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={cn(inputClass, "pr-10 pl-10")}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {(field.state.meta.errors?.length ?? 0) > 0 && (
                    <p className="text-xs font-medium text-destructive">{field.state.meta.errors?.join(", ")}</p>
                  )}
                </div>
              )}
            </form.Field>

            <Button
              type="submit"
              className="h-11 w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-base font-bold text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-emerald-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>

            <div className="rounded-2xl border border-dashed border-blue-500/25 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-700/80 dark:text-sky-300/90">Quick demo</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Run <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">npm run seed</code> in the backend
                once.
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Button type="button" variant="outline" size="sm" className="gap-2 border-violet-200 hover:bg-violet-50 dark:border-violet-900 dark:hover:bg-violet-950/40" onClick={() => applyDemo("admin")}>
                  <Shield className="size-3.5 text-violet-600" />
                  {DEMO_LOGIN.admin.title}
                </Button>
                <Button type="button" variant="outline" size="sm" className="gap-2 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-900 dark:hover:bg-emerald-950/40" onClick={() => applyDemo("seller")}>
                  <Store className="size-3.5 text-emerald-600" />
                  {DEMO_LOGIN.seller.title}
                </Button>
                <Button type="button" variant="outline" size="sm" className="gap-2 border-sky-200 hover:bg-sky-50 dark:border-sky-900 dark:hover:bg-sky-950/40" onClick={() => applyDemo("customer")}>
                  <UserRound className="size-3.5 text-sky-600" />
                  {DEMO_LOGIN.customer.title}
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-11 w-full border-2"
              onClick={() => {
                window.location.href = "/api/v1/auth/login/google";
              }}
            >
              <Chrome className="size-4 text-red-500" />
              Google
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link href="/register" className="font-bold text-blue-600 underline-offset-4 hover:underline dark:text-sky-400">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
