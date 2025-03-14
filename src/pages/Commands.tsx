
import React from 'react';
import CommandList from '@/components/CommandList';
import PageTransition from '@/components/PageTransition';
import { Command } from '@/lib/types';

const Commands: React.FC = () => {
  // Mock data - this would be fetched from Supabase in production
  const mockCommands: Command[] = [
    {
      id: '1',
      name: 'help',
      description: 'Shows the help menu with all available commands',
      usage: '/help [command]',
      category: 'General',
      requiredPermissions: [],
      createdBy: 'system',
      updatedBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'ban',
      description: 'Bans a user from the server',
      usage: '/ban @user [reason]',
      category: 'Moderation',
      requiredPermissions: ['BAN_MEMBERS'],
      createdBy: 'system',
      updatedBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'kick',
      description: 'Kicks a user from the server',
      usage: '/kick @user [reason]',
      category: 'Moderation',
      requiredPermissions: ['KICK_MEMBERS'],
      createdBy: 'system',
      updatedBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'play',
      description: 'Plays a song from YouTube or Spotify',
      usage: '/play [song name or URL]',
      category: 'Music',
      requiredPermissions: [],
      createdBy: 'system',
      updatedBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'skip',
      description: 'Skips the current song',
      usage: '/skip',
      category: 'Music',
      requiredPermissions: [],
      createdBy: 'system',
      updatedBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '7',
      name: 'queue',
      description: 'Shows the current music queue',
      usage: '/queue',
      category: 'Music',
      requiredPermissions: [],
      createdBy: 'system',
      updatedBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '8',
      name: 'game',
      description: 'Shows a game\'s information with details',
      usage: '/game [game name]',
      category: 'Games',
      requiredPermissions: [],
      createdBy: 'system',
      updatedBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

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
          <CommandList commands={mockCommands} />
        </div>
      </div>
    </PageTransition>
  );
};

export default Commands;
