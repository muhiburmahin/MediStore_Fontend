import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const categoryService = {
    createCategory: async (name: string, imageUrl?: string | null) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ name, imageUrl }),
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: result?.message ?? "Failed to create category" },
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
    getAllCategories: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/categories`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next: { tags: ["categories"] },
                cache: "no-store",
            });

            const response = await res.json();

            if (!res.ok || !response.success) {
                return {
                    data: null,
                    error: { message: response.message || "No category found" },
                };
            }

            return { data: response.data, error: null };
        } catch (error) {
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },

    deleteCategoryById: async (id: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/categories/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: result?.message ?? "Failed to delete category" },
                };
            }

            return { data: result, error: null };
        } catch (error) {
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },
};