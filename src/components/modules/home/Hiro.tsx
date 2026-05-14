import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Clock, Sparkles } from "lucide-react";

/**
 * Home hero — mobile-first, touch-friendly CTAs, no external banner asset required.
 */
export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute -left-20 top-0 h-[28rem] w-[28rem] rounded-full bg-blue-600/50 blur-3xl sm:h-[36rem] sm:w-[36rem]" />
        <div className="absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-emerald-500/40 blur-3xl sm:h-[32rem] sm:w-[32rem]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-2xl" />
      </div>

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
          <div className="max-w-xl lg:max-w-none">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300 sm:text-xs">
              <Sparkles className="size-3.5 shrink-0 text-amber-300" aria-hidden />
              Trusted online pharmacy
            </p>

            <h1 className="text-balance text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="text-blue-400">Medi</span>
              <span className="text-emerald-400">Store</span>
              <span className="text-white"> — care at your doorstep</span>
            </h1>

            <p className="mt-4 text-pretty text-sm leading-relaxed text-slate-300 sm:text-base md:mt-5 md:max-w-lg md:text-lg">
              Search medicines, browse categories, and order with confidence. Built for phones first
              — fast, clear, and easy to use on the go.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:mt-10">
              <Link
                href="/shop"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 active:scale-[0.98] sm:min-h-14 sm:px-8 sm:text-base"
              >
                Shop medicines
                <ArrowRight className="size-4 shrink-0 sm:size-5" aria-hidden />
              </Link>
              <Link
                href="/find-by-cate"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-white/25 bg-white/5 px-6 py-3 text-center text-sm font-black uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/10 active:scale-[0.98] sm:min-h-14 sm:px-8 sm:text-base"
              >
                Find by category
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4" role="list">
              {[
                { icon: ShieldCheck, label: "Verified sellers" },
                { icon: Truck, label: "Trackable delivery" },
                { icon: Clock, label: "Quick checkout" },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200 sm:min-h-0 sm:text-sm"
                >
                  <Icon className="size-4 shrink-0 text-emerald-400 sm:size-5" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/50 shadow-2xl shadow-black/50 sm:aspect-[5/4] sm:rounded-[2rem] lg:aspect-auto lg:min-h-[22rem]">
              <Image
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80"
                alt="Pharmacist organizing medicine shelves"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur-md sm:p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 sm:text-xs">
                    Same-day dispatch windows
                  </p>
                  <p className="mt-1 text-sm font-bold text-white sm:text-base">
                    Order before cut-off where available — track every step from your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
