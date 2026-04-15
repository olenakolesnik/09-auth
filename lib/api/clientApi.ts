import type { User } from "../../types/user";

import { api } from "./api";

type RegisterRequest = {
    email: string;
    password: string;
}

type LoginRequest = {
    email: string;
    password: string;
}

export const login = async (data: LoginRequest) => {
    const res = await api.post<User>("/auth/login", data);
    return res.data;
}

export const register = async (data: RegisterRequest) => {
    const res = await api.post<User>("/auth/register", data);
    return res.data;
}

