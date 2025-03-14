
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import { Theme } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Heart, ChevronLeft, Share2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const ThemeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, hasRole } = useAuth();
  const [liked, setLiked] = React.useState(false);
  
  // Mock data - this would be fetched from Supabase in production
  const mockTheme: Theme = {
    id: id || '1',
    title: 'Cyberpunk 2077',
    thumbnail: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1974&auto=format&fit=crop',
    description: 'An open-world, action-adventure story set in the megalopolis of Night City.',
    recommendations: 238,
    content: `
      <p>Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival.</p>
      
      <p>In this game, you'll explore the vast urban sprawl of Night City, a place of dreams that can break you if you're not strong enough. You'll face corporate backstabbers, underground hustlers, and everything in between as you chase after a one-of-a-kind implant that is the key to immortality.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li>Create your own cyberpunk with customizable cyberware, skillset, and playstyle.</li>
        <li>Explore a vast city where your choices shape the story and the world around you.</li>
        <li>Take on dangerous mercenary work and become an urban legend in Night City.</li>
      </ul>
      
      <p>The game features a rich, branching narrative with plenty of action and adventure. Whether you prefer stealth, combat, or social solutions, there's always a way to solve problems in Cyberpunk 2077.</p>
    `,
    createdBy: 'admin',
    updatedBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const canEdit = isAuthenticated && hasRole('admin');
  
  const toggleLike = () => {
    setLiked(prev => !prev);
    // In a real app, this would update the count in Supabase
  };
  
  if (!mockTheme) {
    navigate('/themes');
    return null;
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              to="/themes" 
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Themes
            </Link>
          </div>
          
          <div className="flex flex-col gap-8">
            {/* Hero Image */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              <img 
                src={mockTheme.thumbnail} 
                alt={mockTheme.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Title and Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-bold">{mockTheme.title}</h1>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline"
                  size="sm"
                  className={`group ${liked ? 'text-red-500' : ''}`}
                  onClick={toggleLike}
                >
                  <Heart className={`h-4 w-4 mr-2 ${liked ? 'fill-red-500' : 'group-hover:fill-red-500/10'}`} />
                  {mockTheme.recommendations + (liked ? 1 : 0)}
                </Button>
                
                <Button variant="outline" size="sm" className="group">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                
                {canEdit && (
                  <Link to={`/dashboard/themes/${mockTheme.id}/edit`}>
                    <Button variant="default" size="sm">
                      Edit Theme
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            
            {/* Description */}
            <p className="text-lg text-muted-foreground">{mockTheme.description}</p>
            
            {/* Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: mockTheme.content }}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ThemeDetail;
