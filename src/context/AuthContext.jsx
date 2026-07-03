import { createContext, useContext, useState } from "react";
import { authService } from "../api/authService";

const KEY = "kitchen-notes:auth";
const REGISTERED_KEY = "kitchen-notes:registered-users";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => JSON.parse(localStorage.getItem(KEY) || "null"));

  const save = (next) => { setSession(next); localStorage.setItem(KEY, JSON.stringify(next)); };
  const login = async (credentials) => {
    const localUsers = JSON.parse(localStorage.getItem(REGISTERED_KEY) || "[]");
    const local = localUsers.find((u) => u.username === credentials.username && u.password === credentials.password);
    const user = local ? { ...local, accessToken: `local-${Date.now()}`, refreshToken: "local" } : await authService.login(credentials);
    save(user);
    return user;
  };
  const register = async (form) => {
    const users = JSON.parse(localStorage.getItem(REGISTERED_KEY) || "[]");
    if (users.some((u) => u.username === form.username || u.email === form.email)) throw new Error("That username or email is already registered.");
    const user = { id: Date.now(), firstName: form.firstName, lastName: form.lastName, email: form.email, username: form.username, password: form.password, role: "user", image: `https://ui-avatars.com/api/?name=${encodeURIComponent(`${form.firstName} ${form.lastName}`)}` };
    localStorage.setItem(REGISTERED_KEY, JSON.stringify([...users, user]));
    save({ ...user, accessToken: `local-${Date.now()}`, refreshToken: "local" });
    return user;
  };
  const logout = () => { setSession(null); localStorage.removeItem(KEY); };
  const updateProfile = (changes) => save({ ...session, ...changes });
  const value = { user: session, isAuthenticated: Boolean(session?.accessToken), login, register, logout, updateProfile };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
