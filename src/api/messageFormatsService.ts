
import { supabase } from '@/integrations/supabase/client';
import { MessageFormat } from '@/lib/types';

// Default message formats data for fallback
const defaultMessageFormats: MessageFormat[] = [
  {
    id: '1',
    guildId: '123456789',
    formatType: 'welcome',
    content: 'Welcome to the server, {user}! We hope you enjoy your stay.',
    isEnabled: true,
    createdBy: 'system',
    updatedBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    guildId: '123456789',
    formatType: 'goodbye',
    content: 'Goodbye, {user}! We hope to see you again soon.',
    isEnabled: true,
    createdBy: 'system',
    updatedBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const messageFormatsService = {
  getMessageFormats: async (guildId: string): Promise<MessageFormat[]> => {
    try {
      const { data, error } = await supabase
        .from('message_formats')
        .select('*')
        .eq('guild_id', guildId);
      
      if (error) {
        console.error(`Error fetching message formats for guild ${guildId}:`, error);
        console.log('Returning default message formats data');
        return defaultMessageFormats;
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
    } catch (error) {
      console.error(`Error in getMessageFormats:`, error);
      return defaultMessageFormats;
    }
  }
};
