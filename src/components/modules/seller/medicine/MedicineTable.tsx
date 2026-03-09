// "use client";
// import { Edit, Eye, Trash } from "lucide-react";
// import { Medicine } from "../../../../types";
// import { Button } from "../../../ui/button";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "../../../ui/table";
// import { useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "../../../ui/dialog";
// import { Field, FieldError, FieldLabel } from "../../../ui/field";
// import { Input } from "../../../ui/input";
// import { z } from "zod";
// import { useForm } from "@tanstack/react-form";
// import { toast } from "sonner";
// import { Textarea } from "../../../ui/textarea";
// import {
//     deleteMedicine,
//     updateMedicine,
// } from "../../../../actions/medicine.action";
// import Image from "next/image";

// const medicineSchema = z.object({
//     name: z.string().min(3, "Name must be at least 3 characters long"),
//     description: z
//         .string()
//         .min(3, "Description must be at least 3 characters long"),
//     price: z.number().min(1, "Price must be at least 1"),
//     stock: z.number().min(1, "Stock must be at least 1"),
//     manufacturer: z
//         .string()
//         .min(2, "Manufacturer must be at least 2 characters long"),
//     imageUrl: z.string().url("Must be a valid URL"),
// });

// export default function MedicineTable({
//     medicines,
// }: {
//     medicines: Medicine[];
// }) {
//     const [open, setOpen] = useState(false);
//     const [openView, setOpenView] = useState(false);
//     const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
//         null,
//     );

//     const form = useForm({
//         defaultValues: {
//             name: "",
//             description: "",
//             price: 0,
//             stock: 0,
//             manufacturer: "",
//             imageUrl: "",
//         },
//         validators: {
//             onSubmit: medicineSchema,
//         },
//         onSubmit: async ({ value }) => {
//             if (!selectedMedicine) return;
//             const toastId = toast.loading("Updating Medicine...");

//             try {
//                 const { data, error } = await updateMedicine(
//                     selectedMedicine.id,
//                     {
//                         name: value.name,
//                         description: value.description,
//                         price: value.price,
//                         stock: value.stock,
//                         manufacturer: value.manufacturer,
//                         imageUrl: value.imageUrl,
//                     },
//                 );

//                 if (error) {
//                     toast.error(error.message, { id: toastId });
//                     return;
//                 }

//                 toast.success(data?.message ?? "Medicine updated", {
//                     id: toastId,
//                 });
//                 setOpen(false);
//                 setSelectedMedicine(null);
//                 form.reset();
//             } catch (err) {
//                 console.log(err);
//                 toast.error("Something went wrong, please try again.", {
//                     id: toastId,
//                 });
//             }
//         },
//     });

//     const handleView = (medicine: Medicine) => {
//         setSelectedMedicine(medicine);
//         setOpenView(true);
//     };

//     const handleOpenEdit = (medicine: Medicine) => {
//         setSelectedMedicine(medicine);
//         form.setFieldValue("name", medicine.name);
//         form.setFieldValue("description", medicine.description);
//         form.setFieldValue("price", medicine.price);
//         form.setFieldValue("stock", medicine.stock);
//         form.setFieldValue("manufacturer", medicine.manufacturer);

//         setOpen(true);
//     };

//     const handleDelete = async (id: string) => {
//         const toastId = toast.loading("Medicine Deleting...");
//         try {
//             const { data, error } = await deleteMedicine(id);
//             if (error) {
//                 toast.error(error.message, { id: toastId });
//                 return;
//             }

//             toast.success(data.message, { id: toastId });
//         } catch (error) {
//             console.log(error);
//             toast.error("Something went wrong, please try again.", {
//                 id: toastId,
//             });
//         }
//     };

