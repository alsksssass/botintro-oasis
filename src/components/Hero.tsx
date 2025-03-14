
import React from 'react';
import { ArrowDown, Bot, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-blue-300/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="inline-block glass rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <span className="bg-primary h-2 w-2 rounded-full inline-block mr-2"></span>
          Your Discord Bot's Next Evolution
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Elevate Your Discord Server Experience
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
          A powerful, intuitive Discord bot designed to enhance community engagement,
          automate moderation, and provide unique entertainment features.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button size="lg" className="group">
            Add to Discord
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Link to="/commands">
            <Button variant="outline" size="lg">
              View Commands
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-pulse-subtle"
        onClick={scrollToFeatures}
      >
        <ArrowDown className="h-6 w-6 text-primary" />
      </div>
    </div>
  );
};

export default Hero;
