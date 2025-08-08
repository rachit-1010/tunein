// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [token, setToken] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState();

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
