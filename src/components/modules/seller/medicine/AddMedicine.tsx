"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
import { Pill, Plus, Image as ImageIcon, X } from "lucide-react";
import { createMedicineAction } from "../../../../actions/medicine.action";
import { uploadImage } from "@/upload.action";

export default function AddMedicine({
    categories = [],
    user,
}: {
    categories: Category[];
    user: User;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "", description: "", price: 0, stock: 0,
            manufacturer: "", images: [] as string[],
            categoryId: "", sellerId: user?.id || "",
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating Medicine...");
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { error } = await createMedicineAction(value as any);
                if (error) { toast.error("Failed to create", { id: toastId }); return; }
                toast.success("Medicine added successfully!", { id: toastId });
                setIsOpen(false); form.reset();
            } catch (err) { toast.error("Something went wrong.", { id: toastId }); }
        },
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        setIsUploading(true);
        const toastId = toast.loading("Uploading...");
        try {
            const uploadPromises = files.map(async (file) => {
                const formData = new FormData();
                formData.append("image", file);
                return await uploadImage(formData);
            });
            const uploadedUrls = await Promise.all(uploadPromises);
            const currentImages = form.getFieldValue("images") || [];
            form.setFieldValue("images", [...currentImages, ...uploadedUrls]);
            toast.success("Uploaded!", { id: toastId });
        } catch (error) { toast.error("Upload failed", { id: toastId }); } finally { setIsUploading(false); }
    };

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:scale-105 text-white font-bold py-5 px-6 rounded-xl shadow-lg transition-all flex gap-2 items-center dark:from-blue-500 dark:to-green-500"
            >
                <Plus size={18} strokeWidth={3} />
                <span className="uppercase tracking-tight italic">Add Medicine</span>
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {/* Dialog Content with Dark Mode Support */}
                <DialogContent className="max-w-[95vw] sm:max-w-[500px] p-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md rounded-[2rem] overflow-hidden border-none shadow-2xl dark:shadow-blue-900/20">

                    <div className="bg-gradient-to-r from-blue-600 to-green-600 p-5 dark:from-blue-700 dark:to-green-700">
                        <DialogHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl text-white">
                                    <Pill size={24} />
                                </div>
                                <DialogTitle className="text-xl font-black italic uppercase text-white">
                                    New <span className="opacity-80 text-green-200">Medicine</span>
                                </DialogTitle>
                            </div>
                        </DialogHeader>
                    </div>

                    <form
                        onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}
                        className="p-5 space-y-4"
                    >
                        <form.Field name="categoryId">
                            {(field) => (
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-400 ml-1">Classification</Label>
                                    <Select value={field.state.value} onValueChange={(val) => field.handleChange(val)}>
                                        <SelectTrigger className="h-11 rounded-xl bg-white dark:bg-slate-900 border-blue-200 dark:border-slate-800 focus:ring-blue-500 font-bold italic shadow-sm text-slate-900 dark:text-slate-100">
                                            <SelectValue placeholder="SELECT CATEGORY" />
                                        </SelectTrigger>
                                        <SelectContent className="dark:bg-slate-900 dark:border-slate-800">
                                            {categories.map((c) => (
                                                <SelectItem key={c.id} value={c.id} className="font-bold italic uppercase focus:bg-blue-50 dark:focus:bg-blue-900/30 text-slate-900 dark:text-slate-100">
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </form.Field>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <form.Field name="name">
                                {(field) => (
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-400 ml-1">Drug Name</Label>
                                        <Input
                                            placeholder="e.g. Napa"
                                            className="h-11 rounded-xl bg-white dark:bg-slate-900 border-blue-100 dark:border-slate-800 focus:border-blue-500 font-bold shadow-sm text-slate-900 dark:text-slate-100"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="manufacturer">
                                {(field) => (
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-bold uppercase text-green-700 dark:text-green-400 ml-1">Manufacturer</Label>
                                        <Input
                                            placeholder="Square"
                                            className="h-11 rounded-xl bg-white dark:bg-slate-900 border-green-100 dark:border-slate-800 focus:border-green-600 font-bold shadow-sm text-slate-900 dark:text-slate-100"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                    </div>
                                )}
                            </form.Field>
                        </div>

                        <form.Field name="description">
                            {(field) => (
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-400 ml-1">Description</Label>
                                    <Textarea
                                        placeholder="Formulation details..."
                                        className="min-h-[70px] rounded-xl bg-white dark:bg-slate-900 border-blue-100 dark:border-slate-800 focus:border-blue-500 shadow-sm text-slate-900 dark:text-slate-100"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                </div>
                            )}
                        </form.Field>

                        <div className="grid grid-cols-2 gap-3">
                            <form.Field name="price">
                                {(field) => (
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-bold uppercase text-green-700 dark:text-green-400 ml-1">Price (৳)</Label>
                                        <Input
                                            type="number"
                                            className="h-11 rounded-xl bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30 text-green-700 dark:text-green-400 font-black shadow-inner"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                        />
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="stock">
                                {(field) => (
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-400 ml-1">Quantity</Label>
                                        <Input
                                            type="number"
                                            className="h-11 rounded-xl bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30 text-blue-700 dark:text-blue-400 font-black shadow-inner"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                        />
                                    </div>
                                )}
                            </form.Field>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-400 flex items-center gap-1 ml-1">
                                <ImageIcon size={12} /> Photos
                            </Label>
                            <div className="flex flex-wrap gap-2">
                                {(form.getFieldValue("images") || []).map((img, idx) => (
                                    <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-white dark:border-slate-800 shadow-md">
                                        <img src={img} alt="med" className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => {
                                            const cur = form.getFieldValue("images") || [];
                                            form.setFieldValue("images", cur.filter((_, i) => i !== idx));
                                        }} className="absolute top-0 right-0 bg-red-500 text-white rounded-bl-lg p-0.5 hover:bg-red-600 transition-colors">
                                            <X size={10} />
                                        </button>
                                    </div>
                                ))}
                                <label className="flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-blue-300 dark:border-slate-700 bg-blue-100/50 dark:bg-slate-900 rounded-lg cursor-pointer hover:bg-blue-200 dark:hover:bg-slate-800 transition-all">
                                    <Plus className="text-blue-500 dark:text-blue-400" size={18} />
                                    <input type="file" multiple className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                                </label>
                            </div>
                        </div>

                        <DialogFooter className="pt-2">
                            <Button
                                type="submit"
                                disabled={isUploading}
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90 text-white font-black uppercase tracking-widest rounded-xl shadow-lg dark:from-blue-500 dark:to-green-500"
                            >
                                {isUploading ? "Processing..." : "Save Medicine"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}