import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

export interface UserState {
    user: User | null;
    loading: boolean;
}

export const initialState: UserState = {
    user: null,
    loading: true,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.loading = false;
        },
    },
});

export const { startLoading, stopLoading, setUser } =
    userSlice.actions;
export const userReducer = userSlice.reducer;