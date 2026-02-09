import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        BACKEND_URL: z.string().min(1),
        FRONTEND_URL: z.string().min(1),
        API_URL: z.string().min(1),
        AUTH_URL: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_TEST: z.string().min(1),
    },
    runtimeEnv: {
        BACKEND_URL: process.env.BACKEND_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        API_URL: process.env.API_URL,
        AUTH_URL: process.env.AUTH_URL,

        NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,
    },
});