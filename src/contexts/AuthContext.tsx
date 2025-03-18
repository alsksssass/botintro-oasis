import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
  hasRole: () => false,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true);
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: userProfile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (userProfile) {
            setUser({
              id: userProfile.id,
              discordId: userProfile.discord_id,
              displayName: userProfile.display_name,
              avatar: userProfile.avatar,
              role: userProfile.role as UserRole,
            });
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            const { data: userProfile } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (userProfile) {
              setUser({
                id: userProfile.id,
                discordId: userProfile.discord_id,
                displayName: userProfile.display_name,
                avatar: userProfile.avatar,
                role: userProfile.role as UserRole,
              });
            }
          } catch (error) {
            console.error('Error getting user profile:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async () => {
    try {
      const mockUser: User = {
        id: crypto.randomUUID(),
        discordId: '123456789012345678',
        displayName: 'Demo User',
        avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
        role: 'admin',
      };
      
      const { error } = await supabase
        .from('users')
        .insert({
          id: mockUser.id,
          discord_id: mockUser.discordId,
          display_name: mockUser.displayName,
          avatar: mockUser.avatar,
          role: mockUser.role,
        });
        
      if (error) {
        throw error;
      }
      
      setUser(mockUser);
      toast({
        title: "Login successful",
        description: "You are now signed in with Discord",
      });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been signed out successfully",
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const hasRole = (role: UserRole) => {
    if (!user) return false;
    
    if (user.role === 'admin') return true;
    
    if (user.role === 'regular' && role === 'regular') return true;
    
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
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
