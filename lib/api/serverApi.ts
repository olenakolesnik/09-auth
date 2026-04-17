import { cookies } from "next/headers";
// import { api } from "./api";
import { User } from "@/types/user";
// import { Note } from "@/types/note";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});


// export interface FetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// interface FetchNotesParams {
//   page?: number;
//   search?: string;
//   perPage?: number;
//   tag?: string;
// }
// 

export const getServerMe = async (): Promise<User> => {
    
    const cookieStore = await cookies();
    const {data} = await API.get('/users/me', {
      headers: {
        
        Cookie: cookieStore.toString(),
      },
    });
   
    return data;
  };