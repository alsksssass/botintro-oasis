
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/database.types';

// Get environment variables for Supabase connection
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase URL or Anon Key is missing. Make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables."
  );
}

// Create Supabase client with types
export const supabase = createClient<Database>(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Helper functions for commands
export const commandsService = {
  getCommands: async () => {
    const { data, error } = await supabase
      .from('commands')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching commands:', error);
      throw error;
    }
    
    return data;
  },
  
  getCommandById: async (id: string) => {
    const { data, error } = await supabase
      .from('commands')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching command with id ${id}:`, error);
      throw error;
    }
    
    return data;
  }
};

// Helper functions for themes
export const themesService = {
  getThemes: async () => {
    const { data, error } = await supabase
      .from('themes')
      .select('*')
      .order('title');
    
    if (error) {
      console.error('Error fetching themes:', error);
      throw error;
    }
    
    return data;
  },
  
  getThemeById: async (id: string) => {
    const { data, error } = await supabase
      .from('themes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching theme with id ${id}:`, error);
      throw error;
    }
    
    return data;
  }
};

// Helper functions for message formats
export const messageFormatsService = {
  getMessageFormats: async (guildId: string) => {
    const { data, error } = await supabase
      .from('message_formats')
      .select('*')
      .eq('guild_id', guildId);
    
    if (error) {
      console.error(`Error fetching message formats for guild ${guildId}:`, error);
      throw error;
    }
    
    return data;
  }
};

// Auth service for user management
export const authService = {
  getCurrentUser: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting current session:', error);
      throw error;
    }
    
    if (!session) {
      return null;
    }
    
    return session.user;
  },
  
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error(`Error fetching user profile for ${userId}:`, error);
      throw error;
    }
    
    return data;
  }
};
