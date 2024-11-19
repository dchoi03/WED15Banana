import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  signUp: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (username: string, password: string) => {
        // could do something more complex but with 2 dummy users no need
      if ((username === 'U1' && password === 'p') || (username === 'u2' && password === 'p')) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      console.log('Authcontext.tsx, isAuthenticated is:', isAuthenticated);
    };

    const signUp = (email: string, password: string) => {
      console.log(`Successful signup! email: ${email},  password: ${password}`);
      setIsAuthenticated(true);
    };

    // console.log('AUTHCONTEXT isAuthenticated:', isAuthenticated);


    return (
      <AuthContext.Provider value={{ isAuthenticated, login, signUp }}>
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
