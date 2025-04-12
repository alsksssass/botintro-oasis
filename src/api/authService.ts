
import { User } from '@/lib/types';
import { apiClient } from '@/lib/api';

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
      return await apiClient.get<User>('/auth/me');
    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      return defaultUser; 
    }
  },
  
  getUserProfile: async (userId: string): Promise<User | null> => {
    try {
      return await apiClient.get<User>(`/users/${userId}`);
    } catch (error) {
      console.error(`Error in getUserProfile:`, error);
      return defaultUser;
    }
  },
  
  login: async (code: string): Promise<User | null> => {
    try {
      return await apiClient.post<User>('/auth/login', { code });
    } catch (error) {
      console.error('Error in login:', error);
      return null;
    }
  },
  
  logout: async (): Promise<void> => {
    try {
      await apiClient.post<void>('/auth/logout', {});
    } catch (error) {
      console.error('Error in logout:', error);
    }
  },
  
  getUserGuilds: async (): Promise<any[]> => {
    try {
      return await apiClient.get<any[]>('/auth/guilds');
    } catch (error) {
      console.error('Error in getUserGuilds:', error);
      return [];
    }
  }
};
