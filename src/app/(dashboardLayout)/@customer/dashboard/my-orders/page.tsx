import MyOrdersTable from "@/components/modules/customer/MyOrdersTable";
import { orderService } from "../../../../../services/order.service";
import { userService } from "../../../../../services/user.service";
import { Order, User } from "../../../../../types";
import { ShoppingBag, AlertCircle } from "lucide-react";

export default async function MyOrdersPage() {
    const { data: userData, error: userError } = await userService.getMyProfile();

    if (userError || !userData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
                <AlertCircle size={48} className="mb-4 text-red-500/50" />
                <h1 className="text-xl font-medium">User profile not found</h1>
            </div>
        );
    }

    const user = (userData.data || userData) as User;
    const { data: orders, error: orderError } = await orderService.getMyOrders();

    if (orderError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-400">
                <AlertCircle size={48} className="mb-4" />
                <h1 className="text-xl font-medium">Failed to load order history</h1>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-2 bg-blue-600 rounded-lg text-white">
                            <ShoppingBag size={20} />
                        </div>
                        <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Purchase History</span>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">My Orders</h2>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                {orders && orders.length > 0 ? (
                    <div className="p-2">
                        <MyOrdersTable orders={orders} user={user} />
                    </div>
                ) : (
                    <div className="py-24 flex flex-col items-center justify-center text-center">
                        <ShoppingBag size={40} className="text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No orders found</h3>
                    </div>
                )}
            </div>
        </div>
    );
}