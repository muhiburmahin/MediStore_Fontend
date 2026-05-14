"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { medicineService } from "@/services/medicine.service";
import { CreateMedicine, UpdateMedicine } from "@/types";

interface GetMedicineParams {
    search?: string;
    category?: string;
    categoryId?: string;
    page?: string;
    limit?: string;
    sortOrder?: string;
    sortBy?: string;
    sellerId?: string;
}


export const fetchAllMedicines = async (params?: GetMedicineParams) => {
    try {
        const result = await medicineService.getAllMedicines(params);

        if (result.error || result.data === null) {
            return {
                success: false,
                data: [],
                meta: null,
                error: result.error || null,
            };
        }

        const medicines = Array.isArray(result.data) ? result.data : [];
        const rawMeta = result.meta as Record<string, unknown> | null | undefined;
        const meta = rawMeta
            ? {
                ...rawMeta,
                totalPage: (rawMeta.totalPage as number) ?? (rawMeta.totalPages as number) ?? 1,
            }
            : null;

        return {
            success: true,
            data: medicines,
            meta,
            error: null,
        };
    } catch (error) {
        console.error("Action fetchAllMedicines Error:", error);
        return { success: false, data: [], meta: null, error: "Failed to fetch medicines" };
    }
};


export const fetchMedicineById = async (id: string) => {
    try {
        const result = await medicineService.getMedicineById(id);

        return result;

    } catch (error) {
        console.error("❌ Action fetchMedicineById Error:", error);
        return {
            data: null,
            error: "Something went wrong"
        };
    }
};

export const createMedicineAction = async (data: CreateMedicine) => {
    try {
        const result = await medicineService.createMedicine(data);

        if (result.data) {
            revalidateTag("medicines", "profile");

            revalidatePath("/seller-dashboard/medicines", "page");
        }
        return result;
    } catch (error) {
        console.error("Action createMedicineAction Error:", error);
        return { data: null, error: "Failed to create medicine" };
    }
};


export const updateMedicineAction = async (id: string, data: UpdateMedicine) => {
    try {
        const result = await medicineService.updateMedicine(id, data);

        if (result.data) {
            revalidateTag("medicines", "profile");
            revalidatePath("/seller-dashboard/medicines", "page");
        }
        return result;
    } catch (error) {
        console.error("Action updateMedicineAction Error:", error);
        return { data: null, error: "Failed to update medicine" };
    }
};


export const deleteMedicineAction = async (id: string) => {
    try {
        const result = await medicineService.deleteMedicine(id);

        if (result.data) {
            revalidateTag("medicines", "profile");
            revalidatePath("/seller-dashboard/medicines", "page");
        }
        return result;
    } catch (error) {
        console.error("Action deleteMedicineAction Error:", error);
        return { data: null, error: "Failed to delete medicine" };
    }
};