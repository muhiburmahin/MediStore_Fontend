import { ShoppingBag, Clock, Wallet, Star } from "lucide-react";

interface UserStats {
    totalOrders: number;
    activeOrders: number;
    pendingReviews: number;
    totalSpent: number;
}

export const CustomerStats = ({ stats }: { stats: UserStats | null }) => {
    const cards = [
        {
            title: "Total Orders",
            value: stats?.totalOrders || 0,
            icon: <ShoppingBag size={24} />,
            color: "border-blue-500/10 bg-blue-50/50 dark:bg-blue-500/5 text-blue-600 dark:text-blue-400"
        },
        {
            title: "Active Orders",
            value: stats?.activeOrders || 0,
            icon: <Clock size={24} />,
            color: "border-yellow-500/10 bg-yellow-50/50 dark:bg-yellow-500/5 text-yellow-600 dark:text-yellow-400"
        },
        {
            title: "Pending Reviews",
            value: stats?.pendingReviews || 0,
            icon: <Star size={24} />,
            color: "border-red-500/10 bg-red-50/50 dark:bg-red-500/5 text-red-600 dark:text-red-400"
        },
        {
            title: "Total Spent",
            value: `৳${stats?.totalSpent || 0}`,
            icon: <Wallet size={24} />,
            color: "border-purple-500/10 bg-purple-50/50 dark:bg-purple-500/5 text-purple-600 dark:text-purple-400"
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {cards.map((card, index) => (
                <div key={index} className={`p-6 rounded-3xl border-2 ${card.color} shadow-sm transition-all hover:shadow-md`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">{card.title}</p>
                            <h3 className="text-3xl font-black mt-1">{card.value}</h3>
                        </div>
                        <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm text-inherit">
                            {card.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};