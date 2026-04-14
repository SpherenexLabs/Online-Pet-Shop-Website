import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("petshop_user")) || null
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("petshop_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("petshop_user");
    }
  }, [user]);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setUser(data);
    return data;
  };

  const register = async (formData) => {
    const { data } = await api.post("/auth/register", formData);
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("petshop_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);