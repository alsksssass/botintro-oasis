
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Command, Theme, MessageFormat, User } from '@/lib/types';

// Helper functions for commands
export const commandsService = {
  getCommands: async (): Promise<Command[]> => {
    const { data, error } = await supabase
      .from('commands')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching commands:', error);
      throw error;
    }
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      usage: item.usage,
      category: item.category,
      requiredPermissions: item.required_permissions,
      content: item.content || undefined,
      createdBy: item.created_by,
      updatedBy: item.updated_by,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }));
  },
  
  getCommandById: async (id: string): Promise<Command> => {
    const { data, error } = await supabase
      .from('commands')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching command with id ${id}:`, error);
      throw error;
    }
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      usage: data.usage,
      category: data.category,
      requiredPermissions: data.required_permissions,
      content: data.content || undefined,
      createdBy: data.created_by,
      updatedBy: data.updated_by,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }
};

// Helper functions for themes
export const themesService = {
  getThemes: async (): Promise<Theme[]> => {
    const { data, error } = await supabase
      .from('themes')
      .select('*')
      .order('title');
    
    if (error) {
      console.error('Error fetching themes:', error);
      throw error;
    }
    
    return data.map(item => ({
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
      description: item.description,
      recommendations: item.recommendations,
      content: item.content,
      tags: item.tags || undefined,
      createdBy: item.created_by,
      updatedBy: item.updated_by,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }));
  },
  
  getThemeById: async (id: string): Promise<Theme> => {
    const { data, error } = await supabase
      .from('themes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching theme with id ${id}:`, error);
      throw error;
    }
    
    return {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      description: data.description,
      recommendations: data.recommendations,
      content: data.content,
      tags: data.tags || undefined,
      createdBy: data.created_by,
      updatedBy: data.updated_by,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }
};

// Helper functions for message formats
export const messageFormatsService = {
  getMessageFormats: async (guildId: string): Promise<MessageFormat[]> => {
    const { data, error } = await supabase
      .from('message_formats')
      .select('*')
      .eq('guild_id', guildId);
    
    if (error) {
      console.error(`Error fetching message formats for guild ${guildId}:`, error);
      throw error;
    }
    
    return data.map(item => ({
      id: item.id,
      guildId: item.guild_id,
      formatType: item.format_type as 'welcome' | 'goodbye' | 'announcement' | 'custom',
      content: item.content,
      isEnabled: item.is_enabled,
      createdBy: item.created_by,
      updatedBy: item.updated_by,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }));
  }
};

// Auth service for user management
export const authService = {
  getCurrentUser: async (): Promise<User | null> => {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting current session:', error);
      throw error;
    }
    
    if (!session) {
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
      return null;
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
  },
  
  getUserProfile: async (userId: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error(`Error fetching user profile for ${userId}:`, error);
      throw error;
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
  }
};
