
import React, { useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  LayoutDashboard, 
  Command, 
  Gamepad2, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Hash,
  Server
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from '@/components/ui/sidebar';

const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const location = useLocation();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if user has admin role for admin-only sections
  const canAccessAdminSection = hasRole('admin');

  const navItems = [
    { 
      name: 'Overview', 
      path: '/dashboard', 
      icon: LayoutDashboard, 
      adminOnly: false 
    },
    { 
      name: 'Commands', 
      path: '/dashboard/commands', 
      icon: Command, 
      adminOnly: false 
    },
    { 
      name: 'Themes', 
      path: '/dashboard/themes', 
      icon: Hash, 
      adminOnly: false 
    },
    { 
      name: 'Guilds', 
      path: '/dashboard/guilds', 
      icon: Server, 
      adminOnly: false 
    },
    { 
      name: 'User Management', 
      path: '/dashboard/users', 
      icon: Users, 
      adminOnly: true 
    },
    { 
      name: 'Settings', 
      path: '/dashboard/settings', 
      icon: Settings, 
      adminOnly: false 
    },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Sidebar collapsible="icon" className="border-r">
            <div className="flex h-14 items-center px-4 border-b">
              <Link to="/" className="flex items-center space-x-2">
                <div className="relative w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                  B
                </div>
                <span className="text-lg font-semibold">Dashboard</span>
              </Link>
              <div className="ml-auto">
                <ThemeToggle />
              </div>
            </div>
            
            <SidebarContent>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="px-3 py-2">
                  <div className="mb-6">
                    <div className="px-4 py-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        MAIN NAVIGATION
                      </p>
                    </div>
                    
                    <nav className="grid gap-1">
                      {navItems
                        .filter(item => !item.adminOnly || canAccessAdminSection)
                        .map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`group flex items-center gap-x-3 rounded-md px-3 py-2 transition-colors
                              ${isActive(item.path)
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                              }`}
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="text-sm font-medium">{item.name}</span>
                          </Link>
                      ))}
                    </nav>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="px-4 py-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      USER
                    </p>
                  </div>
                  
                  <div className="px-3 py-2">
                    <div className="flex items-center gap-x-3">
                      <img
                        src={user?.avatar}
                        alt={user?.displayName}
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{user?.displayName}</p>
                        <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={logout}
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-destructive mt-1"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </ScrollArea>
            </SidebarContent>
            
            <div className="mt-auto h-12 border-t flex items-center px-4">
              <SidebarTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-70">
                  <span className="sr-only">Toggle Sidebar</span>
                  <ChevronLeft className="h-4 w-4 sidebar-expanded:hidden" />
                  <ChevronRight className="h-4 w-4 hidden sidebar-expanded:block" />
                </Button>
              </SidebarTrigger>
            </div>
          </Sidebar>
          
          <div className="flex-1 overflow-auto">
            <div className="container px-6 py-8 max-w-6xl">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
