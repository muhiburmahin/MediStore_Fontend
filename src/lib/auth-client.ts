import { createAuthClient } from "better-auth/react";

function authBaseURL() {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/api/auth`;
}

export const authClient = createAuthClient({
    baseURL: authBaseURL(),
    fetchOptions: {
        credentials: "include",
    },
});