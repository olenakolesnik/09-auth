import { cookies } from "next/headers";

import { User } from "@/types/user";

import { api } from "./api";

export const getCookieHeader = async () => {
  const cookieStore = await cookies();

 return cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");
};



export const getServerMe = async (): Promise<User> => {
    
    const {data} = await api.get('/users/me', {
      headers: {
        Cookie: await getCookieHeader(),
      },
    });
   
    return data;
};
  
