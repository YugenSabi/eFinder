'use client';

import {createContext, useContext, useState, type PropsWithChildren} from 'react';

export type AuthUser = {
  id: string;
  email: string;
  isVerified: boolean;
  firstName?: string | null;
  lastName?: string | null;
  role?: string;
} | null;

type AuthContextValue = {
  currentUser: AuthUser;
  setCurrentUser: (user: AuthUser) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
  initialUser,
}: PropsWithChildren<{initialUser: AuthUser}>) {
  const [currentUser, setCurrentUser] = useState<AuthUser>(initialUser);

  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
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
