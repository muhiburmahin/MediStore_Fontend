"use client";
import { useEffect, useState } from "react";
import { Order } from "@/types/order.type";
import { customerDashboardService } from "@/services/dashboard.service";
import { OrderList } from "@/components/modules/customer/OrderList";

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const ordersData = await customerDashboardService.getAllOrders();
            setOrders(ordersData);
        };
        fetchOrders();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-white">Order <span className="text-blue-600">History</span></h1>
                <p className="text-slate-500 font-medium">Check the status of your recent and past orders.</p>
            </div>

            {orders.length > 0 ? (
                <OrderList orders={orders} />
            ) : (
                <div className="p-20 text-center bg-slate-900 rounded-3xl border border-slate-800">
                    <p className="text-slate-500 font-bold">No orders found yet.</p>
                </div>
            )}
        </div>
    );
}