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
    images: string[];
    categoryId: string;
    sellerId: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    averageRating?: number;
    totalReviews?: number;
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
    images: string[];
    categoryId: string;
    sellerId: string;
}


export interface UpdateMedicine {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    manufacturer?: string;
    images?: string[];
    categoryId?: string;
}

export interface MedicineResponse {
    success: boolean;
    data: Medicine[];
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    } | null;
    error?: string;
}