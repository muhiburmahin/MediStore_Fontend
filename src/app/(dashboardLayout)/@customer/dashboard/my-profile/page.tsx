"use client";
import { useEffect, useState } from "react";
import { User } from "@/types/user.type";
import { customerDashboardService } from "@/services/dashboard.service";
import { ProfileForm } from "@/components/modules/customer/ProfileForm";

export default function MyProfilePage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await customerDashboardService.getUserProfile();
            setUser(userData);
        };
        fetchUser();
    }, []);

    if (!user) return <div className="p-10 animate-pulse text-blue-600 font-bold">Loading Profile...</div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-black text-white">My <span className="text-blue-600">Profile</span></h1>
                <p className="text-slate-500 font-medium">Manage your personal information and account security.</p>
            </div>

            <ProfileForm user={user} />
        </div>
    );
}