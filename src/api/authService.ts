
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
      // Replace with actual API call
      // const data = await apiClient.get<User>('/auth/me');
      // return data;
      
      console.log('Using default user for development until Spring API is connected');
      return defaultUser;
    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      return defaultUser; 
    }
  },
  
  getUserProfile: async (userId: string): Promise<User | null> => {
    try {
      // Replace with actual API call
      // const data = await apiClient.get<User>(`/users/${userId}`);
      // return data;
      
      console.log(`Using default user profile for ${userId} until Spring API is connected`);
      return defaultUser;
    } catch (error) {
      console.error(`Error in getUserProfile:`, error);
      return defaultUser;
    }
  },
  
  login: async (code: string): Promise<User | null> => {
    try {
      // Replace with actual API call
      // const data = await apiClient.post<User>('/auth/login', { code });
      // return data;
      
      console.log('Using default login flow until Spring API is connected');
      return defaultUser;
    } catch (error) {
      console.error('Error in login:', error);
      return null;
    }
  },
  
  logout: async (): Promise<void> => {
    try {
      // Replace with actual API call
      // await apiClient.post('/auth/logout', {});
      console.log('Logout called (not connected to Spring API yet)');
    } catch (error) {
      console.error('Error in logout:', error);
    }
  }
};
