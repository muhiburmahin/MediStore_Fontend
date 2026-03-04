import { Category } from "@/types/category.type";

// যেহেতু মূল Category টাইপে আইকন বা কালার নেই, তাই আমরা এটি ব্যবহার করছি
export interface ExtendedCategory extends Category {
    imageUrl?: string;
    iconName?: string;
    color?: string;
}

export const MOCK_CATEGORIES: ExtendedCategory[] = [
    {
        id: "cat1",
        name: "Pain Relief",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/822/822143.png",
        iconName: "Pill",
        color: "bg-red-50 text-red-600",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "cat2",
        name: "Fever",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/2853/2853813.png",
        iconName: "Thermometer",
        color: "bg-orange-50 text-orange-600",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "cat3",
        name: "Gastric",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/3209/3209123.png",
        iconName: "Flame",
        color: "bg-yellow-50 text-yellow-600",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "cat4",
        name: "Allergy",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/3429/3429188.png",
        iconName: "Flower",
        color: "bg-green-50 text-green-600",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "cat5",
        name: "Cough & Cold",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966471.png",
        iconName: "Droplets",
        color: "bg-blue-50 text-blue-600",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "cat6",
        name: "Supplements",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/2738/2738871.png",
        iconName: "Activity",
        color: "bg-purple-50 text-purple-600",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "cat7",
        name: "Asthma",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/2864/2864380.png",
        iconName: "Wind",
        color: "bg-cyan-50 text-cyan-600",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "cat8",
        name: "Antibiotic",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967535.png",
        iconName: "Microbe",
        color: "bg-emerald-50 text-emerald-600",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "cat9",
        name: "Healthcare",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/2382/2382443.png",
        iconName: "HeartPulse",
        color: "bg-pink-50 text-pink-600",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "cat10",
        name: "Skin Care",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/1946/1946051.png",
        iconName: "Sparkles",
        color: "bg-rose-50 text-rose-600",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];