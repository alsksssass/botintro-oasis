
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
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
  hasRole: () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing session on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Get user profile from database
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
    
    // Check for initial session
    checkUser();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            // Get user profile
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
    
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // For development, we'll keep a mock login function
  // In production this would use Supabase's Discord OAuth
  const login = async () => {
    try {
      // This would be replaced with Discord OAuth through Supabase
      // For now, just simulate a successful login with mock data
      
      // Create a test user in the users table
      const mockUser: User = {
        id: crypto.randomUUID(),
        discordId: '123456789012345678',
        displayName: 'Demo User',
        avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
        role: 'admin',
      };
      
      // Insert the mock user into the users table
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
      // In production this would call Supabase's signOut method
      // await supabase.auth.signOut();
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
