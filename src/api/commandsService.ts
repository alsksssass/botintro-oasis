
import { supabase } from '@/integrations/supabase/client';
import { Command } from '@/lib/types';

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
      const { data, error } = await supabase
        .from('commands')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching commands:', error);
        console.log('Returning default commands data');
        return defaultCommands;
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
    } catch (error) {
      console.error('Error in getCommands:', error);
      return defaultCommands;
    }
  },
  
  getCommandById: async (id: string): Promise<Command | null> => {
    try {
      const { data, error } = await supabase
        .from('commands')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching command with id ${id}:`, error);
        // Find default command with matching id
        const defaultCommand = defaultCommands.find(cmd => cmd.id === id);
        return defaultCommand || null;
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
    } catch (error) {
      console.error(`Error in getCommandById:`, error);
      const defaultCommand = defaultCommands.find(cmd => cmd.id === id);
      return defaultCommand || null;
    }
  }
};
