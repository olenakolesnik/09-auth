import { cookies } from "next/headers";
import { api } from "./api";
import { User } from "@/types/user";

export const getServerMe = async (): Promise<User> => {
    
    const cookieStore = await cookies();
    const {data} = await api.get('/users/me', {
      headers: {
        
        Cookie: cookieStore.toString(),
      },
    });
   
    return data;
  };