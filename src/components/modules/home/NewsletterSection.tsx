"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Enter a valid email address.");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      toast.success("Thanks — you are on the list (demo).");
      setEmail("");
    }, 600);
  };

  return (
    <section className="py-12 md:py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-10 max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-3">Health tips in your inbox</h2>
        <p className="text-slate-400 font-medium mb-8">
          Seasonal alerts, stock drops on essentials, and pharmacy news — no spam.
        </p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="px-8 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 font-black uppercase tracking-widest text-sm disabled:opacity-60 flex justify-center items-center gap-2"
          >
            {busy ? <Loader2 className="animate-spin size-5" /> : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
