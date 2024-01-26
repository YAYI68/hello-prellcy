import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();
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
  const [refreshToken, setRefreshToken] = useState("");

  const getToken = (data: string) => {
    Cookies.set("token", data);
    setAccessToken(data);
  };

  const handleSetUser = (user) => {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    Cookies.remove("token");
    sessionStorage.removeItem("user");
    setUser("");
    setAccessToken("");
  };

  const value = {
    user,
    setUser,
    handleSetUser,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
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
