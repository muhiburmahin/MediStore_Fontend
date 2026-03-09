// import MedicinesPagination from "@/components/modules/medicines/MedicinePagination";
// import AddMedicine from "@/components/modules/seller/medicine/AddMedicine";
// import { categoryService } from "@/services/category.service";
// import { medicineService } from "@/services/medicine.service";
// import { userService } from "@/services/user.service";
// import { Category, Medicine, User } from "@/types";
// import MedicineTable from "@/components/modules/seller/medicine/MedicineTable";

// export default async function MedicinesPage({
//     searchParams,
// }: {
//     searchParams: Promise<{ page: string }>;
// }) {
//     const { page } = await searchParams;
//     const [m, c, u] = await Promise.all([
//         medicineService.getAllMedicines({ page }),
//         categoryService.getAllCategorys(),
//         userService.getSession(),
//     ]);

//     const medicines: Medicine[] = m.data?.data?.data || m.data?.data || [];
//     const categories: Category[] = c.data.data;
//     const user: User = u.data.user;

//     const pagination = m.data?.data?.pagination || {
//         limit: 10,
//         page: 1,
//         total: 10,
//         totalPages: 1,
//     };

//     return (
//         <div>
//             <div className="flex items-center justify-between">
//                 <h2 className="text-2xl font-semibold mb-5">
//                     Medicine Management
//                 </h2>
//                 <AddMedicine categories={categories} user={user} />
//             </div>
//             <div className="mb-5">
//                 <MedicineTable medicines={medicines} />
//             </div>
//             <MedicinesPagination meta={pagination} />
//         </div>
//     );
// }