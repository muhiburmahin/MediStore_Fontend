import { fetchAllCategories } from "@/actions/category.action";
import CategoriesManagement from "@/components/modules/admin/categories";


export default async function AdminCategoriesPage() {
    const result = await fetchAllCategories();
    const categories = result?.data || [];
    return <CategoriesManagement initialCategories={categories} />;
}