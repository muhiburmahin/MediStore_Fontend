"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../ui/button";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { Separator } from "../../ui/separator";

interface PaginationControls {
    meta: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
    };
}
export default function MedicinesPagination({ meta }: PaginationControls) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { limit, page, total, totalPages } = meta;

    const navigateToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
    };

    const start = page * limit - limit + 1;
    const end = Math.min(page * limit, total);
    return (
        <>
            <Separator />
            <div className="flex items-center justify-between px-2 py-4">
                <div className="text-sm text-muted-foreground">
                    Showing {start} to {end} of {total} results
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant={`outline`}
                        size={`icon`}
                        className="cursor-pointer"
                        onClick={() => navigateToPage(1)}
                        disabled={page === 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        variant={`outline`}
                        size={`icon`}
                        className="cursor-pointer"
                        onClick={() => {
                            if (page > 1) navigateToPage(page - 1);
                        }}
                        disabled={page === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">
                            Page {page} of {totalPages}
                        </span>
                    </div>

                    <Button
                        variant={`outline`}
                        size={`icon`}
                        className="cursor-pointer"
                        onClick={() => navigateToPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    <Button
                        variant={`outline`}
                        size={`icon`}
                        className="cursor-pointer"
                        onClick={() => navigateToPage(totalPages)}
                        disabled={page === totalPages}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    );
}