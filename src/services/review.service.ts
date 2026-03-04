// import { cookies } from "next/headers";
// import { env } from "@/env";
// import { Review } from "@/types";

// const API_URL = env.API_URL;

// export const reviewService = {
//     createReview: async (data: Partial<Review>) => {
//         try {
//             const cookieStore = await cookies();
//             const res = await fetch(`${API_URL}/review`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Cookie: cookieStore.toString(),
//                 },
//                 body: JSON.stringify(data),
//                 cache: "no-store",
//             });

//             if (!res.ok) {
//                 const errBody = await res.json().catch(() => null);
//                 return {
//                     data: null,
//                     error: {
//                         message: errBody?.message ?? "Failed to create review",
//                         error: errBody ?? null,
//                     },
//                 };
//             }

//             const updated = await res.json();
//             return { data: updated, error: null };
//         } catch (error) {
//             console.log(error);
//             return {
//                 data: null,
//                 error: { message: "Something went wrong", error },
//             };
//         }
//     },
// };