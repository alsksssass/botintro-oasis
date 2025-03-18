
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import { LoaderCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Login: React.FC = () => {
  const { isAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Get the intended destination or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';
  
  // Check for Discord auth code
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleDiscordCallback(code);
    }
  }, [searchParams]);
  
  // Handle Discord OAuth callback
  const handleDiscordCallback = async (code: string) => {
    setIsLoggingIn(true);
    
    try {
      // Call our Discord auth edge function
      const { data, error } = await supabase.functions.invoke('discord-auth', {
        body: { code }
      });
      
      if (error) {
        throw new Error(error.message || 'Authentication failed');
      }

      if (!data || !data.session) {
        throw new Error('No session returned from authentication');
      }

      // Fetch user profile
      const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (userProfile) {
        // Set user in auth context
        setUser({
          id: userProfile.id,
          discordId: userProfile.discord_id,
          displayName: userProfile.display_name,
          avatar: userProfile.avatar,
          role: userProfile.role as 'admin' | 'regular' | 'visitor'
        });
        
        toast({
          title: "Login successful",
          description: "You are now signed in with Discord",
        });
        
        // Redirect to intended destination
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  // Redirect to Discord OAuth
  const handleLogin = () => {
    setIsLoggingIn(true);
    
    // Discord OAuth URL
    const discordUrl = 'https://discord.com/oauth2/authorize?client_id=1069990761778659458&response_type=code&redirect_uri=https%3A%2F%2Fpilpxdimraerkypqaska.supabase.co%2Ffunctions%2Fv1%2Fdiscord-auth&scope=identify+guilds';
    
    // Redirect to Discord
    window.location.href = discordUrl;
  };

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md glass p-8 rounded-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Sign in with Discord</h1>
            <p className="text-muted-foreground mt-2">
              Connect your Discord account to access the dashboard
            </p>
          </div>
          
          <div className="space-y-4">
            <Button 
              className="w-full flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752c4]"
              disabled={isLoggingIn}
              onClick={handleLogin}
            >
              {isLoggingIn ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 127.14 96.36"
                    className="h-5 w-5"
                    fill="currentColor"
                  >
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                  </svg>
                  <span>Continue with Discord</span>
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
