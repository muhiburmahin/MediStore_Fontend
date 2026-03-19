"use client";

import { Edit, Eye, Trash, Pill, Package, DollarSign, Factory, Loader2 } from "lucide-react";
import { Medicine, UpdateMedicine } from "../../../../types";
import { Button } from "../../../ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../ui/table";
import { useState, useTransition } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../ui/dialog";
import { FieldError, FieldLabel } from "../../../ui/field";
import { Input } from "../../../ui/input";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Textarea } from "../../../ui/textarea";
import Image from "next/image";
import { updateMedicineAction, deleteMedicineAction } from '../../../../actions/medicine.action';
import MedicinesPagination from "../../medicines/MedicinePagination";
import { Category } from '@/types/category.type';
import { User } from '@/types/user.type';

const medicineSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    description: z.string().min(3, "Description must be at least 3 characters long"),
    price: z.coerce.number().min(1, "Price must be at least 1"),
    stock: z.coerce.number().min(0, "Stock cannot be negative"),
    manufacturer: z.string().min(2, "Manufacturer must be at least 2 characters long"),
    imageUrl: z.string().url("Must be a valid URL"),
});

type MedicineFormType = z.infer<typeof medicineSchema>;

interface MedicineTableProps {
    medicines: Medicine[];
    categories: Category[];
    user: User | null;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export default function MedicineTable({ medicines, meta, categories, user }: MedicineTableProps) {
    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            manufacturer: "",
            imageUrl: "",
        } as MedicineFormType,
        validators: { onSubmit: medicineSchema },
        onSubmit: async ({ value }) => {
            if (!selectedMedicine) return;
            const toastId = toast.loading("Updating Medicine...");
            try {
                const updateData: UpdateMedicine = {
                    name: value.name,
                    description: value.description,
                    price: value.price,
                    stock: value.stock,
                    manufacturer: value.manufacturer,
                    images: [value.imageUrl],
                    categoryId: selectedMedicine.categoryId
                };

                const result = await updateMedicineAction(selectedMedicine.id, updateData);
                if (result?.error) {
                    toast.error(typeof result.error === 'string' ? result.error : "Update failed", { id: toastId });
                    return;
                }
                toast.success("Medicine updated successfully!", { id: toastId });
                setOpen(false);
                setSelectedMedicine(null);
                form.reset();
            } catch (err) {
                toast.error("Something went wrong", { id: toastId });
            }
        },
    });

    const handleView = (medicine: Medicine) => {
        setSelectedMedicine(medicine);
        setOpenView(true);
    };

    const handleOpenEdit = (medicine: Medicine) => {
        setSelectedMedicine(medicine);
        form.setFieldValue("name", medicine.name);
        form.setFieldValue("description", medicine.description);
        form.setFieldValue("price", Number(medicine.price));
        form.setFieldValue("stock", Number(medicine.stock));
        form.setFieldValue("manufacturer", medicine.manufacturer);
        form.setFieldValue("imageUrl", medicine.images?.[0] || "");
        setOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const toastId = toast.loading("Deleting...");
        try {
            await deleteMedicineAction(id);
            toast.success("Deleted successfully", { id: toastId });
        } catch (error) {
            toast.error("Delete failed", { id: toastId });
        }
    };

    return (
        <div className="w-full space-y-4 transition-colors duration-300">
            {(!medicines || medicines.length === 0) ? (
                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-3xl bg-blue-50/20 dark:bg-slate-900/50 border-blue-100 dark:border-slate-800">
                    <Pill className="h-12 w-12 text-blue-200 dark:text-slate-700 mb-4" />
                    <p className="font-semibold text-xl text-blue-800 dark:text-slate-300">No medicines found</p>
                    <p className="text-sm dark:text-slate-500">Start by adding your first medicine record.</p>
                </div>
            ) : (
                <>
                    {/* Responsive Container for Table */}
                    <div className="rounded-2xl border border-blue-100 dark:border-slate-800 shadow-xl shadow-blue-900/5 dark:shadow-none overflow-hidden bg-white dark:bg-slate-950">
                        <div className="overflow-x-auto">
                            <Table className="min-w-[700px]">
                                <TableHeader className="bg-gradient-to-r from-blue-600 to-green-500">
                                    <TableRow className="hover:bg-transparent border-none">
                                        <TableHead className="w-[80px] text-white font-bold py-5 pl-6">#SL</TableHead>
                                        <TableHead className="text-white font-bold py-5">Medicine</TableHead>
                                        <TableHead className="text-white font-bold py-5">Price</TableHead>
                                        <TableHead className="text-white font-bold py-5">Status</TableHead>
                                        <TableHead className="text-white font-bold py-5 pr-6 text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="divide-y divide-slate-50 dark:divide-slate-900">
                                    {medicines.map((medicine, index) => (
                                        <TableRow key={medicine.id} className="border-none hover:bg-blue-50/50 dark:hover:bg-slate-900/50 transition-colors group">
                                            <TableCell className="font-bold text-slate-400 dark:text-slate-600 pl-6">{index + 1}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-xl overflow-hidden border border-blue-100 dark:border-slate-800 bg-blue-50 dark:bg-slate-900 relative shrink-0 shadow-inner">
                                                        <Image src={medicine.images?.[0] || "/placeholder-medicine.png"} alt={medicine.name} fill className="object-cover" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-slate-900 dark:text-slate-200 truncate">{medicine.name}</p>
                                                        <p className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 px-1.5 py-0.5 bg-blue-100 dark:bg-blue-950/50 rounded inline-block mt-0.5">{medicine.manufacturer}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center font-bold text-slate-700 dark:text-slate-300">
                                                    <span className="text-green-500 mr-0.5">৳</span>
                                                    {medicine.price.toLocaleString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${medicine.stock > 10
                                                    ? 'bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-400 ring-green-600/10'
                                                    : 'bg-rose-100 dark:bg-rose-950/30 text-rose-800 dark:text-rose-400 ring-rose-600/10'}`}>
                                                    {medicine.stock} Left
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-6">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <ActionBtn onClick={() => handleView(medicine)} color="green" icon={<Eye className="h-4 w-4" />} />
                                                    <ActionBtn onClick={() => handleOpenEdit(medicine)} color="blue" icon={<Edit className="h-4 w-4" />} />
                                                    <ActionBtn onClick={() => handleDelete(medicine.id)} color="rose" icon={<Trash className="h-4 w-4" />} />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {meta && meta.totalPages > 1 && (
                        <div className="mt-8 flex justify-center">
                            <MedicinesPagination meta={meta} />
                        </div>
                    )}
                </>
            )}

            {/* Edit/Update Dialog */}
            <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setSelectedMedicine(null); }}>
                <DialogContent className="w-[95vw] sm:max-w-xl border-none p-0 overflow-hidden rounded-3xl md:rounded-[2.5rem] shadow-2xl bg-white dark:bg-slate-950">
                    <div className="bg-gradient-to-r from-blue-600 to-green-500 p-6 md:p-8 pb-10 md:pb-12">
                        <DialogHeader>
                            <DialogTitle className="text-white text-xl md:text-2xl font-black flex items-center gap-3">
                                <Edit className="h-6 w-6 md:h-7 md:w-7" /> Update Medicine
                            </DialogTitle>
                        </DialogHeader>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            void form.handleSubmit();
                        }}
                        className="p-6 md:p-10 -mt-8 bg-white dark:bg-slate-950 rounded-t-[2rem] md:rounded-t-[2.5rem] space-y-5 md:space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <form.Field name="name">{(field) => (
                                <InputGroup label="Medicine Name" icon={<Pill className="h-4 w-4" />}>
                                    <Input
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="rounded-xl md:rounded-2xl border-blue-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus-visible:ring-blue-500 dark:text-slate-200"
                                    />
                                    <FieldError errors={field.state.meta.errors} />
                                </InputGroup>
                            )}</form.Field>

                            <form.Field name="manufacturer">{(field) => (
                                <InputGroup label="Manufacturer" icon={<Factory className="h-4 w-4" />}>
                                    <Input
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="rounded-xl md:rounded-2xl border-blue-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus-visible:ring-blue-500 dark:text-slate-200"
                                    />
                                    <FieldError errors={field.state.meta.errors} />
                                </InputGroup>
                            )}</form.Field>
                        </div>

                        <form.Field name="description">{(field) => (
                            <div className="space-y-1.5">
                                <FieldLabel className="text-sm font-bold text-slate-700 dark:text-slate-400 ml-1">About Medicine</FieldLabel>
                                <Textarea
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="rounded-xl md:rounded-2xl border-blue-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus-visible:ring-blue-500 min-h-[80px] md:min-h-[100px] dark:text-slate-200"
                                />
                                <FieldError errors={field.state.meta.errors} />
                            </div>
                        )}</form.Field>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <form.Field name="price">{(field) => (
                                <InputGroup label="Price (৳)" icon={<DollarSign className="h-4 w-4" />}>
                                    <Input
                                        type="number"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(Number(e.target.value))}
                                        className="rounded-xl md:rounded-2xl border-green-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus-visible:ring-green-500 text-green-700 dark:text-green-400 font-bold"
                                    />
                                    <FieldError errors={field.state.meta.errors} />
                                </InputGroup>
                            )}</form.Field>

                            <form.Field name="stock">{(field) => (
                                <InputGroup label="Inventory Stock" icon={<Package className="h-4 w-4" />}>
                                    <Input
                                        type="number"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(Number(e.target.value))}
                                        className="rounded-xl md:rounded-2xl border-blue-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus-visible:ring-blue-500 text-blue-700 dark:text-blue-400 font-bold"
                                    />
                                    <FieldError errors={field.state.meta.errors} />
                                </InputGroup>
                            )}</form.Field>
                        </div>

                        <DialogFooter className="mt-8 flex flex-col md:flex-row gap-3">
                            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="w-full md:w-auto text-slate-500 dark:text-slate-400 font-bold px-8 rounded-full order-2 md:order-1">Discard</Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-bold px-10 rounded-full shadow-lg shadow-blue-200 dark:shadow-none transition-transform active:scale-95 order-1 md:order-2"
                            >
                                {isPending ? <Loader2 className="animate-spin" /> : "Update Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* View Details Dialog */}
            <Dialog open={openView} onOpenChange={setOpenView}>
                <DialogContent className="w-[95vw] sm:max-w-md border-none p-0 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-2xl bg-white dark:bg-slate-950">
                    <DialogHeader className="sr-only">
                        <DialogTitle>View Medicine</DialogTitle>
                    </DialogHeader>
                    {selectedMedicine && (
                        <div className="relative overflow-hidden">
                            <div className="h-32 bg-gradient-to-r from-blue-600 to-green-500 absolute inset-0 z-0" />
                            <div className="relative z-10 p-5 md:p-6 pt-8 md:pt-10">
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative h-36 w-36 md:h-44 md:w-44 overflow-hidden rounded-3xl border-8 border-white dark:border-slate-900 shadow-2xl mb-4 bg-white dark:bg-slate-900">
                                        <Image src={selectedMedicine.images?.[0] || "/placeholder-medicine.png"} alt={selectedMedicine.name} fill className="object-cover" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 leading-tight">{selectedMedicine.name}</h3>
                                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-1">{selectedMedicine.manufacturer}</p>
                                </div>

                                <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 md:gap-4 bg-blue-50/50 dark:bg-slate-900/80 p-4 md:p-5 rounded-[1.5rem] md:rounded-3xl border border-blue-100 dark:border-slate-800">
                                    <ViewItem label="Current Price" value={`৳${selectedMedicine.price}`} highlight />
                                    <ViewItem label="Stock Unit" value={`${selectedMedicine.stock} PCS`} />
                                    <ViewItem label="Category" value={selectedMedicine.category?.name || "Uncategorized"} />
                                    <ViewItem label="Last Update" value={new Date(selectedMedicine.updatedAt).toLocaleDateString()} />
                                </div>

                                <div className="mt-6 px-4 pb-8 border-t border-slate-100 dark:border-slate-900 pt-4">
                                    <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-2">Detailed Description</h4>
                                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium italic">
                                        {selectedMedicine.description || "No description provided for this medicine."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

// --- Helper UI Components ---

const ActionBtn = ({ icon, color, onClick }: { icon: React.ReactNode, color: 'green' | 'blue' | 'rose', onClick: () => void }) => {
    const colors = {
        green: "hover:bg-green-500 dark:hover:bg-green-600 hover:text-white text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-950/30",
        blue: "hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-950/30",
        rose: "hover:bg-rose-500 dark:hover:bg-rose-600 hover:text-white text-rose-600 dark:text-rose-500 bg-rose-50 dark:bg-rose-950/30"
    };
    return (
        <Button size="icon" variant="ghost" className={`h-8 w-8 md:h-9 md:w-9 rounded-xl transition-all ${colors[color]}`} onClick={onClick}>
            {icon}
        </Button>
    );
};

const InputGroup = ({ label, icon, children }: { label: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="space-y-1.5 w-full">
        <FieldLabel className="text-[10px] md:text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wide ml-1 flex items-center gap-1.5">
            <span className="text-green-500">{icon}</span> {label}
        </FieldLabel>
        {children}
    </div>
);

const ViewItem = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
    <div className="flex flex-col">
        <span className="text-[9px] md:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight mb-0.5">{label}</span>
        <span className={`text-sm md:text-base font-black ${highlight ? 'text-green-600 dark:text-green-400' : 'text-slate-700 dark:text-slate-200'}`}>{value}</span>
    </div>
);