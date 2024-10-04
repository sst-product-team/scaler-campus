import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "anonymous",
    email: null,
    scope: [],
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedScope = localStorage.getItem("scope");

    if (storedUsername || storedEmail) {
      setUser({
        username: storedUsername || "anonymous",
        email: storedEmail || null,
        scope: storedScope ? localStorage.getItem("scope").split(",") : [],
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
