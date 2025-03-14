
import React, { useState } from 'react';
import { Command } from '@/lib/types';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface CommandListProps {
  commands: Command[];
}

const CommandList: React.FC<CommandListProps> = ({ commands }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get unique categories from commands
  const categories = ['All', ...new Set(commands.map(cmd => cmd.category))];
  
  // Filter commands based on search query and selected category
  const filteredCommands = (category: string) => {
    return commands.filter(cmd => {
      const matchesSearch = cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           cmd.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === 'All' || cmd.category === category;
      
      return matchesSearch && matchesCategory;
    });
  };

  return (
    <div className="w-full animate-fade-in">
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search commands..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Command tabs by category */}
      <Tabs defaultValue="All">
        <TabsList className="mb-6 flex flex-wrap">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="px-4">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCommands(category).length > 0 ? (
                filteredCommands(category).map((command) => (
                  <Card key={command.id} className="card-hover overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-start">
                        <span className="text-lg">/{command.name}</span>
                        <span className="text-xs font-normal text-muted-foreground px-2 py-1 bg-secondary rounded-full">
                          {command.category}
                        </span>
                      </CardTitle>
                      <CardDescription>{command.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <p className="font-medium text-foreground/80 mb-1">Usage:</p>
                        <code className="p-2 rounded bg-secondary block text-xs overflow-x-auto">
                          {command.usage}
                        </code>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No commands found. Try a different search term.
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CommandList;
