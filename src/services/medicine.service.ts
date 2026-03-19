import { cookies } from "next/headers";
import { CreateMedicine, UpdateMedicine } from "@/types";
import { env } from "@/env";
import { revalidateTag } from "next/cache";
const API_URL = env.API_URL;

interface GetMedicineParams {
    search?: string;
    page?: string;
    limit?: string;
    sortOrder?: string;
    sortBy?: string;
    sellerId?: string;
}

export const medicineService = {
    createMedicine: async (data: CreateMedicine) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/medicines`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: result?.message ?? "Failed to create medicine", error: result },
                };
            }
            revalidateTag("medicines", "profile");

            return { data: result, error: null };
        } catch (error) {
            return { data: null, error: { message: "Something went wrong", error } };
        }
    },
    getAllMedicines: async (params?: GetMedicineParams) => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/medicines`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.set(key, value as string);
                    }
                });
            }

            const config: RequestInit = {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: {
                    tags: ["medicines"],
                }
            };

            const res = await fetch(url.toString(), config);
            const responseData = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: responseData?.message ?? "No medicine found", error: null },
                };
            }

            return { data: responseData.data || [], meta: responseData.meta, error: null };
        } catch (error) {
            console.error("Fetch Error:", error);
            return { data: null, error: { message: "Something went wrong", error } };
        }
    },

    getMedicineById: async (id: string) => {
        try {

            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/medicines/${id}`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok || !result.data) {
                return {
                    data: null,
                    error: { message: result.message || "No medicine found", error: null },
                };
            }

            return { data: result.data, error: null };
        } catch (error) {
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },

    deleteMedicine: async (id: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/medicines/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                return {
                    data: null,
                    error: {
                        message: data?.message ?? "Failed to delete medicine",
                        error: data ?? null,
                    },
                };
            }

            return { data, error: null };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },

    updateMedicine: async (id: string, data: UpdateMedicine) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/medicines/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
                cache: "no-store",
            });

            if (!res.ok) {
                const errBody = await res.json().catch(() => null);
                return {
                    data: null,
                    error: {
                        message:
                            errBody?.message ?? "Failed to update medicine",
                        error: errBody ?? null,
                    },
                };
            }

            const updated = await res.json();
            return { data: updated, error: null };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },
};