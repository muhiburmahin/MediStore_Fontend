import { Medicine } from "@/types/medicine.type";
import { Order, OrderStatus } from "@/types/order.type";

import { Role, UserStatus } from "@/types/user.type";
export interface IDashboardStats {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    totalSpent: number;
}

import { User } from "@/types/user.type";

export interface IDashboardStats {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    totalSpent: number;
}

export const customerDashboardService = {
    getDashboardStats: async (): Promise<IDashboardStats> => {
        return {
            totalOrders: 15,
            pendingOrders: 2,
            completedOrders: 13,
            totalSpent: 4500,
        };
    },

    getRecentOrders: async (): Promise<Order[]> => {
        return [
            {
                id: "ord-101",
                customerId: "user-1",
                status: OrderStatus.DELIVERED,
                shippingAddress: "Dhanmondi, Dhaka",
                totalAmount: 1200,
                createdAt: new Date(),
                updatedAt: new Date(),
                items: [
                    {
                        medicineId: "med-1",
                        quantity: 2,
                        price: 600,
                        medicine: {
                            name: "Napa Extend",
                            imageUrl: "https://example.com/napa.jpg"
                        } as unknown as Medicine
                    }
                ]
            },
            {
                id: "ord-102",
                customerId: "user-1",
                status: OrderStatus.PROCESSING,
                shippingAddress: "Banani, Dhaka",
                totalAmount: 500,
                createdAt: new Date(),
                updatedAt: new Date(),
                items: [
                    {
                        medicineId: "med-2",
                        quantity: 1,
                        price: 500,
                        medicine: {
                            name: "Sevet",
                            imageUrl: "https://example.com/napa.jpg"
                        } as unknown as Medicine
                    }
                ]
            }
        ];
    },

    // getDashboardStats: async (): Promise<IDashboardStats> => {
    //     return { totalOrders: 15, pendingOrders: 2, completedOrders: 13, totalSpent: 4500 };
    // },

    getUserProfile: async (): Promise<User> => {
        return {
            id: "user-123",
            name: "MD Muhibur Rahman",
            email: "mdmahincse@gmail.com",
            emailVerified: false,
            image: null,
            role: Role.CUSTOMER,
            status: UserStatus.ACTIVE,
            phone: "017XXXXXXXX",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
    },
    //     getAllOrders: async (): Promise<Order[]> => {
    //   const response = await fetch('https://your-api.com/orders', {
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    //   return await response.json();
    // }
    getAllOrders: async (): Promise<Order[]> => {
        return [
            {
                id: "ord-7741",
                customerId: "user-123",
                status: OrderStatus.DELIVERED,
                totalAmount: 150,
                shippingAddress: "Dhanmondi, Dhaka",
                createdAt: new Date("2026-02-12"),
                updatedAt: new Date(),
            },
            {
                id: "ord-8852",
                customerId: "user-123",
                status: OrderStatus.PROCESSING,
                totalAmount: 360,
                shippingAddress: "Dhanmondi, Dhaka",
                createdAt: new Date("2026-02-10"),
                updatedAt: new Date(),
            }
        ];
    }
};

