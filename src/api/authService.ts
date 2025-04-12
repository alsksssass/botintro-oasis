
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/lib/types';

// Default user data for fallback
const defaultUser: User = {
  id: '1',
  discordId: '123456789012345678',
  displayName: 'Demo User',
  avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
  role: 'visitor'
};

export const authService = {
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting current session:', error);
        console.log('Using default user for development');
        return defaultUser;
      }
      
      if (!session) {
        console.log('No active session');
        return null;
      }
      
      // Get user profile from users table
      const { data, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        console.log('Using default user for development');
        return defaultUser;
      }
      
      if (!data) {
        console.log('User profile not found');
        return null;
      }
      
      return {
        id: data.id,
        discordId: data.discord_id,
        displayName: data.display_name,
        avatar: data.avatar,
        role: data.role as 'admin' | 'regular' | 'visitor'
      };
    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      return defaultUser;
    }
  },
  
  getUserProfile: async (userId: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error(`Error fetching user profile for ${userId}:`, error);
        return defaultUser;
      }
      
      if (!data) {
        return null;
      }
      
      return {
        id: data.id,
        discordId: data.discord_id,
        displayName: data.display_name,
        avatar: data.avatar,
        role: data.role as 'admin' | 'regular' | 'visitor'
      };
    } catch (error) {
      console.error(`Error in getUserProfile:`, error);
      return defaultUser;
    }
  }
};
