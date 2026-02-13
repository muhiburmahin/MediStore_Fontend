import { Routes } from "@/types";

export const userRoutes: Routes[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Dashboard",
                url: "/dashboard",
            },
            {
                title: "My Profile",
                url: "/dashboard/my-profile",
            },
            {
                title: "My Orders",
                url: "/dashboard/my-orders",
            },
        ],
    },
];