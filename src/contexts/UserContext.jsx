
import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

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

  const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return decodeToken(token);
  };

  const [user, setUser] = useState(getUserFromToken());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
    } else {
      setUser(decodeToken(token));
    }
  }, []);

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
