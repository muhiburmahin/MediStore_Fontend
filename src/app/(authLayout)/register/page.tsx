import type { Metadata } from "next";
import { RegisterForm } from "@/components/modules/authentication/register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a MediStore account as a customer or seller.",
};

export default function Page() {
  return (
    <div className="relative flex min-h-[calc(100dvh-5.5rem)] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-100/80 via-white to-blue-100/70 px-4 py-8 dark:from-emerald-950/30 dark:via-slate-900 dark:to-blue-950/40 sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute -right-24 top-16 size-72 rounded-full bg-emerald-400/25 blur-3xl dark:bg-emerald-600/20" />
      <div className="pointer-events-none absolute -left-16 bottom-12 size-80 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-600/15" />
      <div className="relative w-full max-w-lg">
        <RegisterForm />
      </div>
    </div>
  );
}
