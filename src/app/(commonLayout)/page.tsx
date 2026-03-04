import Banner from "@/components/modules/home/Banner";
import CategoryList from "@/components/modules/home/CategoryList";
import MedicineList from "@/components/modules/home/FeaturedMedicines";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";

// সঠিক টাইপগুলো ইম্পোর্ট করুন
import { MOCK_CATEGORIES } from "@/data/categories";
import { MOCK_MEDICINES } from "@/data/medicines";
import { Medicine } from "@/types/medicine.type";
import { Category } from "@/types/category.type";

/**
 * যেহেতু ডেমো ডাটায় iconName বা color এর মতো অতিরিক্ত ফিল্ড থাকতে পারে, 
 * তাই আমরা টাইপ কাস্টিং এর বদলে সরাসরি টাইপ ডিফাইন করে দিচ্ছি।
 */
interface ExtendedCategory extends Category {
  iconName?: string;
  color?: string;
}

export default async function Home() {
  // ডেমো ডাটাকে তাদের সঠিক টাইপে অ্যাসাইন করা হচ্ছে (any ছাড়া)
  const categories: ExtendedCategory[] = MOCK_CATEGORIES;
  const medicines: Medicine[] = MOCK_MEDICINES;

  return (
    <main className="min-h-screen pb-20 space-y-16 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">

      {/* Hero Banner Section */}
      <section className="animate-in fade-in zoom-in duration-700">
        <Banner />
      </section>

      {/* Category List Section */}
      <section className="container mx-auto py-2">
        <CategoryList categories={categories} />
      </section>

      {/* Featured Medicines Section */}
      <section className="container mx-auto py-2 border-t border-slate-50 dark:border-slate-900">
        <MedicineList medicines={medicines} />
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto py-2 border-t border-slate-50 dark:border-slate-900">
        <WhyChooseUs />
      </section>

    </main>
  );
}