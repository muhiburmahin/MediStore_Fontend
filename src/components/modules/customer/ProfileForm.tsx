"use client";

import { User } from "@/types/user.type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User as UserIcon, Camera, ShieldCheck, Edit3 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export const ProfileForm = ({ user }: { user: User }) => {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="max-w-2xl relative overflow-hidden bg-white p-8 rounded-[32px] shadow-2xl shadow-blue-100 border border-blue-50/50">
            {/* Decorative Background Blob */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl" />

            <div className="flex items-center gap-6 mb-10 relative">
                <div className="relative group">
                    <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform duration-300">
                        <UserIcon size={48} />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-white">
                        <Camera size={16} />
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">{user.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <ShieldCheck size={16} className="text-emerald-600" />
                        <p className="text-blue-600 font-black text-xs uppercase tracking-[0.2em]">{user.role}</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 mb-8">
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 group hover:bg-white hover:shadow-md transition-all">
                    <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1 block">Primary Email</label>
                    <div className="flex items-center gap-3 text-gray-700">
                        <Mail size={18} className="text-blue-600" />
                        <span className="font-bold">{user.email}</span>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 group hover:bg-white hover:shadow-md transition-all">
                    <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 block">Phone Number</label>
                    <div className="flex items-center gap-3 text-gray-700">
                        <Phone size={18} className="text-emerald-600" />
                        <span className="font-bold">{user.phone || "Not Linked"}</span>
                    </div>
                </div>
            </div>

            {/* Update Profile Modal */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 gap-2 uppercase tracking-widest">
                        <Edit3 size={18} /> Edit Profile Details
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-[32px] border-none shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-blue-600 italic">UPDATE INFO</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
                            <Input defaultValue={user.name} className="rounded-xl h-12 border-blue-100 focus:border-blue-600" />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full h-12 bg-blue-600 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all">
                            {loading ? "SAVING..." : "SAVE CHANGES"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};