import { User } from "../../types";
import api from "./api";

export const register = async (userData: any) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const login = async (credentials: Pick<User, "email" | "password">) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const forgotPassword = async (email: Pick<User, "email">) => {
  const response = await api.post("/auth/forgot-password", email);
  return response.data;
};

export const updateUser = async (id: string, userData: Partial<User>) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};
