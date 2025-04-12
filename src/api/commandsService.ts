
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

// Store commands in localStorage for persistence
const initializeCommands = () => {
  const storedCommands = localStorage.getItem('commands');
  if (!storedCommands) {
    localStorage.setItem('commands', JSON.stringify(defaultCommands));
  }
};

// Initialize commands when the module is loaded
initializeCommands();

// Helper to get commands from localStorage
const getStoredCommands = (): Command[] => {
  const storedCommands = localStorage.getItem('commands');
  return storedCommands ? JSON.parse(storedCommands) : defaultCommands;
};

// Helper to update commands in localStorage
const updateStoredCommands = (commands: Command[]) => {
  localStorage.setItem('commands', JSON.stringify(commands));
};

export const commandsService = {
  getCommands: async (): Promise<Command[]> => {
    try {
      // In a real app, this would call the API
      // return await apiClient.get<Command[]>('/commands');
      
      // For demo purposes, get from localStorage
      return getStoredCommands();
    } catch (error) {
      console.error('Error in getCommands:', error);
      return defaultCommands;
    }
  },
  
  getCommandById: async (id: string): Promise<Command | null> => {
    try {
      // In a real app, this would call the API
      // return await apiClient.get<Command>(`/commands/${id}`);
      
      // For demo purposes, get from localStorage
      const commands = getStoredCommands();
      const command = commands.find(c => c.id === id);
      return command || null;
    } catch (error) {
      console.error(`Error in getCommandById:`, error);
      const defaultCommand = defaultCommands.find(cmd => cmd.id === id);
      return defaultCommand || null;
    }
  },
  
  createCommand: async (data: Omit<Command, 'id' | 'createdBy' | 'updatedBy' | 'createdAt' | 'updatedAt'>, userRole: string): Promise<Command> => {
    try {
      // Check if user has admin or super role
      if (userRole !== 'admin' && userRole !== 'super') {
        throw new Error('Insufficient permissions to create commands');
      }
      
      // In a real app, this would call the API
      // return await apiClient.post<Command>('/commands', data);
      
      // For demo purposes, add to localStorage
      const commands = getStoredCommands();
      const newCommand: Command = {
        ...data,
        id: Date.now().toString(),
        createdBy: userRole,
        updatedBy: userRole,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      commands.push(newCommand);
      updateStoredCommands(commands);
      
      return newCommand;
    } catch (error) {
      console.error(`Error in createCommand:`, error);
      throw error;
    }
  },
  
  updateCommand: async (id: string, data: Partial<Command>, userRole: string): Promise<Command> => {
    try {
      // Check if user has admin or super role
      if (userRole !== 'admin' && userRole !== 'super') {
        throw new Error('Insufficient permissions to update commands');
      }
      
      // In a real app, this would call the API
      // return await apiClient.put<Command>(`/commands/${id}`, data);
      
      // For demo purposes, update in localStorage
      const commands = getStoredCommands();
      const commandIndex = commands.findIndex(c => c.id === id);
      
      if (commandIndex === -1) {
        throw new Error('Command not found');
      }
      
      // Update command
      commands[commandIndex] = {
        ...commands[commandIndex],
        ...data,
        updatedBy: userRole,
        updatedAt: new Date().toISOString()
      };
      
      updateStoredCommands(commands);
      
      return commands[commandIndex];
    } catch (error) {
      console.error(`Error in updateCommand:`, error);
      throw error;
    }
  },
  
  deleteCommand: async (id: string, userRole: string): Promise<void> => {
    try {
      // Check if user has admin or super role
      if (userRole !== 'admin' && userRole !== 'super') {
        throw new Error('Insufficient permissions to delete commands');
      }
      
      // In a real app, this would call the API
      // await apiClient.delete<void>(`/commands/${id}`);
      
      // For demo purposes, delete from localStorage
      const commands = getStoredCommands();
      const commandIndex = commands.findIndex(c => c.id === id);
      
      if (commandIndex === -1) {
        throw new Error('Command not found');
      }
      
      // Remove command
      commands.splice(commandIndex, 1);
      updateStoredCommands(commands);
    } catch (error) {
      console.error(`Error in deleteCommand:`, error);
      throw error;
    }
  }
};
