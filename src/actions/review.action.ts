"use server";

import { reviewService } from "../services/review.service";
import { Review } from "../types";
import { revalidatePath } from "next/cache";

export const createReview = async (data: Partial<Review>) => {
    try {
        const result = await reviewService.createReview(data);
        revalidatePath("/dashboard/my-orders");
        return { data: result, error: null };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return {
            data: null,
            error: {
                message: error.message || "Internal Server Error"
            }
        };
    }
}