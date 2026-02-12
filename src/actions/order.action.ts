"use server";

import { OrderData } from "@/types/cart";

export const createOrder = async (orderData: OrderData) => {
    try {
        // এখানে আপনার DB লজিক হবে (যেমন: prisma বা mongoose call)
        console.log("Saving Order:", orderData);

        // মক রেসপন্স (আপনার API অনুযায়ী পরিবর্তন করুন)
        return { success: true, message: "Order created successfully" };
    } catch (error) {
        return { success: false, message: "Could not create order" };
    }
};