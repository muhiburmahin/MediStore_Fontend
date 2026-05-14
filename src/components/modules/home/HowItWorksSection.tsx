import { Search, ShoppingCart, Truck, Headphones } from "lucide-react";

const steps = [
  { title: "Browse & search", desc: "Filter by category, price, or keyword to find what you need.", icon: Search },
  { title: "Add to cart", desc: "Review dosage info and stock before you checkout securely.", icon: ShoppingCart },
  { title: "Fast delivery", desc: "Track orders from placement to doorstep with live status.", icon: Truck },
  { title: "Aftercare", desc: "Need help? Our team answers questions about orders and refills.", icon: Headphones },
];

export default function HowItWorksSection() {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-10">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-2">
          <span className="text-blue-600">How</span>{" "}
          <span className="text-green-600">MediStore</span> works
        </h2>
        <p className="text-center text-slate-500 font-medium max-w-2xl mx-auto mb-12">
          Four simple steps from discovery to delivery — built for busy families and clinics alike.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50/80 dark:bg-slate-900/40 hover:border-blue-300 dark:hover:border-blue-800 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-black text-blue-600 bg-blue-100 dark:bg-blue-950 px-2 py-1 rounded-lg">
                  {i + 1}
                </span>
                <s.icon className="size-6 text-emerald-600" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white mb-1">{s.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
