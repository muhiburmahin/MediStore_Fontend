"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/role";
import { adminRoutes } from "@/routes/adminRoute";
import { sellerRoutes } from "@/routes/sellerRoute";
import { userRoutes } from "@/routes/userRoutes";
import { Routes } from "@/types";
import { LayoutDashboard } from "lucide-react";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    role: string;
  };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  let routes: Routes[] = [];

  switch (user?.role?.toLowerCase()) {
    case Roles.admin.toLowerCase():
      routes = adminRoutes;
      break;
    case Roles.seller.toLowerCase():
      routes = sellerRoutes;
      break;
    case Roles.customer.toLowerCase():
      routes = userRoutes;
      break;
    default:
      routes = [];
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>

        {routes.length === 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-red-500">
              No routes found for {user.role}
            </SidebarGroupLabel>
          </SidebarGroup>
        )}

        {/* route maping */}
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="px-3">
            <SidebarGroupLabel className="font-black text-[18px] py-12 tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent uppercase">
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-4">
                {group.items?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="h-auto w-full p-0 hover:bg-transparent active:bg-transparent"
                    >
                      <Link href={item.url} className="w-full block">
                        <div className="flex items-center p-[2px] rounded-full bg-gradient-to-r from-blue-600 to-green-500 shadow-md shadow-blue-500/10">

                          <div className="flex items-center gap-3 w-full px-4 py-2 rounded-full bg-white dark:bg-slate-950">

                            <div className="flex items-center justify-center text-blue-600">
                              {item.icon || <LayoutDashboard size={20} strokeWidth={2.5} />}
                            </div>

                            <span className="font-black text-[14px] tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent uppercase">
                              {item.title}
                            </span>

                          </div>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}