import { AppSidebar } from "@/components/layout/app-sidebar";
import { userService } from "@/services/user.service"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Roles } from '../../constants/role';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/adminRoute";
import { sellerRoutes } from "@/routes/sellerRoute";
import { userRoutes } from "@/routes/userRoutes";
import { Routes } from "@/types/route.type";

type Role = "ADMIN" | "SELLER" | "CUSTOMER";

export default async function DashboardLayout({
    admin,
    seller,
    customer,
}: Readonly<{
    admin: React.ReactNode;
    seller: React.ReactNode;
    customer: React.ReactNode;
}>) {
    const { data } = await userService.getSession();
    const user = data.user;
    const role = data?.user?.role as Role | undefined;

    const roleView = {
        ADMIN: admin,
        SELLER: seller,
        CUSTOMER: customer,
    } as const;

    if (!role) return null;

    return (
        <SidebarProvider>
            {/* Sidebar with Dark Mode Support */}
            <AppSidebar
                user={user}
                className="border-r border-blue-50 dark:border-slate-800 transition-colors"
            />

            {/* Main Wrapper with Mode Sensitive Background */}
            <SidebarInset className="bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300">

                {/* Header - Glassmorphism style for both modes */}
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 px-6 transition-all">
                    <div className="flex items-center gap-2 flex-1">
                        {/* Sidebar Trigger Button Styling */}
                        <div className="p-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 shadow-sm shadow-blue-200/50">
                            <SidebarTrigger className="-ml-1" />
                        </div>

                        <Separator orientation="vertical" className="mx-2 h-5 bg-blue-200/50 dark:bg-slate-700" />

                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink
                                        href="#"
                                        className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        MediStore Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block text-slate-300 dark:text-slate-700" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-[13px] font-black text-blue-600 dark:text-blue-400 flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg border border-blue-100/50 dark:border-blue-800/50">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        Overview
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    {/* User Profile Info in Header */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex flex-col items-end">
                            <p className="text-[12px] font-black text-slate-900 dark:text-slate-100 transition-colors">
                                {user?.name}
                            </p>
                            <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-tighter">
                                {user?.role}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Main Content Area - Full Mode Sensitive Container */}
                <main className="flex-1 p-6 md:p-8 max-w-[1600px] mx-auto w-full overflow-y-auto bg-transparent transition-colors">
                    <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {roleView[role]}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}