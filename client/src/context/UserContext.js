import React, { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {

  const getUserData = () => {
    //const [userData, setUserData] = useState({id: "", username: "", logged_in: false})
    let auth_user = localStorage.getItem("auth_user");
    return JSON.parse(auth_user)
  };

  const login = (auth_user) => {
    localStorage.setItem("auth_user", auth_user);
    window.location.assign("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("auth_user")
    window.location.assign("/");
  }

  return (
    <UserContext.Provider value={{ login, getUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
