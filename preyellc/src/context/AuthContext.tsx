import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

type User = {
  email: string;
  id: string;
  isActive: boolean;
  name: string;
  username: string;
};
type valueType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
  handleSetUser: (data: User) => void;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
  getToken: (data: string) => void;
};
const AuthContext = createContext(null);
type Props = {
  children: React.ReactNode;
};
export function AuthProvider(props: Props) {
  const { children } = props;
  const token = Cookies.get("token");
  const [user, setUser] = useState(() =>
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [accessToken, setAccessToken] = useState(token);

  const getToken = (data: string) => {
    Cookies.set("token", data);
    setAccessToken(data);
  };

  const handleSetUser = (user: User) => {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    Cookies.remove("token");
    sessionStorage.removeItem("user");
    setUser("");
    setAccessToken("");
  };

  const value: valueType = {
    user,
    setUser,
    handleSetUser,
    accessToken,
    setAccessToken,
    logout,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context == undefined) {
    throw new Error("useAuthContext must be within a App provider");
  }
  return context;
}
