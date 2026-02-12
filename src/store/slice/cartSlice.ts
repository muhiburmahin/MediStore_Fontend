import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Medicine } from "../../types";
import { loadCartFromStorage } from "../../utils/cartStorage";

export interface CartItem {
    medicine: Medicine;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: loadCartFromStorage(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<{ medicine: Medicine; quantity?: number }>,
        ) => {
            const { medicine, quantity = 1 } = action.payload;

            const existingItem = state.items.find(
                (item) => item.medicine.id === medicine.id,
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    medicine,
                    quantity,
                });
            }
        },

        removeOneFromCart: (state, action: PayloadAction<string>) => {
            const itemIndex = state.items.findIndex(
                (item) => item.medicine.id === action.payload,
            );

            if (itemIndex !== -1) {
                if (state.items[itemIndex].quantity > 1) {
                    state.items[itemIndex].quantity -= 1;
                } else {
                    state.items.splice(itemIndex, 1);
                }
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.medicine.id !== action.payload,
            );
        },

        clearCart: (state) => {
            state.items = [];
            if (typeof window !== "undefined") {
                localStorage.removeItem("cart");
            }
        },

        resetCart: (state) => {
            state.items = [];
            if (typeof window !== "undefined") {
                localStorage.removeItem("cart");
            }
        },

        hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
    },
});

export const {
    addToCart,
    removeOneFromCart,
    removeFromCart,
    clearCart,
    resetCart,
    hydrateCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;