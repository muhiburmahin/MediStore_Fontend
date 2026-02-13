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

    let routes: Routes[] = [];

    switch (user.role) {
        case Roles.admin:
            routes = adminRoutes;
            break;
        case Roles.seller:
            routes = sellerRoutes;
            break;
        case Roles.customer:
            routes = userRoutes;
            break;
        default:
            routes = [];
            break;
    }
    return (
        <SidebarProvider>
            <AppSidebar user={user} className="border-r border-blue-50" />

            <SidebarInset className="bg-[#f8fafc]">

                <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-md sticky top-0 z-10 px-6 transition-all">
                    <div className="flex items-center gap-2 flex-1">
                        <div className="p-1.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-sm shadow-blue-200/50">
                            <SidebarTrigger className="-ml-1" />
                        </div>

                        <Separator orientation="vertical" className="mx-2 h-5 bg-blue-200/50" />

                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink
                                        href="#"
                                        className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
                                    >
                                        MediStore Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block text-slate-300" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-[13px] font-black text-blue-600 flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100/50">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        Overview
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex flex-col items-end">
                            <p className="text-[12px] font-black text-slate-900">{user?.name}</p>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">{user?.role}</p>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <div className="flex flex-1 flex-col gap-6 p-6 md:p-8 max-w-[1600px] mx-auto w-full">

                    <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {roleView[role]}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
