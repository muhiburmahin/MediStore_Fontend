"use client";

import Footer from "@/components/layout/Footer";
import CartPage from "@/components/modules/cart/cartPage";
import { EmptyCart } from "@/components/modules/success/EmptyCart";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';

export default function Cart() {
    const [mounted, setMounted] = useState(false);
    const cart = useSelector((state: RootState) => state.cart.items);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    if (cart.length === 0) {
        return (
            <main className="min-h-[80vh] flex items-center justify-center">
                <EmptyCart />
            </main>
        );
    }

    return (
        <div className="container mx-auto">
            <CartPage />
            <Footer />
        </div>
    );
}