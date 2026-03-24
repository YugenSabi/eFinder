'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import {getCurrentUser} from '../kratos';
import type {AuthUser} from './types';

type AuthContextValue = {
  currentUser: AuthUser;
  setCurrentUser: (user: AuthUser) => void;
  isAuthResolved: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
  initialUser,
}: PropsWithChildren<{initialUser: AuthUser}>) {
  const [currentUser, setCurrentUser] = useState<AuthUser>(initialUser);
  const [isAuthResolved, setIsAuthResolved] = useState(Boolean(initialUser));

  useEffect(() => {
    if (initialUser) {
      setCurrentUser(initialUser);
      setIsAuthResolved(true);
      return;
    }

    let cancelled = false;

    getCurrentUser()
      .then((nextUser) => {
        if (!cancelled) {
          setCurrentUser(nextUser);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCurrentUser(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsAuthResolved(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [initialUser]);

  return (
    <AuthContext.Provider
      value={{currentUser, setCurrentUser, isAuthResolved}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
