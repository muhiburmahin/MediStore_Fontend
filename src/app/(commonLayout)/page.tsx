import HeroSection from "@/components/modules/home/Hiro";
import CategoryList from "@/components/modules/home/CategoryList";
import MedicineList from "@/components/modules/home/FeaturedMedicines";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";
import HomeStatsStrip from "@/components/modules/home/HomeStatsStrip";
import HowItWorksSection from "@/components/modules/home/HowItWorksSection";
import DeliveryTrustSection from "@/components/modules/home/DeliveryTrustSection";
import BrandsStrip from "@/components/modules/home/BrandsStrip";
import TestimonialsSection from "@/components/modules/home/TestimonialsSection";
import NewsletterSection from "@/components/modules/home/NewsletterSection";
import { fetchAllCategories } from "@/actions/category.action";
import { fetchAllMedicines } from "@/actions/medicine.action";

export const dynamic = "force-dynamic";

export default async function Home() {
  const categoriesRes = await fetchAllCategories();
  const medicinesRes = await fetchAllMedicines({ limit: "8" });

  const categories = categoriesRes?.data || [];
  const medicines = medicinesRes?.data || [];

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">

      <section className="w-full overflow-hidden mb-0">
        <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
          <HeroSection />
        </div>
      </section>

      <section>
        <HomeStatsStrip />
      </section>

      <section className="py-1 md:py-8">
        <CategoryList categories={categories} />
      </section>

      <section className="py-1 md:py-10 bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-100 dark:border-slate-800">
        <MedicineList medicines={medicines} />
      </section>

      <section>
        <HowItWorksSection />
      </section>

      <section>
        <DeliveryTrustSection />
      </section>

      <section>
        <BrandsStrip />
      </section>

      <section className="py-2 md:py-12">
        <WhyChooseUs />
      </section>

      <section>
        <TestimonialsSection />
      </section>

      <section>
        <NewsletterSection />
      </section>

    </main>
  );
}
