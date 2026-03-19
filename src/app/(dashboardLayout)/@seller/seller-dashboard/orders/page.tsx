import OrderListTable from "@/components/modules/seller/OrderListTable";
import { fetchSellerOrdersAction } from '@/actions/order.action';

export default async function SellerOrdersPage() {
    const response = await fetchSellerOrdersAction();
    const ordersData = response?.data || [];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold italic underline decoration-blue-500 mb-6 uppercase">
                Order <span className="text-blue-600">Management</span>
            </h1>

            <OrderListTable initialOrders={ordersData} />
        </div>
    );
}