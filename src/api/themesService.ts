
import { Theme } from '@/lib/types';
import { apiClient } from '@/lib/api';

// Default themes data for fallback
const defaultThemes: Theme[] = [
  {
    id: '1',
    title: 'Cyberpunk Adventure',
    thumbnail: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
    description: 'A futuristic setting in a high-tech, dystopian world where megacorporations rule and hackers are the new rebels.',
    recommendations: 245,
    content: '<h2>Cyberpunk Adventure</h2><p>This theme explores a dystopian future where advanced technology coexists with societal breakdown.</p><h3>Game Recommendations</h3><ul><li>Cyberpunk 2077</li><li>Deus Ex series</li><li>Shadowrun Returns</li></ul>',
    tags: ['sci-fi', 'dystopian', 'future'],
    createdBy: 'system',
    updatedBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Medieval Fantasy',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3384&q=80',
    description: 'Classic fantasy settings with knights, wizards, dragons and epic quests in a world of magic and mystery.',
    recommendations: 189,
    content: '<h2>Medieval Fantasy</h2><p>Explore a world of magic, mythical creatures, and epic quests.</p><h3>Game Recommendations</h3><ul><li>The Witcher 3</li><li>Dragon Age series</li><li>Skyrim</li></ul>',
    tags: ['fantasy', 'medieval', 'magic'],
    createdBy: 'system',
    updatedBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Space Exploration',
    thumbnail: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
    description: 'Journey through the cosmos, discover alien worlds, and build interstellar civilizations in the vastness of space.',
    recommendations: 156,
    content: '<h2>Space Exploration</h2><p>Venture into the unknown reaches of space, encountering new civilizations and cosmic wonders.</p><h3>Game Recommendations</h3><ul><li>Mass Effect series</li><li>No Man\'s Sky</li><li>Stellaris</li></ul>',
    tags: ['space', 'sci-fi', 'exploration'],
    createdBy: 'system',
    updatedBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const themesService = {
  getThemes: async (): Promise<Theme[]> => {
    try {
      return await apiClient.get<Theme[]>('/themes');
    } catch (error) {
      console.error('Error in getThemes:', error);
      return defaultThemes;
    }
  },
  
  getThemeById: async (id: string): Promise<Theme | null> => {
    try {
      return await apiClient.get<Theme>(`/themes/${id}`);
    } catch (error) {
      console.error(`Error in getThemeById:`, error);
      const defaultTheme = defaultThemes.find(theme => theme.id === id);
      return defaultTheme || null;
    }
  },
  
  createTheme: async (data: Omit<Theme, 'id' | 'createdBy' | 'updatedBy' | 'createdAt' | 'updatedAt'>): Promise<Theme> => {
    try {
      return await apiClient.post<Theme>('/themes', data);
    } catch (error) {
      console.error(`Error in createTheme:`, error);
      throw error;
    }
  },
  
  updateTheme: async (id: string, data: Partial<Theme>): Promise<Theme> => {
    try {
      return await apiClient.put<Theme>(`/themes/${id}`, data);
    } catch (error) {
      console.error(`Error in updateTheme:`, error);
      throw error;
    }
  },
  
  deleteTheme: async (id: string): Promise<void> => {
    try {
      await apiClient.delete<void>(`/themes/${id}`);
    } catch (error) {
      console.error(`Error in deleteTheme:`, error);
      throw error;
    }
  }
};
