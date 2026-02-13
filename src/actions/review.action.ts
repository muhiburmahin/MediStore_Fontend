// actions/review.action.ts
"use server";

import { Review } from "../types";

export async function createReview(data: Partial<Review>) {
    try {
        // এখানে আপনার DB Logic হবে (যেমন: prisma.review.create...)
        console.log("Saving Review:", data);

        return {
            data: { message: "Review submitted successfully!" },
            error: null
        };
    } catch (error: any) {
        return {
            data: null,
            error: { message: error.message || "Failed to submit review" }
        };
    }
}