//     return (
//         <>
//             {(!medicines || medicines.length === 0) ? (
//                 <div className="h-24 text-center text-muted-foreground">
//                     No medicines found
//                 </div>
//             ) : (
//                 <div className="border rounded-md">
//                     <Table className="bg-[FAFAFA] dark:bg-[#171717]">
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead className="border-r">Sl</TableHead>
//                                 <TableHead>Name</TableHead>
//                                 <TableHead>Price</TableHead>
//                                 <TableHead>Stock</TableHead>
//                                 <TableHead>Category</TableHead>
//                                 <TableHead>Extras</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {medicines.map((medicine, index) => (
//                                 <TableRow key={medicine.id}>
//                                     <TableCell className="border-r">
//                                         {index + 1}
//                                     </TableCell>
//                                     <TableCell>{medicine.name}</TableCell>
//                                     <TableCell>৳{medicine.price}</TableCell>
//                                     <TableCell>{medicine.stock}</TableCell>
//                                     <TableCell>
//                                         {medicine.category?.name ?? "—"}
//                                     </TableCell>
//                                     <TableCell className="flex items-center justify-center w-fit gap-2">
//                                         <Button
//                                             size="sm"
//                                             variant="outline"
//                                             className="group cursor-pointer"
//                                             onClick={() => handleView(medicine)}
//                                         >
//                                             <Eye className="group-hover:text-green-600" />
//                                         </Button>

//                                         <Button
//                                             size="sm"
//                                             variant="outline"
//                                             className="group cursor-pointer"
//                                             onClick={() =>
//                                                 handleOpenEdit(medicine)
//                                             }
//                                         >
//                                             <Edit className="group-hover:text-blue-600" />
//                                         </Button>

//                                         <Button
//                                             size="sm"
//                                             variant="outline"
//                                             className="group cursor-pointer"
//                                             onClick={() =>
//                                                 handleDelete(medicine.id)
//                                             }
//                                         >
//                                             <Trash className="group-hover:text-red-600" />
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </div>
//             )}

//             {/* Edit */}
//             <Dialog
//                 open={open}
//                 onOpenChange={(v) => {
//                     setOpen(v);
//                     if (!v) {
//                         setSelectedMedicine(null);
//                         form.reset();
//                     }
//                 }}
//             >
//                 <DialogContent className="sm:max-w-106.25">
//                     <DialogHeader>
//                         <DialogTitle>Update Medicine</DialogTitle>
//                     </DialogHeader>

//                     <form
//                         id="update-medicine-form"
//                         onSubmit={(e) => {
//                             e.preventDefault();
//                             e.stopPropagation();
//                             form.handleSubmit();
//                         }}
//                         className="space-y-4 py-4"
//                     >
//                         <form.Field name="name">
//                             {(field) => {
//                                 const isInvalid =
//                                     field.state.meta.isTouched &&
//                                     !field.state.meta.isValid;
//                                 return (
//                                     <Field data-invalid={isInvalid}>
//                                         <FieldLabel htmlFor={field.name}>
//                                             Name
//                                         </FieldLabel>
//                                         <Input
//                                             type="text"
//                                             id={field.name}
//                                             name={field.name}
//                                             value={field.state.value}
//                                             onChange={(e) =>
//                                                 field.handleChange(
//                                                     e.target.value,
//                                                 )
//                                             }
//                                             onBlur={field.handleBlur}
//                                         />
//                                         {isInvalid && (
//                                             <FieldError
//                                                 errors={field.state.meta.errors}
//                                             />
//                                         )}
//                                     </Field>
//                                 );
//                             }}
//                         </form.Field>

//                         <form.Field name="description">
//                             {(field) => {
//                                 const isInvalid =
//                                     field.state.meta.isTouched &&
//                                     !field.state.meta.isValid;
//                                 return (
//                                     <Field data-invalid={isInvalid}>
//                                         <FieldLabel htmlFor={field.name}>
//                                             Description
//                                         </FieldLabel>
//                                         <Textarea
//                                             id={field.name}
//                                             name={field.name}
//                                             value={field.state.value}
//                                             onChange={(e) =>
//                                                 field.handleChange(
//                                                     e.target.value,
//                                                 )
//                                             }
//                                             onBlur={field.handleBlur}
//                                         />
//                                         {isInvalid && (
//                                             <FieldError
//                                                 errors={field.state.meta.errors}
//                                             />
//                                         )}
//                                     </Field>
//                                 );
//                             }}
//                         </form.Field>

