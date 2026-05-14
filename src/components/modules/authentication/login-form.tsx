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
  .email("Invalid email address")
  .refine((e) => isAllowedMailboxEmail(e), {
    message:
      "Use a real email provider (temporary or disposable addresses are not allowed)",
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
    errors?: { formErrors?: string[]; fieldErrors?: Record<string, string[] | undefined> };
  };
  return { res, json };
}

const inputClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-[color,box-shadow] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const err = new URLSearchParams(window.location.search).get("error");
    if (!err) return;
    toast.error(decodeURIComponent(err.replace(/\+/g, " ")));
    const u = new URL(window.location.href);
    u.searchParams.delete("error");
    window.history.replaceState({}, "", `${u.pathname}${u.search}`);
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
        router.push("/");
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
    toast.message(`${d.title} credentials applied`, {
      description: "Press Sign in to continue.",
    });
  };

  return (
    <Card className="w-full max-w-md border shadow-md">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto relative size-16 overflow-hidden rounded-xl border bg-background shadow-sm">
          <Image src="/logo.png" alt="MediStore" fill className="object-contain p-1.5" priority />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">Sign in</CardTitle>
          <CardDescription>Use your email and password. Demo accounts are available below.</CardDescription>
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
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
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
                  <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
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

          <Button type="submit" className="h-11 w-full text-base font-semibold" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          <div className="rounded-lg border bg-muted/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Demo accounts</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Run <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">npm run seed</code> in the
              backend once so these exist in the database.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <Button type="button" variant="outline" size="sm" className="justify-start gap-2" onClick={() => applyDemo("admin")}>
                <Shield className="size-3.5 shrink-0 text-violet-600" />
                <span className="truncate text-left text-xs font-medium">{DEMO_LOGIN.admin.title}</span>
              </Button>
              <Button type="button" variant="outline" size="sm" className="justify-start gap-2" onClick={() => applyDemo("seller")}>
                <Store className="size-3.5 shrink-0 text-emerald-600" />
                <span className="truncate text-left text-xs font-medium">{DEMO_LOGIN.seller.title}</span>
              </Button>
              <Button type="button" variant="outline" size="sm" className="justify-start gap-2" onClick={() => applyDemo("customer")}>
                <UserRound className="size-3.5 shrink-0 text-sky-600" />
                <span className="truncate text-left text-xs font-medium">{DEMO_LOGIN.customer.title}</span>
              </Button>
            </div>
            <dl className="mt-3 space-y-1.5 text-[11px] leading-relaxed text-muted-foreground">
              <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                <dt className="font-medium text-foreground">Admin</dt>
                <dd className="font-mono">{DEMO_LOGIN.admin.email}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                <dt className="font-medium text-foreground">Seller</dt>
                <dd className="font-mono">{DEMO_LOGIN.seller.email}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                <dt className="font-medium text-foreground">Customer</dt>
                <dd className="font-mono">{DEMO_LOGIN.customer.email}</dd>
              </div>
              <p className="pt-0.5 font-mono text-[11px]">Password (all demos): {DEMO_LOGIN.admin.password}</p>
            </dl>
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
            className="h-11 w-full"
            onClick={() => {
              const redirect = encodeURIComponent("/dashboard");
              window.location.href = `/api/v1/auth/login/google?redirect=${redirect}`;
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
          <Link href="/register" className="font-semibold text-primary underline-offset-4 hover:underline">
            Create an account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
