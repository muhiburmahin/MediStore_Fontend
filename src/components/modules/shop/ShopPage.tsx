"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, PackageSearch, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import MedicineCard from "../shared/MedicineCard";
import { MOCK_MEDICINES } from "@/data/medicines";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const allFilteredMedicines = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const filtered = MOCK_MEDICINES.filter((med) =>
      med.name.toLowerCase().includes(query)
    );

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered.sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(query);
      const bStarts = b.name.toLowerCase().startsWith(query);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });
  }, [searchQuery, sortBy]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = allFilteredMedicines.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allFilteredMedicines.length / itemsPerPage);

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-6 bg-slate-50 dark:bg-[#0f172a] min-h-screen transition-colors duration-300">

      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          <span className="text-blue-600">Medi</span>
          <span className="text-green-600">cines</span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full max-w-md group">
          {/* <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-blue-600" />
          </div> */}
          <Input
            placeholder="Search medicine..."
            className="block w-full pl-11 pr-4 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-blue-600 transition-all outline-none shadow-sm"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex items-center gap-3 ml-auto w-full md:w-auto">
          <Select onValueChange={setSortBy} defaultValue="default">
            <SelectTrigger className="w-full md:w-[200px] h-12 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <SelectValue placeholder="Sort By" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
              <SelectItem value="default">Newest Arrival</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full">
        {currentMedicines.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {currentMedicines.map((med) => (
                <MedicineCard key={med.id} medicine={med} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-16 pb-12 border-t border-slate-200 dark:border-slate-800 pt-8">

                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Showing <span className="font-bold text-slate-900 dark:text-slate-100">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {Math.min(indexOfLastItem, allFilteredMedicines.length)}
                  </span>{" "}
                  of <span className="font-bold text-slate-900 dark:text-slate-100">{allFilteredMedicines.length}</span> results
                </p>

                <div className="flex items-center gap-2">
                  {/* First Page Button (<<) */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage(1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  >
                    <span className="text-lg font-bold">«</span>
                  </button>

                  {/* Previous Button (<) */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage(prev => prev - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Current Page Indicator */}
                  <div className="px-5 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 dark:shadow-none">
                    Page {currentPage} of {totalPages}
                  </div>

                  {/* Next Button (>) */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage(prev => prev + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Last Page Button (>>) */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage(totalPages);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  >
                    <span className="text-lg font-bold">»</span>
                  </button>
                </div>
              </div>
            )}

          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <PackageSearch className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
            <h3 className="text-lg font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
              No results found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}