//                         <div className="flex items-center justify-around gap-5">
//                             <form.Field name="price">
//                                 {(field) => {
//                                     const isInvalid =
//                                         field.state.meta.isTouched &&
//                                         !field.state.meta.isValid;
//                                     return (
//                                         <Field data-invalid={isInvalid}>
//                                             <FieldLabel htmlFor={field.name}>
//                                                 Price
//                                             </FieldLabel>
//                                             <Input
//                                                 type="number"
//                                                 id={field.name}
//                                                 name={field.name}
//                                                 value={field.state.value ?? 0}
//                                                 onChange={(e) => {
//                                                     const v = e.target.value;
//                                                     field.handleChange(
//                                                         v === ""
//                                                             ? 0
//                                                             : Number(v),
//                                                     );
//                                                 }}
//                                                 onBlur={field.handleBlur}
//                                             />
//                                             {isInvalid && (
//                                                 <FieldError
//                                                     errors={
//                                                         field.state.meta.errors
//                                                     }
//                                                 />
//                                             )}
//                                         </Field>
//                                     );
//                                 }}
//                             </form.Field>

//                             <form.Field name="stock">
//                                 {(field) => {
//                                     const isInvalid =
//                                         field.state.meta.isTouched &&
//                                         !field.state.meta.isValid;
//                                     return (
//                                         <Field data-invalid={isInvalid}>
//                                             <FieldLabel htmlFor={field.name}>
//                                                 Stock
//                                             </FieldLabel>
//                                             <Input
//                                                 type="number"
//                                                 id={field.name}
//                                                 name={field.name}
//                                                 value={field.state.value ?? 0}
//                                                 onChange={(e) => {
//                                                     const v = e.target.value;
//                                                     field.handleChange(
//                                                         v === ""
//                                                             ? 0
//                                                             : Number(v),
//                                                     );
//                                                 }}
//                                                 onBlur={field.handleBlur}
//                                             />
//                                             {isInvalid && (
//                                                 <FieldError
//                                                     errors={
//                                                         field.state.meta.errors
//                                                     }
//                                                 />
//                                             )}
//                                         </Field>
//                                     );
//                                 }}
//                             </form.Field>
//                         </div>

//                         <form.Field name="manufacturer">
//                             {(field) => {
//                                 const isInvalid =
//                                     field.state.meta.isTouched &&
//                                     !field.state.meta.isValid;
//                                 return (
//                                     <Field data-invalid={isInvalid}>
//                                         <FieldLabel htmlFor={field.name}>
//                                             Manufacturer
//                                         </FieldLabel>
//                                         <Input
//                                             type="text"
//                                             id={field.name}
//                                             name={field.name}
//                                             value={field.state.value}
//                                             onChange={(e) =>
//                                                 field.handleChange(
//                                                     e.target.value,
//                                                 )
//                                             }
//                                             onBlur={field.handleBlur}
//                                         />
//                                         {isInvalid && (
//                                             <FieldError
//                                                 errors={field.state.meta.errors}
//                                             />
//                                         )}
//                                     </Field>
//                                 );
//                             }}
//                         </form.Field>

//                         <form.Field name="imageUrl">
//                             {(field) => {
//                                 const isInvalid =
//                                     field.state.meta.isTouched &&
//                                     !field.state.meta.isValid;
//                                 return (
//                                     <Field data-invalid={isInvalid}>
//                                         <FieldLabel htmlFor={field.name}>
//                                             Image Url
//                                         </FieldLabel>
//                                         <Input
//                                             type="text"
//                                             id={field.name}
//                                             name={field.name}
//                                             value={field.state.value}
//                                             onChange={(e) =>
//                                                 field.handleChange(
//                                                     e.target.value,
//                                                 )
//                                             }
//                                             onBlur={field.handleBlur}
//                                             placeholder="https://example.com/image.png"
//                                         />
//                                         {isInvalid && (
//                                             <FieldError
//                                                 errors={field.state.meta.errors}
//                                             />
//                                         )}
//                                     </Field>
//                                 );
//                             }}
//                         </form.Field>

//                         <DialogFooter>
//                             <Button
//                                 type="submit"
//                                 className="w-full cursor-pointer"
//                             >
//                                 Update Medicine
//                             </Button>
//                         </DialogFooter>
//                     </form>
//                 </DialogContent>
//             </Dialog>

