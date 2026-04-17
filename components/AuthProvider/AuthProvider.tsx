"use client";

import { useEffect } from "react";
import { checkSession, getMe } from "@/lib/api";
import { useAuthStore } from "@/lib/store/authStore";

type AuthProviderProps = {
    children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const setUser = useAuthStore((state) => state.setUser);
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

    useEffect(() => {
      async function fetchUser() {
          try {
            // Перевіряємо сесію
            const isAuthenticated = await checkSession();
            if (isAuthenticated) {
              // Якщо сесія валідна — отримуємо користувача
              const user = await getMe();
              if (user) setUser(user);
            } else {
              // Якщо сесія невалідна — чистимо стан
              clearIsAuthenticated();
            }
          } catch (error) {
            console.error("Error fetching user:", error);
            clearIsAuthenticated();
          }
          };
          fetchUser();
        }, [setUser, clearIsAuthenticated]);
      
        return children;
};

export default AuthProvider;
