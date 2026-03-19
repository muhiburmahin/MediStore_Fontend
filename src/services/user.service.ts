import { env } from "@/env";
import { cookies } from "next/headers";
const API_URL = env.API_URL;
import { UpdateUser } from "@/types";
import { revalidateTag } from "next/cache";

export const userService = {
    getSession: async function () {
        const AUTH_URL = env.AUTH_URL;
        const cookieStore = await cookies();
        const cookieString = cookieStore
            .getAll()
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join("; ");

        try {
            const res = await fetch(`${AUTH_URL}/get-session`, {
                method: "GET",
                headers: {
                    "Cookie": cookieString,
                    "Accept": "application/json",
                },
                cache: "no-store",
            });

            const session = await res.json();

            if (!res.ok || !session) {
                return {
                    data: null,
                    error: "No session found"
                };
            }

            return {
                data: session,
                error: null
            };
        }
        catch (error) {
            console.error("Backend fetch error:", error);
            return {
                data: null,
                error: "Something Went wrong"
            };
        }
    },
    getMyProfile: async () => {
        try {
            const cookieStore = await cookies();
            const accessToken = cookieStore.get("accessToken")?.value;

            const res = await fetch(`${API_URL}/user/me`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Cookie": cookieStore.toString(),
                },
                cache: "no-store",
                next: { tags: ["me"] },
            });

            if (!res.ok) {
                const errorResult = await res.json().catch(() => ({}));
                return {
                    data: null,
                    error: errorResult.message || `Error: ${res.status}`
                };
            }

            const result = await res.json();
            return { data: result.data, error: null };

        } catch (error) {
            console.error("Profile Fetch Error:", error);
            return { data: null, error: "Network or Server Error" };
        }
    },


    getAllUsers: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/admin/users`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
                next: { tags: ["users"] },
            });

            const result = await res.json();


            if (!res.ok) {
                console.error("Fetch Error:", result.message);
                return {
                    data: null,
                    error: { message: result.message || "Failed to fetch users", error: null },
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

    getCustomerStats: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/customer/stats`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const session = await res.json();
            if (session === null) {
                return {
                    data: null,
                    error: { message: "No session found", error: null },
                };
            }

            return { data: session, error: null };
        } catch (error) {
            console.error(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },

    getSellerStats: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/seller/stats`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const session = await res.json();
            if (session === null) {
                return {
                    data: null,
                    error: { message: "No session found", error: null },
                };
            }

            return { data: session, error: null };
        } catch (error) {
            console.error(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },
    getAdminStats: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/stats`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok || !result.success) {
                return {
                    data: null,
                    error: result.message || "Failed to fetch stats",
                };
            }

            return { data: result.data || result.stats, error: null };
        } catch (error) {
            console.error("Admin Stats Fetch Error:", error);
            return { data: null, error: "Something went wrong" };
        }
    },
    updateUser: async (id: string, data: UpdateUser) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/user/update/${id}`, {
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
                        message: errBody?.message ?? "Failed to update user",
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
    getStats: async (type: "admin" | "seller" | "customer") => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/${type}/stats`, {
                headers: { Cookie: cookieStore.toString() },
                cache: "no-store",
            });

            const result = await res.json();
            return { data: result.data, error: res.ok ? null : result.message };
        } catch (error) {
            return { data: null, error: "Stats fetch failed" };
        }
    },


    adminUpdateUser: async (id: string, data: UpdateUser) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
                cache: "no-store",
            });

            const result = await res.json();
            if (res.ok) {
                revalidateTag("users", "");
            }
            return { data: result.data, error: res.ok ? null : result.message };
        } catch (error) {
            return { data: null, error: "Admin update failed" };
        }
    },

};