//             <Dialog
//                 open={openView}
//                 onOpenChange={(v) => {
//                     setOpenView(v);
//                     if (!v) {
//                         setSelectedMedicine(null);
//                         form.reset();
//                     }
//                 }}
//             >
//                 <DialogContent className="sm:max-w-106.25">
//                     <DialogHeader>
//                         <DialogTitle>Medicine</DialogTitle>
//                     </DialogHeader>

//                     {selectedMedicine && (
//                         <div className="space-y-6 py-4 text-sm">
//                             {/* Image + Title */}
//                             <div className="flex flex-col items-center gap-3">
//                                 <div className="relative h-32 w-32 overflow-hidden rounded-xl border bg-muted">
//                                     <Image
//                                         src={
//                                             selectedMedicine.imageUrl ||
//                                             "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
//                                         }
//                                         alt={selectedMedicine.name}
//                                         fill
//                                         className="object-cover"
//                                     />
//                                 </div>

//                                 <h3 className="text-lg font-semibold">
//                                     {selectedMedicine.name}
//                                 </h3>
//                             </div>

//                             {/* Info Card */}
//                             <div className="rounded-xl border p-4">
//                                 <div className="grid grid-cols-2 gap-x-6 gap-y-3">
//                                     <InfoRow
//                                         label="Price"
//                                         value={`৳${selectedMedicine.price}`}
//                                     />
//                                     <InfoRow
//                                         label="Stock"
//                                         value={selectedMedicine.stock}
//                                     />
//                                     <InfoRow
//                                         label="Manufacturer"
//                                         value={selectedMedicine.manufacturer}
//                                     />
//                                     <InfoRow
//                                         label="Category"
//                                         value={
//                                             selectedMedicine.category?.name ||
//                                             "N/A"
//                                         }
//                                     />
//                                     <InfoRow
//                                         label="Seller"
//                                         value={
//                                             selectedMedicine.seller?.name ||
//                                             "N/A"
//                                         }
//                                     />
//                                 </div>
//                             </div>

//                             {/* Description */}
//                             <div className="rounded-xl border p-4">
//                                 <p className="mb-1 font-medium">Description</p>
//                                 <p className="text-muted-foreground leading-relaxed">
//                                     {selectedMedicine.description ||
//                                         "No description provided."}
//                                 </p>
//                             </div>

//                             {/* Stats */}
//                             <div className="flex gap-3">
//                                 <StatBadge
//                                     label="Orders"
//                                     value={
//                                         selectedMedicine.orderItems?.length ?? 0
//                                     }
//                                 />
//                                 <StatBadge
//                                     label="Reviews"
//                                     value={
//                                         selectedMedicine.reviews?.length ?? 0
//                                     }
//                                 />
//                             </div>
//                         </div>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// }
// export const InfoRow = ({
//     label,
//     value,
// }: {
//     label: string;
//     value: React.ReactNode;
// }) => (
//     <div className="flex flex-col">
//         <span className="text-xs text-muted-foreground">{label}</span>
//         <span className="font-medium">{value}</span>
//     </div>
// );

// export const StatBadge = ({
//     label,
//     value,
// }: {
//     label: string;
//     value: number;
// }) => (
//     <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
//         <span className="text-xs text-muted-foreground">{label}</span>
//         <span className="font-semibold">{value}</span>
//     </div>
// );










// "use client";

// import { Edit, Eye, Trash, Package, DollarSign, Factory } from "lucide-react";
// import { Medicine } from "../../../../types";
// import { Button } from "../../../ui/button";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "../../../ui/table";
// import { useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "../../../ui/dialog";
// import { Input } from "../../../ui/input";
// import { Label } from "../../../ui/label";
// import { z } from "zod";
// import { useForm } from "@tanstack/react-form";
// import { toast } from "sonner";
// import { Textarea } from "../../../ui/textarea";
// import {
//     deleteMedicine,
//     updateMedicine,
// } from "../../../../actions/medicine.action";
// import Image from "next/image";

// // ফর্ম ভ্যালিডেশন স্কিমা
// const medicineSchema = z.object({
//     name: z.string().min(3, "Name must be at least 3 characters"),
//     description: z.string().min(5, "Description must be at least 5 characters"),
//     price: z.number().min(1, "Price must be at least 1"),
//     stock: z.number().min(0, "Stock cannot be negative"),
//     manufacturer: z.string().min(2, "Manufacturer is required"),
//     imageUrl: z.string().url("Invalid image URL"),
// });

