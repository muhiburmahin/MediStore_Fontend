"use server";

import { revalidatePath } from "next/cache";
import { medicineService } from "@/services/medicine.service";
import { CreateMedicine, UpdateMedicine } from "@/types";


interface GetMedicineParams {
    search?: string;
    page?: string;
    limit?: string;
    sortOrder?: string;
    sortBy?: string;
}

export const fetchAllMedicines = async (params?: GetMedicineParams) => {
    try {
        const result = await medicineService.getAllMedicines(params);

        const medicines = result?.data?.data || [];

        return {
            success: !!result.data,
            data: medicines,
            meta: result?.data?.meta || null,
            error: result.error,
        };
    } catch (error) {
        return { success: false, data: [], error: "Failed to fetch" };
    }
};

export const fetchMedicineById = async (id: string) => {
    try {
        return await medicineService.getMedicineById(id);
    } catch (error) {
        console.error("Action fetchMedicineById Error:", error);
        return { data: null, error: "Medicine not found" };
    }
};

/**
 * নতুন মেডিসিন তৈরি করা
 */
export const createMedicineAction = async (data: CreateMedicine) => {
    try {
        const result = await medicineService.createMedicine(data);
        if (result.data) {
            // ক্যাশ ক্লিয়ার করার জন্য পাথ রিভ্যালিডেট করা হচ্ছে
            revalidatePath("/", "layout");
        }
        return result;
    } catch (error) {
        return { data: null, error: "Failed to create medicine" };
    }
};

/**
 * মেডিসিন আপডেট করা
 */
export const updateMedicineAction = async (id: string, data: UpdateMedicine) => {
    try {
        const result = await medicineService.updateMedicine(id, data);
        if (result.data) {
            revalidatePath("/", "layout");
        }
        return result;
    } catch (error) {
        return { data: null, error: "Failed to update medicine" };
    }
};

/**
 * মেডিসিন ডিলিট করা
 */
export const deleteMedicineAction = async (id: string) => {
    try {
        const result = await medicineService.deleteMedicine(id);
        if (result.data) {
            revalidatePath("/", "layout");
        }
        return result;
    } catch (error) {
        return { data: null, error: "Failed to delete medicine" };
    }
};