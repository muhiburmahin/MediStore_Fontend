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

    const topCards = [
        {
            title: "Total Revenue",
            value: `৳${order.deliveredAmount.toLocaleString()}`,
            description: "From delivered orders",
            icon: <TrendingUp className="w-6 h-6 text-white" />,
            bgColor: "bg-green-600",
            textColor: "text-white"
        },
        {
            title: "Total Orders",
            value: order.total,
            description: `${order.delivered} completed orders`,
            icon: <ShoppingBag className="w-6 h-6 text-white" />,
            bgColor: "bg-blue-600",
            textColor: "text-white"
        },
        {
            title: "Active Users",
            value: user.total,
            description: `${user.customer} customers & ${user.seller} sellers`,
            icon: <Users className="w-6 h-6 text-white" />,
            bgColor: "bg-blue-600",
            textColor: "text-white"
        },
        {
            title: "Inventory",
            value: medicine.total,
            description: `Across ${category.total} categories`,
            icon: <Pill className="w-6 h-6 text-white" />,
            bgColor: "bg-green-600",
            textColor: "text-white"
        }
    ];

    return (
        <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800 border-b-4 border-blue-600 pb-1">Admin Dashboard</h1>
                <p className="text-sm text-white font-medium bg-green-600 px-4 py-1.5 rounded-full shadow-lg">
                    Real-time Statistics
                </p>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topCards.map((card, idx) => (
                    <div key={idx} className={`${card.bgColor} p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300`}>
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-bold text-slate-100 uppercase tracking-widest">{card.title}</span>
                            <div className="p-2 bg-white/20 rounded-lg">
                                {card.icon}
                            </div>
                        </div>
                        <h2 className={`text-3xl font-extrabold ${card.textColor}`}>{card.value}</h2>
                        <p className="text-xs text-slate-100 mt-2 font-medium opacity-90">{card.description}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order Status Breakdown */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16"></div>
                    <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        Order Fulfillment Status
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <StatusTile label="Placed" count={order.placed} amount={order.placedAmount} icon={<Clock className="text-blue-600" />} theme="blue" />
                        <StatusTile label="Processing" count={order.processing} amount={order.processingAmount} icon={<Layers className="text-blue-600" />} theme="blue" />
                        <StatusTile label="Shipped" count={order.shipped} amount={order.shippedAmount} icon={<Truck className="text-blue-600" />} theme="blue" />
                        <StatusTile label="Delivered" count={order.delivered} amount={order.deliveredAmount} icon={<CheckCircle2 className="text-green-600" />} theme="green" />
                        <StatusTile label="Cancelled" count={order.cancelled} amount={order.cancelledAmount} icon={<XCircle className="text-red-600" />} theme="red" />
                        <StatusTile label="Reviews" count={review.total} amount={0} isReview icon={<Layers className="text-green-600" />} theme="green" />
                    </div>
                </div>

                {/* User Role Distribution */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                    <h3 className="text-xl font-black text-slate-800 mb-8">User Roles Distribution</h3>
                    <div className="space-y-6">
                        <RoleBar label="Customers" count={user.customer} total={user.total} color="bg-blue-600" />
                        <RoleBar label="Sellers" count={user.seller} total={user.total} color="bg-green-600" />
                        <RoleBar label="Admins" count={user.admin} total={user.total} color="bg-slate-700" />
                    </div>
                    <div className="mt-12 p-6 bg-blue-600 rounded-2xl shadow-inner text-white">
                        <p className="text-sm font-bold text-center uppercase tracking-widest opacity-80">Total Managed Users</p>
                        <h4 className="text-4xl font-black text-center mt-2">{user.total}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Components with proper Types
interface TileProps {
    label: string;
    count: number;
    amount: number;
    icon: React.ReactNode;
    isReview?: boolean;
    theme: 'blue' | 'green' | 'red';
}

const StatusTile = ({ label, count, amount, icon, isReview = false, theme }: TileProps) => {
    const themeStyles = {
        blue: "hover:border-blue-600 hover:bg-blue-50",
        green: "hover:border-green-600 hover:bg-green-50",
        red: "hover:border-red-600 hover:bg-red-50"
    };

    return (
        <div className={`p-5 rounded-2xl bg-white border-2 border-slate-100 transition-all duration-300 shadow-sm ${themeStyles[theme]}`}>
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-slate-100 rounded-lg">{icon}</div>
                <span className="text-xs font-black text-slate-500 uppercase tracking-tighter">{label}</span>
            </div>
            <div className="flex justify-between items-end">
                <span className="text-3xl font-black text-slate-900">{count}</span>
                {!isReview && <span className={`text-sm font-bold ${theme === 'green' ? 'text-green-600' : 'text-slate-600'}`}>৳{amount.toLocaleString()}</span>}
            </div>
        </div>
    );
};

interface BarProps {
    label: string;
    count: number;
    total: number;
    color: string;
}

const RoleBar = ({ label, count, total, color }: BarProps) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm font-black uppercase tracking-tight">
                <span className="text-slate-500">{label}</span>
                <span className="text-slate-900">{count}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-4 p-1 shadow-inner">
                <div
                    className={`${color} h-2 rounded-full transition-all duration-1000 ease-out shadow-lg`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default DashboardOverview;