// export default function MedicineTable({ medicines }: { medicines: Medicine[] }) {
//     const [isEditOpen, setIsEditOpen] = useState(false);
//     const [isViewOpen, setIsViewOpen] = useState(false);
//     const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

//     // TanStack Form লজিক - আপডেট করার জন্য
//     const form = useForm({
//         defaultValues: {
//             name: "",
//             description: "",
//             price: 0,
//             stock: 0,
//             manufacturer: "",
//             imageUrl: "",
//         },
//         onSubmit: async ({ value }) => {
//             if (!selectedMedicine) return;
//             const toastId = toast.loading("Updating medicine info...");
//             try {
//                 const { data, error } = await updateMedicine(selectedMedicine.id, value);
//                 if (error) {
//                     toast.error(error.message, { id: toastId });
//                     return;
//                 }
//                 toast.success(data?.message || "Medicine updated successfully!", { id: toastId });
//                 setIsEditOpen(false);
//                 setSelectedMedicine(null);
//             } catch (err) {
//                 toast.error("Something went wrong!", { id: toastId });
//             }
//         },
//     });

//     // View Details ওপেন করার ফাংশন
//     const handleView = (medicine: Medicine) => {
//         setSelectedMedicine(medicine);
//         setIsViewOpen(true);
//     };

//     // Edit Modal ওপেন এবং ফর্মের ভ্যালু সেট করার ফাংশন
//     const handleEditClick = (medicine: Medicine) => {
//         setSelectedMedicine(medicine);
//         form.setFieldValue("name", medicine.name);
//         form.setFieldValue("description", medicine.description);
//         form.setFieldValue("price", medicine.price);
//         form.setFieldValue("stock", medicine.stock);
//         form.setFieldValue("manufacturer", medicine.manufacturer);
//         form.setFieldValue("imageUrl", medicine.imageUrl || "");
//         setIsEditOpen(true);
//     };

//     // Delete করার ফাংশন
//     const handleDelete = async (id: string) => {
//         if (!confirm("Are you sure you want to delete this medicine?")) return;

//         const toastId = toast.loading("Deleting medicine...");
//         try {
//             const { data, error } = await deleteMedicine(id);
//             if (error) {
//                 toast.error(error.message, { id: toastId });
//                 return;
//             }
//             toast.success(data.message || "Deleted successfully", { id: toastId });
//         } catch (error) {
//             toast.error("Failed to delete medicine", { id: toastId });
//         }
//     };

