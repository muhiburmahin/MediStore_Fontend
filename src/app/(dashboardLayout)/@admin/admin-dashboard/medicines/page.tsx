import { categoryService } from "@/services/category.service";
import { medicineService } from "@/services/medicine.service";
import { userService } from "@/services/user.service";
import { Category, Medicine, User } from "@/types";
import MedicineTable from "@/components/modules/seller/medicine/MedicineTable";
import AddMedicine from '@/components/modules/seller/medicine/AddMedicine';
import AddCategory from "@/components/modules/seller/medicine/AddCategory";

export default async function MedicinesPage() {
    const [m, c, u] = await Promise.all([
        medicineService.getAllMedicines({ page: "1", limit: "100" }),
        categoryService.getAllCategories(),
        userService.getSession(),
    ]);

    const user: User = u?.data?.user || u;
    const currentSellerId = user?.id;
    const rawMedicines: Medicine[] = m?.data || [];

    const medicines = rawMedicines.filter(med =>
        user?.role === 'ADMIN' ? true : med.sellerId === currentSellerId
    );
    const categories: Category[] = c?.data || [];

    return (
        <div className="p-6">
            {medicines.length === 0 && (
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
                <MedicineTable
                    medicines={medicines}
                    categories={categories}
                    user={user}
                />
            </div>
        </div>
    );
}