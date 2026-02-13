"use server";

import { OrderData } from "@/types/cart";

export const createOrder = async (orderData: OrderData) => {
    try {
        console.log("Saving Order:", orderData);

        return { success: true, message: "Order created successfully" };
    } catch (error) {
        return { success: false, message: "Could not create order" };
    }
};