//     return (
//         <div className="w-full space-y-4">
//             <div className="rounded-xl border border-blue-100 shadow-sm overflow-hidden bg-white dark:bg-black">
//                 <Table>
//                     <TableHeader className="bg-blue-600">
//                         <TableRow className="hover:bg-blue-600 italic">
//                             <TableHead className="text-white w-[80px]">SL</TableHead>
//                             <TableHead className="text-white">Medicine Name</TableHead>
//                             <TableHead className="text-white text-center">Price</TableHead>
//                             <TableHead className="text-white text-center">Stock</TableHead>
//                             <TableHead className="text-white text-right">Actions</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {!medicines || medicines.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
//                                     No medicines found.
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             medicines.map((medicine, index) => (
//                                 <TableRow key={medicine.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
//                                     <TableCell className="font-medium text-blue-600 italic">#{index + 1}</TableCell>
//                                     <TableCell className="font-semibold">{medicine.name}</TableCell>
//                                     <TableCell className="text-center font-bold text-green-600">৳{medicine.price}</TableCell>
//                                     <TableCell className="text-center">
//                                         <span className={`px-2 py-1 rounded-md text-xs font-bold ${medicine.stock > 5 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                                             {medicine.stock}
//                                         </span>
//                                     </TableCell>
//                                     <TableCell className="text-right flex justify-end gap-2">
//                                         <Button size="icon" variant="outline" className="h-8 w-8 border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white" onClick={() => handleView(medicine)}>
//                                             <Eye size={14} />
//                                         </Button>
//                                         <Button size="icon" variant="outline" className="h-8 w-8 border-green-200 text-green-600 hover:bg-green-600 hover:text-white" onClick={() => handleEditClick(medicine)}>
//                                             <Edit size={14} />
//                                         </Button>
//                                         <Button size="icon" variant="outline" className="h-8 w-8 border-red-200 text-red-600 hover:bg-red-600 hover:text-white" onClick={() => handleDelete(medicine.id)}>
//                                             <Trash size={14} />
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </div>

//             {/* --- VIEW MODAL --- */}
//             <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
//                 <DialogContent className="sm:max-w-[450px] border-t-8 border-blue-600">
//                     <DialogHeader>
//                         <DialogTitle className="text-2xl font-bold text-blue-600 flex items-center gap-2">
//                             <Package /> Medicine Details
//                         </DialogTitle>
//                     </DialogHeader>
//                     {selectedMedicine && (
//                         <div className="space-y-6 py-4">
//                             <div className="flex flex-col items-center">
//                                 <div className="relative h-40 w-40 rounded-2xl border-4 border-blue-50 overflow-hidden bg-slate-100">
//                                     <Image src={selectedMedicine.imageUrl || "https://placehold.co/400x400?text=Medicine"} alt={selectedMedicine.name} fill className="object-cover" />
//                                 </div>
//                                 <h3 className="mt-4 text-xl font-bold">{selectedMedicine.name}</h3>
//                                 <p className="text-blue-500 font-medium">{selectedMedicine.manufacturer}</p>
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100">
//                                     <p className="text-xs text-blue-600 font-bold uppercase">Price</p>
//                                     <p className="text-lg font-black text-blue-900 dark:text-blue-100">৳{selectedMedicine.price}</p>
//                                 </div>
//                                 <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100">
//                                     <p className="text-xs text-green-600 font-bold uppercase">Stock Available</p>
//                                     <p className="text-lg font-black text-green-900 dark:text-green-100">{selectedMedicine.stock} Pcs</p>
//                                 </div>
//                             </div>
//                             <div className="space-y-2">
//                                 <Label className="text-blue-600 font-bold">Description</Label>
//                                 <p className="text-sm text-muted-foreground bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border italic">
//                                     {selectedMedicine.description}
//                                 </p>
//                             </div>
//                         </div>
//                     )}
//                 </DialogContent>
//             </Dialog>

//             {/* --- EDIT MODAL --- */}
//             <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
//                 <DialogContent className="sm:max-w-[500px] border-t-8 border-green-600">
//                     <DialogHeader>
//                         <DialogTitle className="text-2xl font-bold text-green-600">Update Medicine</DialogTitle>
//                     </DialogHeader>
//                     <form
//                         onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}
//                         className="space-y-4"
//                     >
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="space-y-2 col-span-2">
//                                 <Label>Medicine Name</Label>
//                                 <form.Field name="name">{(f) => <Input value={f.state.value} onChange={(e) => f.handleChange(e.target.value)} />}</form.Field>
//                             </div>
//                             <div className="space-y-2">
//                                 <Label>Price (৳)</Label>
//                                 <form.Field name="price">{(f) => <Input type="number" value={f.state.value} onChange={(e) => f.handleChange(Number(e.target.value))} />}</form.Field>
//                             </div>
//                             <div className="space-y-2">
//                                 <Label>Stock Count</Label>
//                                 <form.Field name="stock">{(f) => <Input type="number" value={f.state.value} onChange={(e) => f.handleChange(Number(e.target.value))} />}</form.Field>
//                             </div>
//                         </div>
//                         <div className="space-y-2">
//                             <Label>Manufacturer</Label>
//                             <form.Field name="manufacturer">{(f) => <Input value={f.state.value} onChange={(e) => f.handleChange(e.target.value)} />}</form.Field>
//                         </div>
//                         <div className="space-y-2">
//                             <Label>Description</Label>
//                             <form.Field name="description">{(f) => <Textarea value={f.state.value} onChange={(e) => f.handleChange(e.target.value)} />}</form.Field>
//                         </div>
//                         <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
//                             Update Medicine Information
//                         </Button>
//                     </form>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }