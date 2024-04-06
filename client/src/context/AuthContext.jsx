import { createContext, useContext, useEffect, useState } from "react";

// creat context
export const AuthContext = createContext();

// provide context
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// use context
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
