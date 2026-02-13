"use client";
import { useEffect, useState } from "react";
import { CheckoutModule } from "@/components/modules/checkout/CheckoutPage";

export default function CheckoutPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow bg-white dark:bg-slate-950">
                <CheckoutModule />
            </main>

        </div>
    );
}