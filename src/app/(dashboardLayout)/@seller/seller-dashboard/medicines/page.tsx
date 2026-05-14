import { categoryService } from "@/services/category.service";
import { medicineService } from "@/services/medicine.service";
import { userService } from "@/services/user.service";
import { Category, Medicine, User } from "@/types";
import MedicineTable from "@/components/modules/seller/medicine/MedicineTable";
import AddMedicine from '@/components/modules/seller/medicine/AddMedicine';
import AddCategory from "@/components/modules/seller/medicine/AddCategory";
import { Suspense } from "react";

const PAGE_SIZE = 10;

type MedicinesPageProps = {
    searchParams?: Promise<{ page?: string }>;
};

export default async function MedicinesPage({ searchParams }: MedicinesPageProps) {
    const sp = (await searchParams) ?? {};
    const pageRaw = parseInt(sp.page ?? "1", 10);
    const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;

    const [m, c, u] = await Promise.all([
        medicineService.getSellerMedicines({
            page: String(page),
            limit: String(PAGE_SIZE),
        }),
        categoryService.getAllCategories(),
        userService.getSession(),
    ]);

    const user: User = u?.data?.user || u;
    const medicines: Medicine[] = m?.data || [];
    const meta = m?.meta;
    const fetchError = m?.error;
    const categories: Category[] = c?.data || [];

    return (
        <div className="p-6">
            {fetchError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-red-800 rounded-r-xl">
                    {typeof fetchError === "object" && fetchError !== null && "message" in fetchError
                        ? String((fetchError as { message?: string }).message)
                        : "Could not load medicines. Please sign in again or refresh."}
                </div>
            )}

            {!fetchError && medicines.length === 0 && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 text-blue-700 rounded-r-xl">
                    No medicines found for your account. Start by adding one!
                </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-800">
                        Medicine <span className="text-blue-600">Inventory</span>
                    </h2>
                    <p className="text-slate-500 text-sm font-medium">Manage your drugs and stock levels</p>
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                    <AddCategory initialCategories={categories} />

                    <AddMedicine categories={categories} user={user} />
                </div>
            </div>

            <div className="mb-6 bg-white rounded-[30px] shadow-sm border border-slate-100 overflow-hidden">
                <Suspense fallback={<div className="p-8 text-center text-slate-500 font-medium">Loading inventory…</div>}>
                    <MedicineTable
                        medicines={medicines}
                        meta={meta}
                        categories={categories}
                        user={user}
                    />
                </Suspense>
            </div>
        </div>
    );
}