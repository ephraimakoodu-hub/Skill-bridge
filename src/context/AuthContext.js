import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
  updateProfile,
  deleteAccount,
} from "../utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const currentUser = await getCurrentUser();

      if (mounted) {
        setUser(currentUser);
        setReady(true);
      }
    }

    loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(async (credentials) => {
    const result = await loginUser(credentials);

    if (result.ok) {
      setUser(result.user);
    }

    return result;
  }, []);

  const register = useCallback(async (details) => {
    const result = await registerUser(details);

    if (result.ok) {
      setUser(result.user);
    }

    return result;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  const refreshProfile = useCallback(async (updates) => {
    const result = await updateProfile(updates);

    if (result.ok) {
      setUser(result.user);
    }

    return result;
  }, []);

  const removeAccount = useCallback(async () => {
    const result = await deleteAccount();

    if (result.ok) {
      setUser(null);
    }

    return result;
  }, []);

  const value = {
    user,
    ready,
    login,
    register,
    logout,
    refreshProfile,
    removeAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;
}