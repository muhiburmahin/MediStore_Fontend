import { env } from "@/env";
import { cookies } from "next/headers";
const API_URL = env.API_URL;
import { UpdateUser } from "@/types";

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

            const res = await fetch(`${API_URL}/user/me`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
                next: { tags: ["me"] },
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
            console.log(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
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
            const session = await res.json();
            if (session === null) {
                return {
                    data: null,
                    error: { message: "No session found", error: null },
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
}


