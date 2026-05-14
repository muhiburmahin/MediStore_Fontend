import type { Metadata } from "next";
import { LoginForm } from "@/components/modules/authentication/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to MediStore — customer, seller, or admin.",
};

export default function Page() {
  return (
    <div className="relative flex min-h-[calc(100dvh-5.5rem)] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100/80 via-white to-emerald-100/70 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40 sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute -left-24 top-20 size-72 rounded-full bg-blue-400/25 blur-3xl dark:bg-blue-600/20" />
      <div className="pointer-events-none absolute -right-20 bottom-10 size-80 rounded-full bg-emerald-400/25 blur-3xl dark:bg-emerald-600/15" />
      <div className="relative w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
