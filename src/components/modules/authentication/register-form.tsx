"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { Chrome, Lock, Mail, User, Eye, EyeOff, Loader2, Camera, UserRound, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { isAllowedMailboxEmail } from "@/lib/email-policy";
import { toastApiFlattenedErrors, toastZodIssues } from "@/lib/validation-toasts";
import { DEMO_REGISTER_PREFILL } from "@/lib/demo-accounts";
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

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: mailboxEmail,
    role: z.enum(["CUSTOMER", "SELLER"]),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

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

    onSubmit: async ({ value }) => {
      const parsed = registerSchema.safeParse(value);
      if (!parsed.success) {
        toastZodIssues(parsed.error);
        return;
      }

      setLoading(true);
      const toastId = toast.loading("Creating your account…");
      try {
        const { res, json } = await postAuthJson("/api/v1/auth/register", {
          name: parsed.data.name,
          email: parsed.data.email,
          password: parsed.data.password,
          role: parsed.data.role,
        });

        if (!res.ok) {
          if (json.errors) toastApiFlattenedErrors(json.errors);
          else toast.error(json.message || "Registration failed", { id: toastId });
          return;
        }

        toast.success(`Welcome, ${parsed.data.name}! You can sign in now.`, { id: toastId });
        router.push("/login");
        router.refresh();
      } catch {
        toast.error("Something went wrong. Try again.", { id: toastId });
      } finally {
        setLoading(false);
      }
    },
  });

  const prefillDemo = (kind: keyof typeof DEMO_REGISTER_PREFILL) => {
    const d = DEMO_REGISTER_PREFILL[kind];
    form.setFieldValue("name", d.name);
    form.setFieldValue("email", d.email);
    form.setFieldValue("password", d.password);
    form.setFieldValue("confirmPassword", d.password);
    form.setFieldValue("role", d.role);
    toast.message("Demo fields applied", {
      description: "Use only if these emails are not already registered (run backend seed first).",
    });
  };

  return (
    <Card className="w-full max-w-lg border shadow-md">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto relative size-16 overflow-hidden rounded-xl border bg-background shadow-sm">
          <Image src="/logo.png" alt="MediStore" fill className="object-contain p-1.5" priority />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">Create account</CardTitle>
          <CardDescription>Register as a customer or seller. Password must include a lowercase letter and a number.</CardDescription>
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
          <div className="flex flex-col items-center gap-2">
            <label className="relative cursor-pointer">
              <span className="sr-only">Profile photo</span>
              <div
                className={cn(
                  "flex size-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed bg-muted/50 transition-colors hover:bg-muted",
                  imagePreview ? "border-primary" : "border-muted-foreground/30"
                )}
              >
              <div
                className={cn(
                  "size-full bg-cover bg-center",
                  imagePreview ? "" : "hidden"
                )}
                style={imagePreview ? { backgroundImage: `url(${imagePreview})` } : undefined}
                role={imagePreview ? "img" : undefined}
                aria-label={imagePreview ? "Profile preview" : undefined}
              />
              {!imagePreview && <Camera className="size-8 text-muted-foreground" aria-hidden />}
              </div>
              <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
            <span className="text-xs text-muted-foreground">Optional profile photo</span>
          </div>

          <div className="rounded-lg border bg-muted/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Prefill demo (optional)</p>
            <p className="mt-1 text-xs text-muted-foreground">
              If you already ran <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">npm run seed</code>{" "}
              on the backend, these emails exist — registration will fail until you use different emails.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => prefillDemo("customer")}>
                <UserRound className="size-3.5 text-sky-600" />
                Demo customer
              </Button>
              <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => prefillDemo("seller")}>
                <Store className="size-3.5 text-emerald-600" />
                Demo seller
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2 sm:col-span-1">
                  <label htmlFor="reg-name" className="text-sm font-medium leading-none">
                    Full name
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="reg-name"
                      autoComplete="name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={cn(inputClass, "pl-10")}
                      placeholder="Your full name"
                    />
                  </div>
                  {field.state.meta.errors && (
                    <p className="text-xs font-medium text-destructive">{field.state.meta.errors.join(", ")}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <div className="space-y-2 sm:col-span-1">
                  <label htmlFor="reg-email" className="text-sm font-medium leading-none">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="reg-email"
                      type="email"
                      autoComplete="email"
                      spellCheck={false}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={cn(inputClass, "pl-10")}
                      placeholder="you@example.com"
                    />
                  </div>
                  {field.state.meta.errors && (
                    <p className="text-xs font-medium text-destructive">{field.state.meta.errors.join(", ")}</p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="role">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor="reg-role" className="text-sm font-medium leading-none">
                  I am registering as
                </label>
                <select
                  id="reg-role"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as "CUSTOMER" | "SELLER")}
                  className={cn(inputClass, "h-11")}
                >
                  <option value="CUSTOMER">Customer — browse and buy medicines</option>
                  <option value="SELLER">Seller — manage my shop listings</option>
                </select>
              </div>
            )}
          </form.Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <form.Field name="password">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="reg-password" className="text-sm font-medium leading-none">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={cn(inputClass, "pr-10 pl-10")}
                      placeholder="Min. 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:bg-muted"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Use at least one lowercase letter and one number.</p>
                  {field.state.meta.errors && (
                    <p className="text-xs font-medium text-destructive">{field.state.meta.errors.join(", ")}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="confirmPassword">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="reg-confirm" className="text-sm font-medium leading-none">
                    Confirm password
                  </label>
                  <input
                    id="reg-confirm"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={inputClass}
                    placeholder="Re-enter password"
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs font-medium text-destructive">{field.state.meta.errors.join(", ")}</p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <Button type="submit" className="h-11 w-full text-base font-semibold" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </Button>

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
              const redirect = encodeURIComponent("/");
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
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
