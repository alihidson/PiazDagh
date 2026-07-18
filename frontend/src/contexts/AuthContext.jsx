import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import authService from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial user fetch
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

  const login = useCallback(async (username, password) => {
    const loggedInUser = await authService.login(username, password);
    setUser(loggedInUser);
  }, []);

  const signup = useCallback(
    async (
      username,
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    ) => {
      const newUser = await authService.signup(
        username,
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      );

      setUser(newUser);
    },
    [],
  );



  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  // New: update user data locally
  const updateUser = useCallback((userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      login,
      signup,
      logout,
      updateUser, // <-- added
    }),
    [user, isAuthenticated, loading, login, signup, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
