import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { api } from '../api/api';
import { User } from '../types';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User,
  authenticate: (username: string, password: string) => Promise<void>,
  logout: () => Promise<void>,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem("@dmstore:user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const authenticate = async (username: string, password: string) => {
    return await axios.post(
      `${api}/auth/login`,
      {
        username,
        password,
      })
      .then((res) => console.log(res));

  };

  const logout = async () => {
    console.log("logout");
  };

  return (
    <AuthContext.Provider
      value={{ user, authenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
