
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CommandList from '@/components/CommandList';
import PageTransition from '@/components/PageTransition';
import { commandsService } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const Commands: React.FC = () => {
  const { data: commands, isLoading, error } = useQuery({
    queryKey: ['commands'],
    queryFn: commandsService.getCommands,
  });

  if (isLoading) {
    return (
      <PageTransition>
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Bot Commands</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse all available commands for the bot. You can search for specific commands 
              or filter them by category.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            
            <div className="flex mb-6 space-x-2">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-10 w-24 rounded-md" />
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-20 w-full" />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Error Loading Commands</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              There was a problem loading the commands. Please try again later.
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Bot Commands</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse all available commands for the bot. You can search for specific commands 
            or filter them by category.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <CommandList commands={commands || []} />
        </div>
      </div>
    </PageTransition>
  );
};

export default Commands;
