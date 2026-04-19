"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

type Role = "Administrator" | "Manager" | "Employee" | "User";

interface AuthUser {
  email: string;
  role: Role;
  userId?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  logout: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch logged-in user
 const fetchUser = async (): Promise<boolean> => {
  try {
    const response = await api.get("/auth/me");
    setUser(response.data);
    return true;
  } catch {
    setUser(null);
    return false;
  }
};


  // Login
  const login = async (
    usernameOrEmail: string,
    password: string
  ): Promise<boolean> => {
    try {
      await api.post("/auth/login", {
        usernameOrEmail,
        password,
      });

      const success = await fetchUser();
      return success;
    } catch {
      return false;
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      await api.post("/User/logout");
    } catch {}

    setUser(null);
    router.push("/auth/login");
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  // Initial auth check
  useEffect(() => {
    const initAuth = async () => {
      const path = window.location.pathname;

      // ❗ Kaliya dashboard routes ayaa u baahan auth check
      if (!path.startsWith("/dashboard")) {
        setLoading(false);
        return;
      }

      await fetchUser();
      setLoading(false);
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
