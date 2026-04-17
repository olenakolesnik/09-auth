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
export type CheckSessionRequest = {
    success: boolean;
};

export const checkSession = async (): Promise<CheckSessionRequest> => {
    const res = await api.get<CheckSessionRequest>("/auth/session");
    return res.data;
};

export const getMe = async () => {
    const {data} = await api.get("/users/me");
    return data;
}

export const login = async (data: LoginRequest) => {
    const res = await api.post<User>("/auth/login", data);
    return res.data;
}

export const register = async (data: RegisterRequest) => {
    const res = await api.post<User>("/auth/register", data);
    return res.data;
}

export const logout = async () => {
    const res = await api.post<User>("/auth/logout");
    return res.data;
}
