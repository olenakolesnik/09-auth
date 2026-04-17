import { Note } from "@/types/note";
import type { User } from "../../types/user";
import { api } from "./api";


export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
  }
  
  interface FetchNotesParams {
    page?: number;
    search?: string;
    perPage?: number;
    tag?: string;
  }

type RegisterRequest = {
    email: string;
    password: string;
}

type LoginRequest = {
    email: string;
    password: string;
}
export type CreateNotePayload = {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};
export type CheckSessionRequest = {
    success: boolean;
};
export const checkSession = async (): Promise<CheckSessionRequest> => {
    const res = await api.get<CheckSessionRequest>("/auth/session");
    return res.data;
  };
export const getMe = async (): Promise<User> => {
    const {data} = await api.get<User>("/users/me");
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

export const logout = async (): Promise<void> => {
    await api.post("/auth/logout");
}

  
export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
    const { data } = await api.post("/notes", payload);
    return data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
    const { data } = await api.delete<Note>(`/notes/${noteId}`);
    return data;
};
export const fetchNotes = async ({
    page = 1,
    search = "",
    perPage = 12,
    tag,
  }: FetchNotesParams): Promise<FetchNotesResponse> => {
    const res = await api.get<FetchNotesResponse>(
      "/notes",
        {
            params: {
                page,
                search,
                perPage,
                ...(tag ? { tag } : {}),
          },
      }
    );
  return res.data;
};
export async function fetchNoteById(id: Note["id"]) {
    const { data } = await api.get<Note>(`/notes/${id}`);
    return data;
    }
    