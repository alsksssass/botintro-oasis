
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";

// Layouts
import MainLayout from "@/layout/MainLayout";
import DashboardLayout from "@/layout/DashboardLayout";

// Main Pages
import Index from "@/pages/Index";
import Commands from "@/pages/Commands";
import Themes from "@/pages/Themes";
import ThemeDetail from "@/pages/ThemeDetail";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

// Dashboard Pages
import Dashboard from "@/pages/Dashboard";
import Guilds from "@/pages/Guilds";
import MessageFormat from "@/pages/MessageFormat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Main Layout Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/commands" element={<Commands />} />
                <Route path="/themes" element={<Themes />} />
                <Route path="/themes/:id" element={<ThemeDetail />} />
                <Route path="/login" element={<Login />} />
              </Route>

              {/* Dashboard Layout Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="commands" element={<Commands />} />
                <Route path="themes" element={<Themes />} />
                <Route path="guilds" element={<Guilds />} />
                <Route path="guilds/:guildId/message-format" element={<MessageFormat />} />
                {/* Add more dashboard routes here when needed */}
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
