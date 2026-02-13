"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, ChevronRight, ChevronLeft, Check, PackageSearch } from "lucide-react";
import MedicineCard from "../shared/MedicineCard";
import { MOCK_MEDICINES } from "@/data/medicines";
import { useShopFilter } from "@/hooks/useShopFilter";

export default function FindByCeta() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;

    const {
        filteredMedicines,
        selectedCategory, setSelectedCategory
    } = useShopFilter(MOCK_MEDICINES);

    const dynamicCategories = useMemo(() => {
        const names = MOCK_MEDICINES.map((m) => m.category?.name).filter(Boolean);
        return Array.from(new Set(names)) as string[];
    }, []);

    const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMedicines = filteredMedicines.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="max-w-[1600px] mx-auto px-6 bg-[#F8FAFC] dark:bg-[#0f172a] min-h-screen py-10 transition-colors duration-300">
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-4xl font-black tracking-tight uppercase">
                    <span className="text-blue-600">Find By</span>{" "}
                    <span className="text-green-600">Category</span>
                </h1>
                <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mt-2 mx-auto md:mx-0"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                <aside className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-6">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-50 dark:border-slate-800 transition-colors max-h-[85vh] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <LayoutGrid className="w-5 h-5 text-blue-600" />
                                <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase text-xs tracking-widest">Categories</h3>
                            </div>
                            <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 px-2 py-1 rounded-full font-bold text-[10px]">
                                {dynamicCategories.length}
                            </span>
                        </div>

                        <div className="space-y-2">

                            {["All", ...dynamicCategories].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setCurrentPage(1);
                                    }}
                                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm transition-all ${selectedCategory === cat
                                        ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 dark:shadow-none"
                                        : "text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600"
                                        }`}
                                >
                                    <span className="truncate">{cat}</span>
                                    {selectedCategory === cat ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 opacity-30" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                <main className="flex-1">
                    {currentMedicines.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                {currentMedicines.map((med) => (
                                    <MedicineCard key={med.id} medicine={med} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-16 pb-12 border-t border-slate-200 dark:border-slate-800 pt-8">

                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        Showing <span className="font-bold text-slate-900 dark:text-slate-100">{indexOfFirstItem + 1}</span> to{" "}
                                        <span className="font-bold text-slate-900 dark:text-slate-100">
                                            {Math.min(indexOfLastItem, filteredMedicines.length)}
                                        </span>{" "}
                                        of <span className="font-bold text-slate-900 dark:text-slate-100">{filteredMedicines.length}</span> results
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => { setCurrentPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all shadow-sm cursor-pointer"
                                        >
                                            <span className="text-lg font-bold">«</span>
                                        </button>

                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all shadow-sm cursor-pointer"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>

                                        <div className="px-5 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 dark:shadow-none">
                                            Page {currentPage} of {totalPages}
                                        </div>

                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all shadow-sm cursor-pointer"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>

                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => { setCurrentPage(totalPages); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all shadow-sm cursor-pointer"
                                        >
                                            <span className="text-lg font-bold">»</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
                            <PackageSearch className="w-20 h-20 text-slate-200 dark:text-slate-800 mb-6" />
                            <h3 className="text-2xl font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest text-center">
                                No Products in <br /> {selectedCategory}
                            </h3>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}