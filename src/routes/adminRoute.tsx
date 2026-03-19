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
                title: "All Users",
                url: "/admin-dashboard/users",
            },
            {
                title: "My Profile",
                url: "/admin-dashboard/my-profile",
            },
            {
                title: "Go-TO-Home",
                url: "/",
            },
        ],
    },
];