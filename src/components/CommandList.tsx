
import React, { useState } from 'react';
import { Command } from '@/lib/types';
import { Search, ChevronDown, MessageSquareCode } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import ReactMarkdown from 'react-markdown';

interface CommandListProps {
  commands: Command[];
}

const CommandList: React.FC<CommandListProps> = ({ commands }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  
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
  
  const handleCommandClick = (command: Command) => {
    setSelectedCommand(command);
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
                  <Card key={command.id} className="card-hover overflow-hidden cursor-pointer" onClick={() => handleCommandClick(command)}>
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
                      {command.content && (
                        <div className="flex items-center text-xs text-muted-foreground mt-3">
                          <MessageSquareCode className="h-3.5 w-3.5 mr-1" />
                          <span>Click to view detailed documentation</span>
                          <ChevronDown className="h-3.5 w-3.5 ml-1" />
                        </div>
                      )}
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
      
      {/* Command details dialog */}
      <Dialog open={!!selectedCommand} onOpenChange={(open) => !open && setSelectedCommand(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedCommand && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">/{selectedCommand.name}</DialogTitle>
                <DialogDescription className="text-base">{selectedCommand.description}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Usage:</h3>
                  <code className="p-3 rounded bg-secondary text-sm block overflow-x-auto">
                    {selectedCommand.usage}
                  </code>
                </div>
                
                {selectedCommand.requiredPermissions.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Required Permissions:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCommand.requiredPermissions.map(perm => (
                        <span key={perm} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedCommand.content && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-3">Detailed Documentation:</h3>
                    <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-p:text-muted-foreground prose-a:text-primary">
                      <ReactMarkdown>
                        {selectedCommand.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommandList;
