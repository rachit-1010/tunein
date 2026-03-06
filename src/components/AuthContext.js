import { createContext, useContext, useState, useCallback, useRef } from 'react';

const AuthContext = createContext();
const BACKEND_URL = "https://tunein-backend.rachitshah.dev";
// const BACKEND_URL = "http://127.0.0.1:5001";

export const AuthProvider = ({ children }) => {
  // Clean up old token key from previous version
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
  }

  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const refreshTokenRef = useRef(localStorage.getItem("refreshToken"));
  const isRefreshingRef = useRef(false);
  const refreshPromiseRef = useRef(null);

  const login = (accessToken, refreshToken, name) => {
    setToken(accessToken);
    setUsername(name);
    refreshTokenRef.current = refreshToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("username", name);
  };

  const loginGuest = () => {
    setToken("guest");
    setUsername("guest");
    refreshTokenRef.current = null;
    localStorage.setItem("accessToken", "guest");
    localStorage.removeItem("refreshToken");
    localStorage.setItem("username", "guest");
  };

  const logout = useCallback(() => {
    const rt = refreshTokenRef.current;
    if (rt) {
      fetch(`${BACKEND_URL}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: rt })
      }).catch(() => {});
    }
    setToken(null);
    setUsername(null);
    refreshTokenRef.current = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
  }, []);

  const refreshAccessToken = useCallback(async () => {
    if (isRefreshingRef.current) {
      return refreshPromiseRef.current;
    }

    const rt = refreshTokenRef.current || localStorage.getItem("refreshToken");
    if (!rt) {
      logout();
      return null;
    }

    isRefreshingRef.current = true;
    refreshPromiseRef.current = (async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: rt })
        });

        if (!res.ok) {
          logout();
          window.location.reload();
          return null;
        }

        const data = await res.json();
        const newAccessToken = data.accessToken;
        setToken(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
        return newAccessToken;
      } catch (e) {
        logout();
        window.location.reload();
        return null;
      } finally {
        isRefreshingRef.current = false;
        refreshPromiseRef.current = null;
      }
    })();

    return refreshPromiseRef.current;
  }, [logout]);

  const authFetch = useCallback(async (url, options = {}) => {
    const currentToken = localStorage.getItem("accessToken");

    if (currentToken === "guest") {
      return fetch(url, {
        ...options,
        headers: { ...options.headers, Authorization: "guest" }
      });
    }

    const doFetch = (tkn) => fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: tkn }
    });

    let response = await doFetch(currentToken);

    if (response.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        response = await doFetch(newToken);
      }
    }

    return response;
  }, [refreshAccessToken]);

  return (
    <AuthContext.Provider value={{ token, login, loginGuest, logout, username, setUsername, authFetch }}>
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
