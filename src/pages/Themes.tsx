
import React, { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import ThemeCard from '@/components/ThemeCard';
import { Theme } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Search, Hash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Themes: React.FC = () => {
  // Mock data - this would be fetched from Supabase in production
  const mockThemes: Theme[] = [
    {
      id: '1',
      title: 'Cyberpunk 2077',
      thumbnail: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1974&auto=format&fit=crop',
      description: 'An open-world, action-adventure story set in the megalopolis of Night City.',
      recommendations: 238,
      content: 'Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival.',
      tags: ['rpg', 'sci-fi', 'open-world', 'cyberpunk'],
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'The Witcher 3: Wild Hunt',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
      description: 'A story-driven, open world RPG set in a visually stunning fantasy universe.',
      recommendations: 456,
      content: 'The Witcher 3: Wild Hunt is a story-driven, next-generation open world role-playing game set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.',
      tags: ['rpg', 'fantasy', 'open-world', 'action'],
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Red Dead Redemption 2',
      thumbnail: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=2017&auto=format&fit=crop',
      description: "An epic tale of life in America's unforgiving heartland.",
      recommendations: 389,
      content: 'America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive.',
      tags: ['action', 'adventure', 'western', 'open-world'],
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'God of War',
      thumbnail: 'https://images.unsplash.com/photo-1616757857818-5a4b33f3a9a1?q=80&w=1780&auto=format&fit=crop',
      description: 'A new beginning for Kratos as he mentors his son Atreus in the unfamiliar Norse lands.',
      recommendations: 279,
      content: "From Santa Monica Studio and creative director Cory Barlog comes a new beginning for one of gaming's most recognizable icons. Living as a man outside the shadow of the gods, Kratos must adapt to unfamiliar lands, unexpected threats, and a second chance at being a father.",
      tags: ['action', 'adventure', 'mythology', 'story-driven'],
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'The Legend of Zelda: Breath of the Wild',
      thumbnail: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=2026&auto=format&fit=crop',
      description: 'Step into a world of discovery, exploration, and adventure.',
      recommendations: 412,
      content: 'Forget everything you know about The Legend of Zelda games. Step into a world of discovery, exploration, and adventure in The Legend of Zelda: Breath of the Wild, a boundary-breaking new game in the acclaimed series.',
      tags: ['adventure', 'open-world', 'nintendo', 'puzzle'],
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '6',
      title: 'Elden Ring',
      thumbnail: 'https://images.unsplash.com/photo-1577741314755-048d8525d31e?q=80&w=1780&auto=format&fit=crop',
      description: 'An action RPG written by George R. R. Martin and directed by Hidetaka Miyazaki.',
      recommendations: 367,
      content: 'Elden Ring is an action RPG which takes place in the Lands Between, sometime after the Shattering of the titular Elden Ring. It is ruled over by demigods who have each claimed shards of the Ring, known as Great Runes, which corrupt them with power.',
      tags: ['rpg', 'soulslike', 'open-world', 'fantasy'],
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Get all unique tags across all themes
  const allTags = Array.from(
    new Set(mockThemes.flatMap(theme => theme.tags || []))
  ).sort();
  
  // Filter themes based on search query and selected tag
  const filteredThemes = mockThemes.filter(theme => {
    const matchesSearch = 
      theme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      theme.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag ? theme.tags?.includes(selectedTag) : true;
    
    return matchesSearch && matchesTag;
  });

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Game Themes</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover and explore curated game recommendations with detailed introductions and reviews.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search game themes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Tag filters */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Badge 
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => handleTagClick(tag)}
              >
                <Hash className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {filteredThemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredThemes.map((theme, index) => (
                <ThemeCard key={theme.id} theme={theme} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No themes found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Themes;
