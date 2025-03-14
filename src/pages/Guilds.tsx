
import React from 'react';
import PageTransition from '@/components/PageTransition';
import { useAuth } from '@/hooks/useAuth';
import { Guild } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Server, Settings, Users, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Guilds: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Mock data - this would be fetched from Discord API through Supabase
  const mockGuilds: Guild[] = [
    {
      id: '12345678901234567',
      name: 'Gaming Community',
      icon: 'https://cdn.discordapp.com/embed/avatars/0.png',
      ownerId: user?.id || '',
      memberCount: 324,
      features: ['COMMUNITY', 'NEWS']
    },
    {
      id: '23456789012345678',
      name: 'Movie Enthusiasts',
      icon: 'https://cdn.discordapp.com/embed/avatars/1.png',
      ownerId: user?.id || '',
      memberCount: 156,
      features: ['COMMUNITY']
    },
    {
      id: '34567890123456789',
      name: 'Tech Support',
      icon: 'https://cdn.discordapp.com/embed/avatars/2.png',
      ownerId: user?.id || '',
      memberCount: 789,
      features: ['COMMUNITY', 'DEVELOPER_SUPPORT']
    },
  ];
  
  const filteredGuilds = mockGuilds.filter(guild => 
    guild.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Discord Servers</h1>
          <p className="text-muted-foreground">
            Manage and configure your Discord servers with custom message formats and settings.
          </p>
        </div>
        
        <div className="max-w-3xl mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search servers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuilds.map(guild => (
            <Card key={guild.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                    {guild.icon ? (
                      <img 
                        src={guild.icon} 
                        alt={guild.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Server className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{guild.name}</CardTitle>
                    <CardDescription>{guild.memberCount} members</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {guild.features.map(feature => (
                    <span 
                      key={feature} 
                      className="px-2 py-0.5 bg-secondary text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-2">
                <Link to={`/dashboard/guilds/${guild.id}/message-format`} className="w-full">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Format
                  </Button>
                </Link>
                
                <Link to={`/dashboard/guilds/${guild.id}/members`} className="w-full">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Members
                  </Button>
                </Link>
                
                <Link to={`/dashboard/guilds/${guild.id}/settings`} className="w-full">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Guilds;
