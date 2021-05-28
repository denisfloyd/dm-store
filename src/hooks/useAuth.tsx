import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../api/api';
import { User } from '../types';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User | null,
  authenticate: (username: string, password: string) => void,
  logout: () => void,
  getUser: () => User | null,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const history = useHistory();
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("@dmstore:user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const authenticate = (username: string, password: string) => {
    api.post(
      '/auth/login',
      {
        username,
        password,
      })
      .then((res) => {
        const { data } = res;
        if (data.status === 'Error') {
          if (data.msg.includes('username') || data.msg.includes('password')) {
            toast.error('Usuário ou senha incorretos');
          } else toast.error('Erro ao autenticar usuário');
        } else {
          setUser({ username, token: data.token });
          localStorage.setItem('@dmstore:user', JSON.stringify({ username, token: data.token }));
          history.push('/');
        }
      })
      .catch((error) => toast.error('Erro ao autenticar usuário'));
  };

  const getUser = (): User | null => {
    return user;
  }

  const logout = async () => {
    localStorage.removeItem('@dmstore:user');
    setUser(null);
    history.replace('/');

  };

  return (
    <AuthContext.Provider
      value={{ user, authenticate, logout, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
