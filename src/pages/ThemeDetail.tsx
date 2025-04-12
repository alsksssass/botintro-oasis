
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Heart, ChevronLeft, Share2, Edit, Trash } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { themesService } from '@/api/themesService';
import { Skeleton } from '@/components/ui/skeleton';
import ThemePasswordDialog from '@/components/ThemePasswordDialog';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const ThemeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, hasRole } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [liked, setLiked] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [passwordAction, setPasswordAction] = useState<'edit' | 'delete'>('edit');
  
  // Fetch theme data
  const { data: theme, isLoading, error } = useQuery({
    queryKey: ['theme', id],
    queryFn: () => id ? themesService.getThemeById(id) : Promise.reject('No ID provided'),
    enabled: !!id,
  });
  
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (password: string) => {
      if (!id) throw new Error('No ID provided');
      return themesService.deleteTheme(id, password);
    },
    onSuccess: () => {
      toast({
        title: 'Theme deleted',
        description: 'The theme has been successfully deleted.',
      });
      navigate('/themes');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete theme',
        variant: 'destructive',
      });
    }
  });
  
  // Check if user can edit this theme
  const canAdminEdit = hasRole(['admin', 'super']);
  
  const handleEdit = () => {
    if (!theme) return;
    
    // For admin users, no password required
    if (canAdminEdit) {
      navigate(`/dashboard/themes/${theme.id}/edit`);
      return;
    }
    
    // For regular users, password required
    setPasswordAction('edit');
    setIsPasswordDialogOpen(true);
  };
  
  const handleDelete = () => {
    if (!theme) return;
    
    // For admin users, confirm but no password required
    if (canAdminEdit) {
      setIsDeleteDialogOpen(true);
      return;
    }
    
    // For regular users, password required
    setPasswordAction('delete');
    setIsPasswordDialogOpen(true);
  };
  
  const toggleLike = () => {
    setLiked(prev => !prev);
    // In a real app, this would update the count in the database
  };
  
  const handlePasswordSuccess = () => {
    if (passwordAction === 'edit' && theme) {
      navigate(`/dashboard/themes/${theme.id}/edit`);
    } else if (passwordAction === 'delete') {
      setIsDeleteDialogOpen(true);
    }
  };
  
  const confirmDelete = async () => {
    if (!theme || !id) return;
    
    // For admin users, no password needed
    if (canAdminEdit) {
      deleteMutation.mutate('');
    } else {
      // For regular users who already entered password
      deleteMutation.mutate(theme.password || '');
    }
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
                
                {user && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="group"
                      onClick={handleEdit}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="group text-destructive hover:bg-destructive/10"
                      onClick={handleDelete}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </>
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
      
      {/* Password Dialog */}
      <ThemePasswordDialog
        isOpen={isPasswordDialogOpen}
        setIsOpen={setIsPasswordDialogOpen}
        title={passwordAction === 'edit' ? "Edit Theme" : "Delete Theme"}
        description={passwordAction === 'edit' 
          ? "Enter the theme password to edit this content." 
          : "Enter the theme password to delete this content."
        }
        correctPassword={theme.password || ''}
        onSuccess={handlePasswordSuccess}
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              theme and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageTransition>
  );
};

export default ThemeDetail;
