// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
	  localStorage.setItem("token", newToken)
  };

  const logout = () => {
    setToken(null);
	// also remove token from local storage
	localStorage.removeItem("token")
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
