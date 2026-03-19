"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { orderService } from "@/services/order.service";
import { CreateOrder, OrderStatus } from "@/types";

export const createOrderAction = async (data: CreateOrder) => {
    try {
        const result = await orderService.createOrder(data);
        if (result.data) revalidatePath("/", "layout");
        return { success: !!result.data, data: result.data, error: result.error };
    } catch (error) {
        return { success: false, data: null, error: "Failed to place order" };
    }
}

export const fetchSellerOrdersAction = async () => {
    try {
        const result = await orderService.getSellerOrders();
        return {
            success: !!result.data,
            data: result.data || [],
            error: result.error || null,
        };
    } catch (error) {
        return { success: false, data: [], error: "Failed to fetch orders" };
    }
};

export const updateOrderStatusAction = async (id: string, status: string) => {
    try {
        const result = await orderService.updateOrderById(id, { status: status as OrderStatus });

        if (result.data) {
            revalidateTag("seller-orders", "max");
            revalidateTag("orders", "max");
            revalidatePath("/seller-dashboard/orders");
        }
        return { success: !!result.data, data: result.data, error: result.error };
    } catch (error) {
        return { success: false, data: null, error: "Failed to update status" };
    }
};

export const deleteOrderAction = async (id: string) => {
    try {
        const result = await orderService.deleteOrderById(id);
        if (result.data) {
            revalidateTag("seller-orders", "max");
            revalidatePath("/", "layout");
        }
        return { success: !!result.data, data: result.data, error: result.error };
    } catch (error) {
        return { success: false, data: null, error: "Failed to delete order" };
    }
};

