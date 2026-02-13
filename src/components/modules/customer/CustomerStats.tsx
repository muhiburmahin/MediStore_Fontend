import { ShoppingBag, Clock, CheckCircle, Wallet } from "lucide-react";

export const CustomerStats = ({ stats }: { stats: any }) => {
    const cards = [
        { title: "Total Orders", value: stats.totalOrders, icon: <ShoppingBag />, color: "border-blue-500/50 bg-blue-500/10 text-blue-500" },
        { title: "In Progress", value: stats.pendingOrders, icon: <Clock />, color: "border-yellow-500/50 bg-yellow-500/10 text-yellow-500" },
        { title: "Completed", value: stats.completedOrders, icon: <CheckCircle />, color: "border-green-500/50 bg-green-500/10 text-green-500" },
        { title: "Total Spent", value: `৳${stats.totalSpent}`, icon: <Wallet />, color: "border-purple-500/50 bg-purple-500/10 text-purple-500" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <div key={index} className={`p-6 rounded-2xl border ${card.color} transition-all hover:scale-105`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{card.title}</p>
                            <h3 className="text-3xl font-black mt-2">{card.value}</h3>
                        </div>
                        <div className="p-2 rounded-lg bg-white/5">
                            {card.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};