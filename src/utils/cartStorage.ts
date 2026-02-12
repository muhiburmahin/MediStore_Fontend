import { CartItem } from "../store/slice/cartSlice";

const CART_KEY = "medistore_cart_v1";

export const loadCartFromStorage = (): CartItem[] => {
    if (typeof window === "undefined") return [];
    try {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

export const saveCartToStorage = (items: CartItem[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
};