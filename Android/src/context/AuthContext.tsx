import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    setIsAuthenticated(true);
    await SecureStore.setItemAsync('session', 'active');
  };

  const logout = async () => {
    setIsAuthenticated(false);
    await SecureStore.deleteItemAsync('session');
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await SecureStore.getItemAsync('session');
        if (session === 'active') {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.warn('Error al verificar sesión:', error);
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
