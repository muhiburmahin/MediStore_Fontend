// import { cookies } from "next/headers";
// import { env } from "@/env";
// import { CreateOrder, OrderStatus } from "@/types";

// const API_URL = env.API_URL;

// export const orderService = {
//     createOrder: async (data: CreateOrder) => {
//         try {
//             const cookieStore = await cookies();
//             const res = await fetch(`${API_URL}/orders`, {
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
//                         message: errBody?.message ?? "Failed to create order",
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

//     getAllOrders: async () => {
//         try {
//             const cookieStore = await cookies();
//             const res = await fetch(`${API_URL}/orders`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Cookie: cookieStore.toString(),
//                 },
//                 cache: "no-store",
//                 next: { tags: ["orders"] },
//             });

//             if (!res.ok) {
//                 const errBody = await res.json().catch(() => null);
//                 return {
//                     data: null,
//                     error: {
//                         message: errBody?.message ?? "Failed to get order",
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

//     updateOrderById: async (id: string, orderData: { status: OrderStatus }) => {
//         try {
//             const cookieStore = await cookies();
//             const res = await fetch(`${API_URL}/orders/${id}`, {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Cookie: cookieStore.toString(),
//                 },
//                 body: JSON.stringify(orderData),
//                 cache: "no-store",
//             });

//             if (!res.ok) {
//                 const errBody = await res.json().catch(() => null);
//                 return {
//                     data: null,
//                     error: {
//                         message: errBody?.message ?? "Failed to update order",
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

//     deleteOrderById: async (id: string) => {
//         try {
//             const cookieStore = await cookies();
//             const res = await fetch(`${API_URL}/orders/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Cookie: cookieStore.toString(),
//                 },
//                 cache: "no-store",
//             });

//             if (!res.ok) {
//                 const errBody = await res.json().catch(() => null);
//                 return {
//                     data: null,
//                     error: {
//                         message: errBody?.message ?? "Failed to delete order",
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

//     getMyOrders: async (id: string) => {
//         try {
//             const cookieStore = await cookies();
//             const res = await fetch(`${API_URL}/orders/${id}`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Cookie: cookieStore.toString(),
//                 },
//                 cache: "no-store",
//             });

//             if (!res.ok) {
//                 const errBody = await res.json().catch(() => null);
//                 return {
//                     data: null,
//                     error: {
//                         message: errBody?.message ?? "Failed to get order",
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