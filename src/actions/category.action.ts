"use server";

import { categoryService } from "@/services/category.service";
import { updateTag } from "next/cache";

export const fetchAllCategories = async () => {
    const result = await categoryService.getAllCategories();
    return result;
};

export const deleteCategoryAction = async (id: string) => {
    const result = await categoryService.deleteCategory(id);
    if (result.data) {
        updateTag("categories");
    }
    return result;
};

export const createCategoryAction = async (name: string) => {
    const result = await categoryService.addCategory(name);
    if (result.data) {
        updateTag("categories");
    }
    return result;
};