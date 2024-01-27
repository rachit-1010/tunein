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

  useEffect(() => {
    if (token !== null) {
      fetch ("http://127.0.0.1:5000/getlogininfo", {
        method: "GET",
        headers: {
          "Authorization": token
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setUsername(data)
        })
        .catch(err => console.log())
      }
  }, [token])

  const logout = () => {
    setToken(null);
	// also remove token from local storage
	localStorage.removeItem("token")
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, username }}>
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
