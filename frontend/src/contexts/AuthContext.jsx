import { createContext, useState, useEffect, useMemo } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, try to fetch the current user
  useEffect(() => {
    (async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const isAuthenticated = user !== null;

  const login = async (email, password) => {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const signup = async (name, email, password) => {
    const newUser = await authService.signup(name, email, password);
    setUser(newUser);  // immediately log in the new user
  };

  const value = useMemo(
    () => ({ user, isAuthenticated, loading, login, logout, signup }),
    [user, isAuthenticated, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};