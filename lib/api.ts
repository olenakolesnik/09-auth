import axios from "axios";
import type { Note } from "../types/note";
import { User } from "@/types/user";



const API = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});


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
export type CreateNotePayload = {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};
  
export type CheckSessionRequest = {
    success: boolean;
};

export const checkSession = async () => {
    const {data} = await API.get<CheckSessionRequest>("/auth/session");
    return data;
};

export const getMe = async () => {
    const {data} = await API.get<User>("/users/me");
    return data;
}

export const fetchNotes = async ({
    page = 1,
    search = "",
    perPage = 12,
    tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
    const res = await API.get<FetchNotesResponse>(
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
    const { data } = await API.get<Note>(`/notes/${id}` 
    );
    return data;
}

  
export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
    const { data } = await API.post("/notes", payload);
    return data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
    const { data } = await API.delete<Note>(`/notes/${noteId}`);
    return data;
};

