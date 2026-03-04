"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // পাথ চেক করে নিন
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Category, User } from "../../../../types";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createMedicine } from "../../../../actions/medicine.action";
import { Pill, Plus, Factory, BadgeDollarSign, Box, Image as ImageIcon } from "lucide-react";

const medicineSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    description: z.string().min(3, "Description must be at least 3 characters long"),
    price: z.number().min(1, "Price must be at least 1"),
    stock: z.number().min(1, "Stock must be at least 1"),
    manufacturer: z.string().min(2, "Manufacturer must be at least 2 characters long"),
    imageUrl: z.string().url("Must be a valid URL"),
    categoryId: z.string().min(1, "Category is required"),
    sellerId: z.string(),
});

export default function AddMedicine({
    categories,
    user,
}: {
    categories: Category[];
    user: User;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            manufacturer: "",
            imageUrl: "",
            categoryId: "",
            sellerId: user.id,
        },
        validators: {
            onSubmit: medicineSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating Medicine...");
            try {
                const { data, error } = await createMedicine(value);
                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }
                toast.success(data?.message ?? "Medicine created successfully", { id: toastId });
                setIsOpen(false);
                form.reset();
            } catch (err) {
                toast.error("Something went wrong.", { id: toastId });
            }
        },
    });

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-6 rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex gap-2 items-center border-none"
            >
                <Plus size={20} strokeWidth={3} />
                <span className="uppercase tracking-tighter italic text-lg">Add Medicine</span>
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[550px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-[40px] p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
                    <DialogHeader className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600">
                                <Pill size={24} />
                            </div>
                            <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-slate-100">
                                New <span className="text-blue-600">Medicine</span>
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-5"
                    >
                        {/* Category */}
                        <form.Field name="categoryId">
                            {(field) => (
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Classification</Label>
                                    <Select value={field.state.value} onValueChange={field.handleChange}>
                                        <SelectTrigger className="h-14 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 font-bold italic">
                                            <SelectValue placeholder="SELECT CATEGORY" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-2xl dark:bg-slate-900 dark:border-slate-800">
                                            {categories.map((c) => (
                                                <SelectItem key={c.id} value={c.id} className="font-bold italic uppercase">{c.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {field.state.meta.errors.length > 0 && (
                                        <p className="text-red-500 text-[10px] font-bold uppercase italic ml-1">
                                            {/* Error Fix: Join errors to string */}
                                            {field.state.meta.errors.map(err => typeof err === 'string' ? err : err?.message).join(", ")}
                                        </p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <form.Field name="name">
                                {(field) => (
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Drug Name</Label>
                                        <Input
                                            placeholder="Napa Extra..."
                                            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 font-bold italic"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                    </div>
                                )}
                            </form.Field>

                            {/* Manufacturer */}
                            <form.Field name="manufacturer">
                                {(field) => (
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-1">
                                            <Factory size={10} /> Labs
                                        </Label>
                                        <Input
                                            placeholder="Square Pharma..."
                                            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 font-bold italic"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                    </div>
                                )}
                            </form.Field>
                        </div>

                        {/* Description */}
                        <form.Field name="description">
                            {(field) => (
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Formulation Details</Label>
                                    <Textarea
                                        placeholder="Enter medicine details..."
                                        className="min-h-[80px] rounded-2xl bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 font-bold italic"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                </div>
                            )}
                        </form.Field>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Price */}
                            <form.Field name="price">
                                {(field) => (
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-1">
                                            <BadgeDollarSign size={10} /> Price
                                        </Label>
                                        <Input
                                            type="number"
                                            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 font-bold italic"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                        />
                                    </div>
                                )}
                            </form.Field>

                            {/* Stock */}
                            <form.Field name="stock">
                                {(field) => (
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-1">
                                            <Box size={10} /> Quantity
                                        </Label>
                                        <Input
                                            type="number"
                                            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 font-bold italic"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                        />
                                    </div>
                                )}
                            </form.Field>
                        </div>

                        {/* Image URL */}
                        <form.Field name="imageUrl">
                            {(field) => (
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-1">
                                        <ImageIcon size={10} /> Visual Asset URL
                                    </Label>
                                    <Input
                                        placeholder="https://image-link.com"
                                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 font-bold italic"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                </div>
                            )}
                        </form.Field>

                        <DialogFooter className="mt-8">
                            <Button
                                type="submit"
                                className="w-full h-14 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-black uppercase italic tracking-widest rounded-2xl shadow-lg shadow-green-500/20 transition-all border-none"
                            >
                                Confirm Entry
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}