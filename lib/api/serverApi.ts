import { cookies } from "next/headers";

import { User } from "@/types/user";

import { api } from "./api";
import { AxiosResponse } from "axios";
import { CheckSessionRequest } from "@/types/auth";
import { FetchNotesParams, FetchNotesResponse, Note } from "@/types/note";

export const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();

 return cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");
};

export const checkSessionRaw = async (): Promise<
  AxiosResponse<CheckSessionRequest>
> => {
  return api.get<CheckSessionRequest>("/auth/session", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
};

export const getServerMe = async (): Promise<User> => {
    
    const {data} = await api.get('/users/me', {
      headers: {
        Cookie: await getCookieHeader(),
      },
    });
   
    return data;
};
export const fetchNotes = async ({
  page = 1,
  search = "",
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      search,
      perPage,
      ...(tag ? { tag } : {}),
    },
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};
  
export const fetchNoteById = async (
  id: Note["id"]
): Promise<Note> => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};