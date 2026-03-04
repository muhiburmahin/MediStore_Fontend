import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const categoryService = {
    addCategory: async (name: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ name }),
                cache: "no-store",
            });

            if (!res.ok) {
                const errBody = await res.json().catch(() => null);
                return {
                    data: null,
                    error: {
                        message:
                            errBody?.message ?? "Failed to create category",
                        error: errBody ?? null,
                    },
                };
            }

            const created = await res.json();
            return { data: created, error: null };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },
    getAllCategorys: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/categories`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
                next: { tags: ["categories"] },
            });
            const session = await res.json();
            if (session === null) {
                return {
                    data: null,
                    error: { message: "No category found", error: null },
                };
            }

            return { data: session, error: null };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },
    deleteCategory: async (id: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/categories/${id}`, {
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
                        message: data?.message ?? "Failed to delete category",
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
};