/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from "zod";
import { toast } from "sonner";
import {
    Eye, MessageSquare, Star, Package, Truck, CheckCircle2,
    XCircle, Clock, ChevronLeft, ChevronRight, User as UserIcon, Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { FieldLabel } from "../../ui/field";
import { Textarea } from "../../ui/textarea";
import { createReview } from "../../../actions/review.action";

const orderStatusConfig: Record<string, { color: string; icon: any; label: string }> = {
    PLACED: { color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: Clock, label: "Placed" },
    PROCESSING: { color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", icon: Package, label: "Processing" },
    SHIPPED: { color: "bg-purple-500/10 text-purple-400 border-purple-500/20", icon: Truck, label: "Shipped" },
    DELIVERED: { color: "bg-green-500/10 text-green-400 border-green-500/20", icon: CheckCircle2, label: "Delivered" },
    CANCELLED: { color: "bg-red-500/10 text-red-400 border-red-500/20", icon: XCircle, label: "Cancelled" },
};

const reviewSchema = z.object({
    rating: z.number().min(1, "Please select a rating"),
    comment: z.string().min(10, "Comment must be at least 10 characters"),
});

export default function MyOrdersTable({ orders, user }: { orders: any[]; user: any }) {
    const router = useRouter();
    const [selectedMedicineId, setSelectedMedicineId] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return orders.slice(start, start + itemsPerPage);
    }, [orders, currentPage]);

    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const form = useForm({
        defaultValues: { rating: 5, comment: "" },
        //  validatorAdapter: zodValidator(),
        validators: { onChange: reviewSchema },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Publishing review...");
            try {
                const response = await createReview({
                    rating: value.rating,
                    comment: value.comment,
                    userId: user?.id,
                    medicineId: selectedMedicineId,
                });
                if (response?.error) throw new Error(response.error.message);
                toast.success("Review added successfully!", { id: toastId });
                setIsReviewOpen(false);
                form.reset();
                router.refresh();
            } catch (err: any) {
                toast.error(err.message || "Failed to add review", { id: toastId });
            }
        },
    });

    // Helper to render error messages safely
    const renderError = (errors: any[]) => {
        if (!errors || errors.length === 0) return null;
        const error = errors[0];
        const message = typeof error === 'string' ? error : error?.message;
        return <p className="text-red-400 text-xs font-bold mt-1">{message}</p>;
    };

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-white/5 bg-[#0a0a0b] gap-4">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white">
                        <UserIcon className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg leading-tight">{user?.name}</h3>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                            <Mail className="h-3.5 w-3.5" />
                            <span>{user?.email}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0a0a0b] overflow-hidden shadow-2xl">
                <Table>
                    <TableHeader className="bg-white/[0.03]">
                        <TableRow className="hover:bg-transparent border-white/5">
                            <TableHead className="text-gray-400 font-bold py-4">Order ID</TableHead>
                            <TableHead className="text-gray-400 font-bold">Shipping Address</TableHead>
                            <TableHead className="text-gray-400 font-bold">Total</TableHead>
                            <TableHead className="text-gray-400 font-bold">Status</TableHead>
                            <TableHead className="text-right text-gray-400 font-bold">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {paginatedOrders.map((order) => {
                                const config = orderStatusConfig[order.status] || orderStatusConfig.PLACED;
                                return (
                                    <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-white/5 hover:bg-white/[0.02]">
                                        <TableCell className="font-bold text-white py-4">#{order.id.slice(-6).toUpperCase()}</TableCell>
                                        <TableCell className="max-w-[200px] truncate text-gray-400">{order.shippingAddress}</TableCell>
                                        <TableCell className="font-bold text-white">৳{order.totalAmount}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border tracking-wide uppercase ${config.color}`}>
                                                <config.icon className="h-3 w-3" /> {config.label}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={() => { setSelectedOrder(order); setIsDetailsOpen(true); }}>
                                                <Eye className="h-4 w-4 mr-2" /> Details
                                            </Button>
                                        </TableCell>
                                    </motion.tr>
                                );
                            })}
                        </AnimatePresence>
                    </TableBody>
                </Table>

                <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
                    <p className="text-xs text-gray-500 font-medium">Page {currentPage} of {totalPages}</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="border-white/10 text-gray-400"><ChevronLeft className="h-4 w-4" /></Button>
                        <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="border-white/10 text-gray-400"><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                </div>
            </div>

            {/* Order Details Modal */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="max-w-2xl bg-[#0a0a0b] border-white/10 text-white p-0 overflow-hidden">
                    <DialogHeader className="p-6 border-b border-white/5 bg-white/[0.02]">
                        <DialogTitle className="flex items-center gap-3"><Package className="h-5 w-5 text-blue-400" /> Order Summary</DialogTitle>
                    </DialogHeader>
                    <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                        {selectedOrder?.items?.map((item: any) => (
                            <div key={item.id} className="flex items-center justify-between p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold">{item.medicine?.name?.[0]}</div>
                                    <p className="font-bold">{item.medicine?.name}</p>
                                </div>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-500" onClick={() => { setSelectedMedicineId(item.medicineId); setIsReviewOpen(true); setIsDetailsOpen(false); }}>
                                    <MessageSquare className="h-4 w-4 mr-2" /> Write Review
                                </Button>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Review Modal */}
            <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                <DialogContent className="sm:max-w-[450px] bg-[#0a0a0b] border-white/10 text-white rounded-3xl p-8 shadow-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-center bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Rate Your Purchase</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}
                        className="space-y-8 mt-6"
                    >
                        <form.Field name="rating">
                            {(field) => (
                                <div className="space-y-4 text-center">
                                    <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Service Quality</FieldLabel>
                                    <div className="flex justify-center gap-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                type="button"
                                                key={star}
                                                onClick={() => field.handleChange(star)}
                                                className={`transition-all duration-300 hover:scale-125 ${star <= field.state.value ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" : "text-white/5"}`}
                                            >
                                                <Star className={`h-10 w-10 ${star <= field.state.value ? "fill-yellow-400" : ""}`} />
                                            </button>
                                        ))}
                                    </div>
                                    {renderError(field.state.meta.errors)}
                                </div>
                            )}
                        </form.Field>

                        <form.Field name="comment">
                            {(field) => (
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center px-1">
                                        <FieldLabel className="text-sm font-bold text-gray-400">Your Message</FieldLabel>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${field.state.value.length >= 10 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {field.state.value.length}/10 min
                                        </span>
                                    </div>
                                    <Textarea
                                        placeholder="Tell us more (minimum 10 characters)..."
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="min-h-[140px] bg-white/[0.02] border-white/5 text-white rounded-2xl focus:ring-2 focus:ring-blue-500/20 resize-none p-5"
                                    />
                                    {renderError(field.state.meta.errors)}
                                </div>
                            )}
                        </form.Field>

                        <DialogFooter>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-2xl py-7 text-lg font-black shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]">
                                Submit Review
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}