export default function HomeStatsStrip() {
  const items = [
    { label: "Medicines listed", value: "500+" },
    { label: "Verified sellers", value: "120+" },
    { label: "Cities served", value: "45+" },
    { label: "Happy customers", value: "10k+" },
  ];
  return (
    <section className="py-10 md:py-14 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
      <div className="container mx-auto px-4 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {items.map((it) => (
          <div key={it.label}>
            <p className="text-3xl md:text-4xl font-black tracking-tight">{it.value}</p>
            <p className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-90 mt-1">
              {it.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
