import { Medicine } from "./medicine.type";
import { User } from "./user.type";

export interface Review {
    id: string;
    rating: number;
    comment: string | null;

    userId: string;
    medicineId: string;

    createdAt: Date;

    user?: User;
    medicine?: Medicine;
}