import { Routes } from "@/types";

export const sellerRoutes: Routes[] = [
    {
        title: "Seller Management",
        items: [
            {
                title: "Dashboard",
                url: "/seller-dashboard/dashboard",
            },
            {
                title: "My Profile",
                url: "/seller-dashboard/my-profile",
            },
            {
                title: "Medicines",
                url: "/seller-dashboard/medicines",
            },
            {
                title: "Orders",
                url: "/seller-dashboard/orders",
            },
        ],
    },
];