export enum Role {
    CUSTOMER = "CUSTOMER",
    SELLER = "SELLER",
    ADMIN = "ADMIN",
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    BANNED = "BANNED",
}

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    phone?: string | null;
    role: Role;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateUser {
    name?: string;
    image?: string | null;
    phone?: string | null;
    role?: Role;
    status?: UserStatus;
}