
import { Command } from '@/lib/types';
import { apiClient } from '@/lib/api';

// Default commands data for fallback
const defaultCommands: Command[] = [
  {
    id: '1',
    name: 'help',
    description: 'Shows a list of available commands',
    usage: '/help [command]',
    category: 'General',
    requiredPermissions: [],
    content: 'The help command displays information about available commands. Use `/help [command]` to get detailed information about a specific command.',
    createdBy: 'system',
    updatedBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'ping',
    description: 'Checks the bot\'s response time',
    usage: '/ping',
    category: 'General',
    requiredPermissions: [],
    createdBy: 'system',
    updatedBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'ban',
    description: 'Bans a user from the server',
    usage: '/ban @user [reason]',
    category: 'Moderation',
    requiredPermissions: ['BAN_MEMBERS'],
    content: 'The ban command allows moderators to remove users from the server. Banned users cannot rejoin unless unbanned.',
    createdBy: 'system',
    updatedBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const commandsService = {
  getCommands: async (): Promise<Command[]> => {
    try {
      return await apiClient.get<Command[]>('/commands');
    } catch (error) {
      console.error('Error in getCommands:', error);
      return defaultCommands;
    }
  },
  
  getCommandById: async (id: string): Promise<Command | null> => {
    try {
      return await apiClient.get<Command>(`/commands/${id}`);
    } catch (error) {
      console.error(`Error in getCommandById:`, error);
      const defaultCommand = defaultCommands.find(cmd => cmd.id === id);
      return defaultCommand || null;
    }
  },
  
  createCommand: async (data: Omit<Command, 'id' | 'createdBy' | 'updatedBy' | 'createdAt' | 'updatedAt'>): Promise<Command> => {
    try {
      return await apiClient.post<Command>('/commands', data);
    } catch (error) {
      console.error(`Error in createCommand:`, error);
      throw error;
    }
  },
  
  updateCommand: async (id: string, data: Partial<Command>): Promise<Command> => {
    try {
      return await apiClient.put<Command>(`/commands/${id}`, data);
    } catch (error) {
      console.error(`Error in updateCommand:`, error);
      throw error;
    }
  },
  
  deleteCommand: async (id: string): Promise<void> => {
    try {
      await apiClient.delete<void>(`/commands/${id}`);
    } catch (error) {
      console.error(`Error in deleteCommand:`, error);
      throw error;
    }
  }
};
