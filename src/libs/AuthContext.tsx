import React, { createContext, useContext, useState } from "react";
import api from "./api";
import { AuthContextType } from "../models/AuthContextType";
import { AuthResponse, LoginRequest, SignUpRequest, User } from "../models/User";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const loadUser = (): User | null => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(loadUser());
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const save = (res: AuthResponse) => {
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    setToken(res.token);
    setUser(res.user);
  };

  const login = async (data: LoginRequest) => {
    const res = await api.post<AuthResponse>("/auth/login", data);
    save(res.data);
  };

  const signUp = async (data: SignUpRequest) => {
    const res = await api.post<AuthResponse>("/auth/register", data);
    save(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const updateUser = (u: User) => {
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!token, login, signUp, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
