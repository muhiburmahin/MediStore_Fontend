const brands = ["GSK", "Square", "Beximco", "Renata", "Healthcare", "UniMed"];

export default function BrandsStrip() {
  return (
    <section className="py-10 bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-10">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">
          Popular manufacturer partners
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {brands.map((b) => (
            <span
              key={b}
              className="px-5 py-2 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-black text-slate-600 dark:text-slate-300 shadow-sm"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
