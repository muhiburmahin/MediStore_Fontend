import { ShieldCheck, Clock, Package } from "lucide-react";

export default function DeliveryTrustSection() {
  return (
    <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900/30">
      <div className="container mx-auto px-4 md:px-10 flex flex-col lg:flex-row gap-10 items-center">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="text-blue-600">Trusted</span> delivery &{" "}
            <span className="text-green-600">cold-chain</span> care
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">
            Temperature-sensitive items are packed with care. Real-time inventory means fewer
            substitutions and clearer ETAs on every order.
          </p>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <ShieldCheck className="size-6 text-emerald-600 shrink-0" />
              <div>
                <p className="font-black text-slate-900 dark:text-white">Verified sources</p>
                <p className="text-sm text-slate-500">Medicines from approved sellers on our network.</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <Clock className="size-6 text-blue-600 shrink-0" />
              <div>
                <p className="font-black text-slate-900 dark:text-white">Predictable cut-offs</p>
                <p className="text-sm text-slate-500">Order before daily dispatch windows for same-week delivery.</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <Package className="size-6 text-amber-600 shrink-0" />
              <div>
                <p className="font-black text-slate-900 dark:text-white">Tamper-aware packaging</p>
                <p className="text-sm text-slate-500">Sealed cartons and clear batch labels on dispatch.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex-1 w-full max-w-lg aspect-video rounded-[2rem] bg-gradient-to-br from-blue-600/20 to-emerald-500/20 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-black text-slate-400 text-sm uppercase tracking-widest">
          Logistics preview
        </div>
      </div>
    </section>
  );
}
