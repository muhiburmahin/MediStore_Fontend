import { Routes } from "@/types";

export const adminRoutes: Routes[] = [
    {
        title: "Admin Management",
        items: [
            {
                title: "Dashboard",
                url: "/admin-dashboard/dashboard",
            },
            {
                title: "My Profile",
                url: "/admin-dashboard/my-profile",
            },
            {
                title: "Categories",
                url: "/admin-dashboard/categories",
            },
            {
                title: "Medicines",
                url: "/admin-dashboard/medicines",
            },
            {
                title: "Orders",
                url: "/admin-dashboard/orders",
            },
            {
                title: "Users",
                url: "/admin-dashboard/users",
            },
        ],
    },
];