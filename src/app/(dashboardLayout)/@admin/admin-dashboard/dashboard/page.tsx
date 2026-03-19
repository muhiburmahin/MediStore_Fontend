import DashboardOverview from "@/components/modules/admin/dashboard-overviev";
import { userService } from "@/services/user.service";

export default async function AdminDashboardPage() {
    const { data, error } = await userService.getAdminStats();

    if (error || !data || !data.stats) {
        return <div className="p-10 text-red-500 font-bold">Error loading dashboard stats!</div>;
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <DashboardOverview stats={data.stats} />
        </div>
    );
}