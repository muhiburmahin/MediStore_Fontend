import DashboardOverview from "@/components/modules/admin/dashboard-overviev";

export default function AdminDashboardPage() {
    // আপনার ব্যাকএন্ড কোডের স্ট্রাকচার অনুযায়ী ডামি ডাটা
    const mockStats = {
        user: {
            total: 150,
            customer: 120,
            seller: 25,
            admin: 5,
        },
        category: {
            total: 12,
        },
        medicine: {
            total: 450,
        },
        order: {
            total: 85,
            placed: 10,
            processing: 15,
            shipped: 20,
            delivered: 35,
            cancelled: 5,
            placedAmount: 12000,
            processingAmount: 18000,
            shippedAmount: 25000,
            deliveredAmount: 45000,
            cancelledAmount: 5000,
        },
        review: {
            total: 230,
        },
    };

    return (
        <div className="bg-slate-50">
            <DashboardOverview stats={mockStats} />
        </div>
    );
}