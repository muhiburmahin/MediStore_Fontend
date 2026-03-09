import Banner from "@/components/modules/home/Banner";
import CategoryList from "@/components/modules/home/CategoryList";
import MedicineList from "@/components/modules/home/FeaturedMedicines";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";
import { fetchAllCategories } from "@/actions/category.action";
import { fetchAllMedicines } from "@/actions/medicine.action"; // অ্যাকশন ইমপোর্ট করুন

export default async function Home() {
  const categoriesRes = await fetchAllCategories();
  const medicinesRes = await fetchAllMedicines({ limit: "8" });

  // অ্যাকশন থেকে আসা প্রপার ডাটা সেট করা হচ্ছে
  const categories = categoriesRes?.data || [];
  const medicines = medicinesRes?.data || [];

  return (
    <main className="min-h-screen pb-20 bg-white dark:bg-slate-950 transition-colors duration-300">

      {/* Hero Banner Section */}
      <div className="animate-in fade-in zoom-in duration-700">
        <Banner />
      </div>

      {/* Category List Section */}
      <div className="py-8">
        <CategoryList categories={categories} />
      </div>

      {/* Featured Medicines Section */}
      <div className="py-8 bg-slate-50/50 dark:bg-slate-900/20">
        <MedicineList medicines={medicines} />
      </div>

      {/* Why Choose Us Section */}
      <div className="py-8">
        <WhyChooseUs />
      </div>

    </main>
  );
}