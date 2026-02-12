"use client";
import { useEffect, useState } from "react";
import { OrderSuccess } from "@/components/modules/success/OrderSuccess";
import { useDispatch } from "react-redux";
import { resetCart } from "@/store/slice/cartSlice";

export default function OrderSuccessPage() {
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setMounted(true);
        dispatch(resetCart());
    }, [dispatch]);

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
            <OrderSuccess />
        </main>
    );
}