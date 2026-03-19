"use client";

import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { User, UserStatus } from "../../types";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { updateUser } from "@/actions/user.actions";
import { Camera, Mail, ShieldCheck, User as UserIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const emptyToUndefined = (v: unknown) => (v === "" ? undefined : v);

const formSchema = z.object({
    name: z.preprocess(emptyToUndefined, z.string().min(2, "Name must be at least 2 characters").optional()),
    email: z.preprocess(emptyToUndefined, z.string().email().optional()),
    image: z.preprocess(emptyToUndefined, z.string().url().optional()),
    status: z.preprocess(emptyToUndefined, z.string().optional()),
});

export default function MyProfile({ user }: { user: User }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            name: user.name || "",
            email: user.email || "",
            image: user.image ?? "",
            status: user.status || "ACTIVE",
        },
        // validators: {
        //     onSubmit: formSchema,
        // },
        onSubmit: async ({ value }) => {
            if (loading) return;
            setLoading(true);
            const toastId = toast.loading("Updating Profile...");

            const serverData: Partial<{ name: string; image: string }> = {};
            if (value.name !== undefined && value.name !== user.name) {
                serverData.name = value.name;
            }
            if (Object.keys(serverData).length === 0) {
                toast.info("No changes to update.", { id: toastId });
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await updateUser(user.id, serverData);
                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }

                toast.success(data?.message || "Profile updated successfully!", {
                    id: toastId,
                });
                router.refresh();
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong, please try again.", {
                    id: toastId,
                });
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="max-w-7xl mx-auto space-y-8 py-6 px-4">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-950 dark:text-white uppercase tracking-tight">
                    Account <span className="text-blue-600">Settings</span>
                </h1>
                <p className="text-slate-500 mt-1 font-medium">Manage your personal information and profile picture.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="max-w-md w-full relative overflow-hidden bg-white dark:bg-slate-900/50 p-8 rounded-[32px] shadow-2xl shadow-blue-100 dark:shadow-none border border-blue-50/50 dark:border-slate-800">
                    {/* Decorative Background Blob */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />

                    <div className="flex flex-col items-center gap-6 relative">
                        <div className="relative group cursor-pointer">
                            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-xl shadow-blue-200 dark:shadow-blue-900 group-hover:rotate-6 transition-transform duration-300 overflow-hidden">
                                {user.image ? (
                                    <img src={user.image} alt={user.name || user.email} className="h-full w-full object-cover" />
                                ) : (
                                    <UserIcon size={64} />
                                )}
                            </div>
                            <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-2 rounded-full border-4 border-white dark:border-slate-800 shadow-sm">
                                <Camera size={18} />
                            </div>
                        </div>

                        <div className="text-center">
                            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">{user.name}</h2>
                            <div className="flex items-center justify-center gap-2 mt-1">
                                <ShieldCheck size={16} className="text-emerald-600" />
                                <p className="text-blue-600 font-black text-xs uppercase tracking-[0.2em]">{user.role || 'CUSTOMER'}</p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-slate-100 dark:bg-slate-800" />

                        <div className="w-full flex items-center justify-center gap-3 text-slate-700 dark:text-slate-300 font-bold p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <Mail size={18} className="text-blue-600" />
                            <span className="text-sm truncate">{user.email}</span>
                        </div>
                    </div>
                </div>

                <Card className="lg:col-span-2 rounded-[32px] border-none shadow-2xl shadow-emerald-50 dark:shadow-none bg-white dark:bg-slate-900/50">
                    <CardContent className="p-8 grid gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-950 dark:text-white">Personal Information</h3>
                            <p className="text-sm text-slate-500 mt-1">Update your name to customize your experience.</p>
                        </div>

                        <form
                            id="update-user-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                form.handleSubmit();
                            }}
                            className="space-y-6"
                        >

                            <form.Field name="name">
                                {(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 group focus-within:border-blue-600 focus-within:bg-white transition-all">
                                            <FieldLabel htmlFor={field.name} className="text-[10px] font-black text-slate-500 dark:text-slate-400 group-focus-within:text-blue-600 uppercase tracking-widest mb-1 block">
                                                Full Name
                                            </FieldLabel>
                                            <Input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                className="h-8 border-none p-0 focus-visible:ring-0 text-slate-950 dark:text-white font-bold text-base bg-transparent"
                                                required
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} className="text-xs text-red-500 mt-1" />
                                            )}
                                        </div>
                                    );
                                }}
                            </form.Field>

                            <form.Field name="status">
                                {(field) => (
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 opacity-70">
                                        <FieldLabel htmlFor={field.name} className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 block">
                                            Account Status
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            className="h-8 border-none p-0 focus-visible:ring-0 text-slate-950 dark:text-white font-bold text-base bg-transparent capitalize"
                                            readOnly
                                        />
                                    </div>
                                )}
                            </form.Field>
                        </form>

                        <Button
                            form="update-user-form"
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-95 gap-2 uppercase tracking-widest"
                        >
                            {loading ? (
                                <><Loader2 className="animate-spin" size={18} /> UPDATING...</>
                            ) : "Update Profile"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}