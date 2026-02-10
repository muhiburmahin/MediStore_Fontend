"use client"

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronsUpDown, LogOut } from "lucide-react";

export function NavUser({ user }: { user: any }) {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                    router.refresh();
                },
            },
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                >
                    <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 text-white shadow-lg shadow-indigo-500/30">
                        <span className="text-sm font-bold uppercase">
                            {user?.name?.charAt(0) || "U"}
                        </span>
                    </div>

                    <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                        <span className="truncate font-semibold">{user?.name}</span>
                        <span className="truncate text-xs opacity-70">{user?.email}</span>
                    </div>

                    <div className="flex size-6 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 ml-auto">
                        <ChevronsUpDown className="size-3 opacity-50" />
                    </div>
                </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-64 p-2 rounded-[20px] border-none bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                align="end"
                sideOffset={8}
            >
                <DropdownMenuLabel className="px-4 py-3">
                    <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                        My Account
                    </span>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-slate-200/50 dark:bg-slate-700/50 mx-2" />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 mt-1 rounded-[15px] text-red-500 font-medium cursor-pointer transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-500/10 hover:shadow-[0_4px_12px_rgba(239,68,68,0.1)] focus:bg-red-50 dark:focus:bg-red-500/10 group"
                >
                    <div className="p-2 rounded-full bg-red-100 dark:bg-red-500/20 group-hover:scale-110 transition-transform">
                        <LogOut className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}