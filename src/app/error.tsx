"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => { console.error(error); }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <Button onClick={() => reset()} className="bg-brand text-black font-bold">Try again</Button>
        </div>
    );
}