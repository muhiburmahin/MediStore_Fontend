import { Category } from "./category.type";
import { OrderItem } from "./order.type";
import { Review } from "./review.type";
import { User } from "./user.type";


export interface Medicine {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    manufacturer: string;
    imageUrl: string;

    categoryId: string;
    sellerId: string;

    createdAt: Date;
    updatedAt: Date;

    category?: Category;
    seller?: User;
    orderItems?: OrderItem[];
    reviews?: Review[];
}

export interface CreateMedicine {
    name: string;
    description: string;
    price: number;
    stock: number;
    manufacturer: string;
    imageUrl: string;
    categoryId: string;
    sellerId: string;
}

export interface UpdateMedicine {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    manufacturer?: string;
    imageUrl?: string;
}