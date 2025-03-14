import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  hasRole: () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user for development (this would be replaced with Supabase auth)
  useEffect(() => {
    // Simulating auth load
    setTimeout(() => {
      // Check localStorage for saved user
      const savedUser = localStorage.getItem('auth_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = () => {
    // This would be replaced with Discord OAuth flow through Supabase
    // For now, just simulate a successful login with mock data
    const mockUser: User = {
      id: '1',
      discordId: '123456789012345678',
      displayName: 'Demo User',
      avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
      role: 'admin',
    };
    
    setUser(mockUser);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const hasRole = (role: UserRole) => {
    if (!user) return false;
    
    // Admin has access to everything
    if (user.role === 'admin') return true;
    
    // Regular users can access regular features
    if (user.role === 'regular' && role === 'regular') return true;
    
    // Otherwise user doesn't have the required role
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
