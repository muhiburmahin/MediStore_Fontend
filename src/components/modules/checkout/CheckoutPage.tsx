"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    ChevronLeft, MapPin, Phone, User,
    ShoppingBag, Loader2, CheckCircle2, Banknote
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { RootState } from "@/store";
import { createOrderAction } from "@/actions/order.action";
import { clearCart } from "@/store/slice/cartSlice";
import { OrderSuccess } from "../success/OrderSuccess";

// --- Types ---
interface Medicine {
    id: string;
    name: string;
    price: number;
    images: string[];
}

interface CartItem {
    medicine: Medicine;
    quantity: number;
}

const checkoutSchema = z.object({
    fullName: z.string().min(3, "Full name is required"),
    phone: z.string().min(11, "Valid phone number is required").max(14),
    address: z.string().min(10, "Detail address is required"),
    city: z.string().min(2, "City is required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// --- Shipping Form Section ---
const ShippingForm = ({ formMethods }: { formMethods: UseFormReturn<CheckoutFormValues> }) => {
    const { register, formState: { errors } } = formMethods;

    return (
        <div className="space-y-4">
            <section className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border-t-4 border-blue-600 shadow-lg shadow-blue-500/5 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <MapPin className="text-white" size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 dark:text-white">Shipping Info</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-blue-600 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={16} />
                            <input {...register("fullName")} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-600 rounded-xl py-3 pl-10 pr-4 outline-none transition-all text-sm" placeholder="Enter name" />
                        </div>
                        {errors.fullName && <p className="text-red-500 text-[10px] font-bold">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-blue-600 ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={16} />
                            <input {...register("phone")} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-600 rounded-xl py-3 pl-10 pr-4 outline-none transition-all text-sm" placeholder="01XXXXXXXXX" />
                        </div>
                        {errors.phone && <p className="text-red-500 text-[10px] font-bold">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-blue-600 ml-1">Full Address</label>
                        <textarea {...register("address")} rows={2} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-600 rounded-xl p-3 outline-none transition-all text-sm" placeholder="House/Road/Area" />
                        {errors.address && <p className="text-red-500 text-[10px] font-bold">{errors.address.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-blue-600 ml-1">City</label>
                        <input {...register("city")} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-600 rounded-xl py-3 px-4 outline-none transition-all text-sm" placeholder="City" />
                        {errors.city && <p className="text-red-500 text-[10px] font-bold">{errors.city.message}</p>}
                    </div>
                </div>
            </section>

            {/* Cash on Delivery (Bangla removed) */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 p-4 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
                    <Banknote className="text-white" size={18} />
                </div>
                <h3 className="text-sm font-black text-green-700 dark:text-green-500 uppercase tracking-wide">Cash on Delivery</h3>
            </div>
        </div>
    );
};

// --- Order Summary Section ---
const OrderPreview = ({ isSubmitting }: { isSubmitting: boolean }) => {
    const cart = useSelector((state: RootState) => state.cart.items) as unknown as CartItem[];

    // Only Item Total (Shipping charge removed)
    const total = cart.reduce((acc, item) => acc + (item.medicine.price * item.quantity), 0);

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-t-4 border-green-600 shadow-lg shadow-green-500/5 lg:sticky lg:top-10 transition-colors">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
                <ShoppingBag className="text-green-600" size={20} /> Order Summary
            </h2>

            <div className="max-h-52 overflow-y-auto mb-6 pr-1 space-y-3 custom-scrollbar">
                {cart.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                        <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden shrink-0 border border-slate-100">
                            {item.medicine.images?.[0] && <Image src={item.medicine.images[0]} alt="" fill className="object-contain p-1" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs truncate dark:text-slate-200">{item.medicine.name}</h4>
                            <p className="text-[10px] font-black text-blue-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-black text-xs text-slate-700 dark:text-slate-200">৳{item.medicine.price * item.quantity}</div>
                    </div>
                ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Amount Payable</p>
                <div className="text-5xl font-black text-blue-600 dark:text-blue-500 tracking-tighter">
                    ৳{total.toLocaleString()}
                </div>

                <button
                    disabled={isSubmitting || cart.length === 0}
                    type="submit"
                    className="w-full h-16 bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90 text-white rounded-xl text-xl font-black flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 mt-6 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <><CheckCircle2 size={22} /> Place Order</>}
                </button>
            </div>
        </div>
    );
};

export default function CheckoutPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState("");

    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.items) as unknown as CartItem[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = useSelector((state: RootState) => (state as any).auth?.user);

    const formMethods = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema)
    });

    const onSubmit = async (data: CheckoutFormValues) => {
        if (cart.length === 0) return toast.error("Cart is empty!");
        setIsSubmitting(true);

        const subTotal = cart.reduce((acc, item) => acc + (item.medicine.price * item.quantity), 0);

        const orderPayload = {
            customerId: user?.id,
            items: cart.map(item => ({
                medicineId: item.medicine.id,
                quantity: item.quantity,
                price: item.medicine.price
            })),
            shippingAddress: `${data.address}, ${data.city}`,
            phone: data.phone,
            fullName: data.fullName,
            shippingFee: 0, // Zero as per request
            totalAmount: subTotal
        };

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = await createOrderAction(orderPayload as any);
            if (result?.success) {
                setOrderId(result.data?.id || result.data?._id || "SUCCESS");
                setIsSuccess(true);
                dispatch(clearCart());
                toast.success("Order Placed Successfully!");
            }
        } catch (err) {
            toast.error("Failed to place order.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) return <OrderSuccess orderId={orderId} />;

    return (
        <div className="bg-[#f8faff] dark:bg-slate-950 min-h-screen pb-10 transition-colors">
            <div className="max-w-5xl mx-auto px-4 pt-8">
                <div className="mb-8">
                    <Link href="/cart" className="flex items-center gap-1 text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-2 hover:translate-x-[-4px] transition-transform">
                        <ChevronLeft size={14} /> Back to Cart
                    </Link>
                    {/* Blue & Green Checkout Text */}
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                        <span className="text-blue-600">Check</span>
                        <span className="text-green-600">out.</span>
                    </h1>
                </div>

                <form onSubmit={formMethods.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7">
                        <ShippingForm formMethods={formMethods} />
                    </div>
                    <div className="lg:col-span-5">
                        <OrderPreview isSubmitting={isSubmitting} />
                    </div>
                </form>
            </div>
        </div>
    );
}