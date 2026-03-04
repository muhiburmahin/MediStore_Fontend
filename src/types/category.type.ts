export interface Category {
    id: string;
    name: string;
    imageUrl?: string | null;
    iconName?: string;
    color?: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}