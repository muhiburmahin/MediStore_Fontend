"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tags, LayoutGrid, Loader2, Trash2, PlusCircle, Image as ImageIcon, X, Plus } from "lucide-react";
import { createCategoryAction, deleteCategoryAction } from "@/actions/category.action";
import { uploadImage } from "@/upload.action";
import { Category } from "@/types";

export default function AddCategory({ initialCategories = [] }: { initialCategories: Category[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [categoryName, setCategoryName] = useState("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>(initialCategories);

    useEffect(() => {
        setCategories(initialCategories);
    }, [initialCategories]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const toastId = toast.loading("Uploading category image...");
        try {
            const formData = new FormData();
            formData.append("image", file);
            const uploadedUrl = await uploadImage(formData);
            setImageUrl(uploadedUrl);
            toast.success("Image uploaded!", { id: toastId });
        } catch (error) {
            toast.error("Upload failed", { id: toastId });
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryName.trim()) return toast.error("Name is required");

        setLoading(true);
        try {
            const formData = new FormData();

            formData.append("name", categoryName.trim());
            if (imageUrl) {
                formData.append("imageUrl", imageUrl);
            }

            const res = await createCategoryAction(formData);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        setDeletingId(id);
        try {
            const res = await deleteCategoryAction(id);
            if (res.success) {
                toast.success(res.message);
                setCategories(prev => prev.filter(c => c.id !== id));
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Delete failed");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-5 px-6 rounded-xl shadow-md flex gap-2 items-center transition-all active:scale-95">
                    <LayoutGrid size={18} />
                    <span className="uppercase tracking-tight italic">Manage Categories</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[450px] p-0 bg-white rounded-[2rem] overflow-hidden border-none shadow-2xl">
                <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-500 p-6 text-white">
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <Tags size={24} />
                            <DialogTitle className="text-xl font-black uppercase italic">Category Manager</DialogTitle>
                        </div>
                    </DialogHeader>
                </div>

                <div className="p-6 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-4">
                            {/* ইমেজ সিলেকশন এরিয়া */}
                            <div className="relative group">
                                <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-blue-300 bg-white rounded-xl cursor-pointer hover:bg-blue-50 transition-all overflow-hidden shadow-sm">
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center text-blue-400">
                                            {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                                            <span className="text-[10px] font-bold uppercase mt-1">Image</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={isUploading || loading}
                                    />
                                </label>
                                {imageUrl && (
                                    <button
                                        type="button"
                                        onClick={() => setImageUrl(null)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                            </div>

                            <div className="flex-1">
                                <Input
                                    placeholder="Category Name"
                                    className="h-12 rounded-xl bg-white border-blue-100 focus:ring-blue-500 font-bold text-lg"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <Button type="submit" disabled={loading || isUploading} className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl h-12 font-bold shadow-lg">
                            {loading ? <Loader2 className="animate-spin" size={18} /> : (
                                <div className="flex items-center gap-2">
                                    <PlusCircle size={18} />
                                    <span>ADD CATEGORY</span>
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="max-h-[250px] overflow-y-auto pr-2 space-y-2">
                        {categories.map((cat) => (
                            <div key={cat.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:border-blue-200 group transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                                        {cat.imageUrl ? (
                                            <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <ImageIcon size={16} className="text-slate-300" />
                                            </div>
                                        )}
                                    </div>
                                    <span className="font-bold text-slate-700 uppercase italic text-sm tracking-tight">{cat.name}</span>
                                </div>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    disabled={deletingId === cat.id}
                                    className="text-slate-300 hover:text-red-500 p-2 transition-colors"
                                >
                                    {deletingId === cat.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}