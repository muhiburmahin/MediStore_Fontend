"use server";

import { categoryService } from "@/services/category.service";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
export const fetchAllCategories = async () => {
    const result = await categoryService.getAllCategories();
    return result;
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createCategoryAction = async (formData: FormData) => {
    try {
        const name = formData.get("name") as string;
        const file = formData.get("image") as File;

        if (!name) {
            return { success: false, message: "Category name is required" };
        }

        let imageUrl = null;
        if (file && file.size > 0) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const uploadResponse: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: "medistore/categories",
                        resource_type: "auto"
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(buffer);
            });

            imageUrl = uploadResponse.secure_url;
        }

        const result = await categoryService.createCategory(name, imageUrl);

        if (result.error) {
            return { success: false, message: result.error.message };
        }

        revalidatePath("/admin-dashboard/categories");
        revalidatePath("/seller-dashboard/categories");

        return {
            success: true,
            message: "Category created successfully",
            data: result.data,
        };
    } catch (error) {
        console.error("Upload Error:", error);
        return { success: false, message: "Something went wrong while creating category" };
    }
};

export const deleteCategoryAction = async (id: string) => {
    try {
        const result = await categoryService.deleteCategoryById(id);

        if (result.error) {
            return { success: false, message: result.error.message };
        }

        revalidatePath("/admin-dashboard/categories");
        revalidatePath("/seller-dashboard/categories");

        return { success: true, message: "Category deleted successfully" };
    } catch (error) {
        return { success: false, message: "Failed to delete category" };
    }
};