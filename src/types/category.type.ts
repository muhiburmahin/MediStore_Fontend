import { Medicine } from "./medicine.type";

export interface Category {
    id: string;
    name: string;
    medicines?: Medicine[];
    createdAt: Date;
    updatedAt: Date;
}