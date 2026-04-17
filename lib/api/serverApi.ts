import { cookies } from "next/headers";

import { User } from "@/types/user";

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});


export const getServerMe = async (): Promise<User> => {
    
    const cookieStore = await cookies();
    const {data} = await API.get('/users/me', {
      headers: {
        
        Cookie: cookieStore.toString(),
      },
    });
   
    return data;
  };