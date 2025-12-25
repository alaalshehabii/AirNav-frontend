// src/contexts/UserContext.jsx

import { createContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Helper: safely decode JWT
const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

function UserProvider({ children }) {
  // Load user from token (if exists)
  const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return decodeToken(token);
  };

  const [user, setUser] = useState(getUserFromToken());

  // Keep user in sync if token changes (refresh / manual edits)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
    } else {
      setUser(decodeToken(token));
    }
  }, []);

  // Logout helper (VERY useful for NavBar)
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    setUser,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.is_admin === true,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
