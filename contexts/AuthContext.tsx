import { User } from "@/types";
import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as authService from "../src/services/auth";

const STORAGE_KEY = "@health_app_user";

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    const { user, token } = await authService.login({ email, password });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    await AsyncStorage.setItem("@health_app_token", token);
    setUser(user);
  }, []);

  const register = useCallback(
    async (
      name: string,
      email: string,
      phone: string,
      password: string,
      role: string
    ) => {
      const { user, token } = await authService.register({
        name,
        email,
        phone,
        password,
        // role,
      });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      await AsyncStorage.setItem("@health_app_token", token);
      setUser(user);
    },
    []
  );

  const forgotPassword = useCallback(async (email: string) => {
    await authService.forgotPassword({ email });
  }, []);

  const updateUser = useCallback(async (id: string, userData: Partial<User>) => {
    const updatedUser = await authService.updateUser(id, userData);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      forgotPassword,
      updateUser,
    }),
    [user, isLoading, login, register, logout, forgotPassword, updateUser]
  );
});
