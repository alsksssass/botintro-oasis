import { MessageFormat } from '@/lib/types';
import { apiClient } from '@/lib/api';

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
      // Replace with actual API call
      // const data = await apiClient.get<MessageFormat[]>(`/guilds/${guildId}/message-formats`);
      // return data;
      
      console.log(`Using default message formats data for guild ${guildId} until Spring API is connected`);
      return defaultMessageFormats;
    } catch (error) {
      console.error(`Error in getMessageFormats:`, error);
      return defaultMessageFormats;
    }
  }
};
