"use client";

import { useState, useEffect, useCallback } from "react";
import { LayoutGrid, ChevronRight, ChevronLeft, Check, PackageSearch, Loader2 } from "lucide-react";
import MedicineCard from "../shared/MedicineCard";
import { Medicine } from "@/types/medicine.type";
import { fetchAllMedicines } from "@/actions/medicine.action";
import { fetchAllCategories } from "@/actions/category.action";

interface MetaData {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

interface Category {
    _id?: string;
    id?: string;
    name: string;
}

export default function FindByCeta() {
    // States
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [catLoading, setCatLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState<MetaData | null>(null);
    const itemsPerPage = 12;
    useEffect(() => {
        const getCategories = async () => {
            setCatLoading(true);
            try {
                const response = await fetchAllCategories();
                if (response?.data) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Categories fetch failed:", error);
            } finally {
                setCatLoading(false);
            }
        };
        getCategories();
    }, []);

    const loadMedicines = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchAllMedicines({
                page: currentPage.toString(),
                limit: itemsPerPage.toString(),
                search: selectedCategory === "All" ? "" : selectedCategory,
            });

            if (response?.data) {
                setMedicines(response.data);
                if (response.meta) setMeta(response.meta as MetaData);
            } else {
                setMedicines([]);
            }
        } catch (error) {
            console.error("Medicines load failed:", error);
            setMedicines([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage, selectedCategory]);

    useEffect(() => {
        loadMedicines();
    }, [loadMedicines]);

    const totalPages = meta?.totalPage || 1;

    return (
        <div className="max-w-[1600px] mx-auto px-6 bg-[#F8FAFC] dark:bg-[#0f172a] min-h-screen py-10 transition-colors duration-300">
            {/* Header Section */}
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-4xl font-black tracking-tight uppercase">
                    <span className="text-blue-600">Find By</span>{" "}
                    <span className="text-green-600">Category</span>
                </h1>
                <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mt-2 mx-auto md:mx-0"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Sidebar - Category List */}
                <aside className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-6">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-50 dark:border-slate-800 transition-colors max-h-[85vh] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <LayoutGrid className="w-5 h-5 text-blue-600" />
                                <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase text-xs tracking-widest">Categories</h3>
                            </div>
                            <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 px-2 py-1 rounded-full font-bold text-[10px]">
                                {categories.length}
                            </span>
                        </div>

                        <div className="space-y-2">
                            {/* Static "All" Button */}
                            <button
                                onClick={() => { setSelectedCategory("All"); setCurrentPage(1); }}
                                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm transition-all cursor-pointer ${selectedCategory === "All"
                                    ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 dark:shadow-none"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600"
                                    }`}
                            >
                                <span className="truncate">All Medicines</span>
                                {selectedCategory === "All" ? <Check className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 opacity-30" />}
                            </button>

                            {/* Dynamic Backend Categories */}
                            {catLoading ? (
                                <div className="flex justify-center py-4"><Loader2 className="animate-spin text-blue-600" /></div>
                            ) : (
                                categories.map((cat) => (
                                    <button
                                        key={cat.id || cat._id}
                                        onClick={() => { setSelectedCategory(cat.name); setCurrentPage(1); }}
                                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm transition-all cursor-pointer ${selectedCategory === cat.name
                                            ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 dark:shadow-none"
                                            : "text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600"
                                            }`}
                                    >
                                        <span className="truncate">{cat.name}</span>
                                        {selectedCategory === cat.name ? <Check className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 opacity-30" />}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </aside>

                <main className="flex-1 w-full">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32">
                            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                            <p className="text-slate-500 font-bold">Loading Medicines...</p>
                        </div>
                    ) : medicines.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                {medicines.map((med) => (
                                    <MedicineCard key={med.id || med.id} medicine={med} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-16 pb-12 border-t border-slate-200 dark:border-slate-800 pt-8">
                                    <p className="text-sm text-slate-500">
                                        Showing Page <span className="font-bold">{currentPage}</span> of {totalPages}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <div className="px-5 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-lg">
                                            {currentPage}
                                        </div>
                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                                        >
                                            <ChevronRight className="w-4 h-4" />
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