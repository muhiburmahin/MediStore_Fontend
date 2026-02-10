import Banner from "@/components/modules/home/Banner";
import CategoryList from "@/components/modules/home/CategoryList";
import MedicineList from "@/components/modules/home/FeaturedMedicines";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";

export default async function Home() {
  return (
    <main className="min-h-screen pb-20 space-y-16 overflow-hidden bg-white">

      <section className="animate-in fade-in zoom-in duration-700">
        <Banner />

      </section>

      <section className="container mx-auto py-2">

        <CategoryList />
      </section>

      <section className="container mx-auto py-2 border-t border-slate-50">
        <MedicineList />
      </section>
      <section className="container mx-auto py-2 border-t border-slate-50">
        <WhyChooseUs />
      </section>

    </main>
  );
}