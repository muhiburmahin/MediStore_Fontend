const quotes = [
  {
    name: "Dr. Anika Rahman",
    role: "GP, Dhaka",
    text: "Ordering repeat prescriptions for my clinic through MediStore saves hours every month.",
  },
  {
    name: "Samin Y.",
    role: "Customer",
    text: "Search is fast and checkout is simple. I get SMS-friendly tracking without chasing support.",
  },
  {
    name: "Rafiqul Seller",
    role: "Pharmacy owner",
    text: "Dashboards show what is selling and what is low stock — exactly what we needed.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-10">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-10">
          People <span className="text-green-600">trust</span> MediStore
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <blockquote
              key={q.name}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50/50 dark:bg-slate-900/40"
            >
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-4">
                “{q.text}”
              </p>
              <footer className="text-sm">
                <span className="font-black text-slate-900 dark:text-white">{q.name}</span>
                <span className="text-slate-500"> — {q.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
