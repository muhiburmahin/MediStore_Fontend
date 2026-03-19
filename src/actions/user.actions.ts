"use server";

import { userService } from "@/services/user.service";
import { UpdateUser } from "../types";
import { updateTag } from "next/cache";

export const getUser = async () => {
    return await userService.getSession();
};

export const updateUser = async (id: string, data: UpdateUser) => {
    const res = await userService.updateUser(id, data);
    updateTag("users");
    updateTag("me");
    return res;
};