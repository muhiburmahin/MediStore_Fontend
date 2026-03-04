// src/components/modules/admin/DashboardOverview.tsx

import React from 'react';
import {
    Users,
    ShoppingBag,
    Pill,
    Layers,
    TrendingUp,
    CheckCircle2,
    Clock,
    XCircle,
    Truck
} from 'lucide-react';

// আপনার ব্যাকএন্ড স্ট্রাকচার অনুযায়ী টাইপ ডিফিনিশন
interface DashboardStats {
    user: {
        total: number;
        customer: number;
        seller: number;
        admin: number;
    };
    category: {
        total: number;
    };
    medicine: {
        total: number;
    };
    order: {
        total: number;
        placed: number;
        processing: number;
        shipped: number;
        delivered: number;
        cancelled: number;
        placedAmount: number;
        processingAmount: number;
        shippedAmount: number;
        deliveredAmount: number;
        cancelledAmount: number;
    };
    review: {
        total: number;
    };
}

interface Props {
    stats: DashboardStats;
}

const DashboardOverview: React.FC<Props> = ({ stats }) => {
    const { user, category, medicine, order, review } = stats;

    // টপ কার্ডস কনফিগারেশন
    const topCards = [
        {
            title: "Total Revenue",
            value: `৳${order.deliveredAmount.toLocaleString()}`,
            description: "From delivered orders",
            icon: <TrendingUp className="w-6 h-6 text-green-600" />,
            borderColor: "border-l-green-600"
        },
        {
            title: "Total Orders",
            value: order.total,
            description: `${order.delivered} completed orders`,
            icon: <ShoppingBag className="w-6 h-6 text-blue-600" />,
            borderColor: "border-l-blue-600"
        },
        {
            title: "Active Users",
            value: user.total,
            description: `${user.customer} customers & ${user.seller} sellers`,
            icon: <Users className="w-6 h-6 text-blue-600" />,
            borderColor: "border-l-blue-600"
        },
        {
            title: "Inventory",
            value: medicine.total,
            description: `Across ${category.total} categories`,
            icon: <Pill className="w-6 h-6 text-green-600" />,
            borderColor: "border-l-green-600"
        }
    ];

    return (
        <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
                <p className="text-sm text-slate-500 font-medium bg-white px-3 py-1 rounded-full border border-slate-200">
                    Real-time Statistics
                </p>
            </div>

            {/* Primary Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topCards.map((card, idx) => (
                    <div key={idx} className={`bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-l-4 ${card.borderColor}`}>
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{card.title}</span>
                            {card.icon}
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">{card.value}</h2>
                        <p className="text-xs text-slate-400 mt-2 font-medium">{card.description}</p>
                    </div>
                ))}
            </div>

            {/* Order Status & Financial Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Order Status Breakdown */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        Order Fulfillment Status
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <StatusTile label="Placed" count={order.placed} amount={order.placedAmount} icon={<Clock className="text-blue-600" />} />
                        <StatusTile label="Processing" count={order.processing} amount={order.processingAmount} icon={<Layers className="text-blue-600" />} />
                        <StatusTile label="Shipped" count={order.shipped} amount={order.shippedAmount} icon={<Truck className="text-blue-600" />} />
                        <StatusTile label="Delivered" count={order.delivered} amount={order.deliveredAmount} icon={<CheckCircle2 className="text-green-600" />} />
                        <StatusTile label="Cancelled" count={order.cancelled} amount={order.cancelledAmount} icon={<XCircle className="text-red-600" />} />
                        <StatusTile label="Reviews" count={review.total} amount={0} isReview icon={<Layers className="text-green-600" />} />
                    </div>
                </div>

                {/* User Role Distribution */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">User Roles</h3>
                    <div className="space-y-4">
                        <RoleBar label="Customers" count={user.customer} total={user.total} color="bg-blue-600" />
                        <RoleBar label="Sellers" count={user.seller} total={user.total} color="bg-green-600" />
                        <RoleBar label="Admins" count={user.admin} total={user.total} color="bg-slate-700" />
                    </div>
                    <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                        <p className="text-sm text-slate-600 text-center font-medium">
                            Total Managed Users: <span className="text-blue-600">{user.total}</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Helper Components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StatusTile = ({ label, count, amount, icon, isReview = false }: any) => (
    <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
        <div className="flex items-center gap-2 mb-2">
            {icon}
            <span className="text-xs font-bold text-slate-500 uppercase">{label}</span>
        </div>
        <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-slate-800">{count}</span>
            {!isReview && <span className="text-xs font-semibold text-green-700">৳{amount.toLocaleString()}</span>}
        </div>
    </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RoleBar = ({ label, count, total, color }: any) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-600">{label}</span>
                <span className="text-slate-900">{count}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
                <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

export default DashboardOverview;