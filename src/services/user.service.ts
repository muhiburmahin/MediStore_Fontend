import { env } from "@/env";
import { cookies } from "next/headers";

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
    }
}


