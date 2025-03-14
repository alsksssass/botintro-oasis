
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Heart, ChevronLeft, Share2, Loader } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { themesService } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';

const ThemeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, hasRole } = useAuth();
  const [liked, setLiked] = React.useState(false);
  
  // Fetch theme data
  const { data: theme, isLoading, error } = useQuery({
    queryKey: ['theme', id],
    queryFn: () => id ? themesService.getThemeById(id) : Promise.reject('No ID provided'),
    enabled: !!id,
  });
  
  const canEdit = isAuthenticated && hasRole('admin');
  
  const toggleLike = () => {
    setLiked(prev => !prev);
    // In a real app, this would update the count in Supabase
  };
  
  if (isLoading) {
    return (
      <PageTransition>
        <div className="container mx-auto px-6 py-20">
          <div className="mb-8">
            <Link 
              to="/themes" 
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Themes
            </Link>
          </div>
          
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <Skeleton className="w-full aspect-video rounded-xl" />
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-6 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  if (error || !theme) {
    return (
      <PageTransition>
        <div className="container mx-auto px-6 py-20">
          <div className="mb-8">
            <Link 
              to="/themes" 
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Themes
            </Link>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Theme Not Found</h1>
            <p className="text-muted-foreground">
              The requested theme could not be found or there was an error loading it.
            </p>
            <Button 
              className="mt-8" 
              onClick={() => navigate('/themes')}
            >
              Browse All Themes
            </Button>
          </div>
        </div>
      </PageTransition>
    );
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
                src={theme.thumbnail} 
                alt={theme.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Title and Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-bold">{theme.title}</h1>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline"
                  size="sm"
                  className={`group ${liked ? 'text-red-500' : ''}`}
                  onClick={toggleLike}
                >
                  <Heart className={`h-4 w-4 mr-2 ${liked ? 'fill-red-500' : 'group-hover:fill-red-500/10'}`} />
                  {theme.recommendations + (liked ? 1 : 0)}
                </Button>
                
                <Button variant="outline" size="sm" className="group">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                
                {canEdit && (
                  <Link to={`/dashboard/themes/${theme.id}/edit`}>
                    <Button variant="default" size="sm">
                      Edit Theme
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            
            {/* Description */}
            <p className="text-lg text-muted-foreground">{theme.description}</p>
            
            {/* Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: theme.content }}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ThemeDetail;
