"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal, PackageSearch, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import MedicineCard from "../shared/MedicineCard"; // এটি চেক করুন default export কিনা
import { Medicine } from "@/types/medicine.type";
import { fetchAllMedicines } from "@/actions/medicine.action"; // এটি চেক করুন named export কিনা

// Meta ডাটার জন্য নির্দিষ্ট টাইপ ইন্টারফেস
interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export default function ShopPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<MetaData | null>(null); // 'any' রিমুভ করা হয়েছে
  const itemsPerPage = 12;

  const loadMedicines = useCallback(async () => {
    setLoading(true);
    try {
      // এপিআই কল করার সময় অবজেক্ট পাস করা হচ্ছে
      const response = await fetchAllMedicines({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchQuery,
        sortBy: sortBy,
        sortOrder: sortOrder
      });

      if (response && response.success) {
        setMedicines(response.data);
        setMeta(response.meta as MetaData); // টাইপ কাস্টিং
      }
    } catch (error) {
      console.error("Failed to load medicines:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, sortBy, sortOrder]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadMedicines();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [loadMedicines]);

  const handleSortChange = (value: string) => {
    if (value === "price-low") {
      setSortBy("price");
      setSortOrder("asc");
    } else if (value === "price-high") {
      setSortBy("price");
      setSortOrder("desc");
    } else {
      setSortBy("createdAt");
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  const totalPages = meta?.totalPage || 1;

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-6 bg-slate-50 dark:bg-[#0f172a] min-h-screen">

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          <span className="text-blue-600">Medi</span>
          <span className="text-green-600">cines</span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <div className="relative w-full max-w-md group">
          <Input
            placeholder="Search medicine..."
            className="block w-full pl-11 pr-4 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-blue-600 outline-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        </div>

        <div className="flex items-center gap-3 ml-auto w-full md:w-auto">
          <Select onValueChange={handleSortChange} defaultValue="default">
            <SelectTrigger className="w-full md:w-[220px] h-12 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <SelectValue placeholder="Sort By" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="default">Newest Arrival</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-slate-500 font-bold">Loading medicines...</p>
          </div>
        ) : medicines && medicines.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {medicines.map((med) => (
                <MedicineCard key={med.id || med.id} medicine={med} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-16 pb-12 border-t pt-8">
                <p className="text-sm font-medium text-slate-500">
                  Showing Page <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => { setCurrentPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border bg-white dark:bg-slate-900 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all font-bold"
                  > « </button>

                  <button
                    disabled={currentPage === 1}
                    onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border bg-white dark:bg-slate-900 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="px-5 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg">
                    {currentPage}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border bg-white dark:bg-slate-900 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => { setCurrentPage(totalPages); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border bg-white dark:bg-slate-900 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all font-bold"
                  > » </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <PackageSearch className="w-16 h-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest">No Medicines Found</h3>
          </div>
        )}
      </div>
    </div>
  );
}