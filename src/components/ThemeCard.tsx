
import React from 'react';
import { Link } from 'react-router-dom';
import { Theme } from '@/lib/types';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThemeCardProps {
  theme: Theme;
  index: number;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link 
        to={`/themes/${theme.id}`}
        className="block group overflow-hidden"
      >
        <div className="relative aspect-video overflow-hidden rounded-lg mb-3">
          <img 
            src={theme.thumbnail} 
            alt={theme.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div 
            className={cn(
              "absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1",
              "rounded-full bg-white/90 text-foreground text-xs font-medium"
            )}
          >
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>{theme.recommendations}</span>
          </div>
        </div>
        
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
          {theme.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {theme.description}
        </p>
      </Link>
    </motion.div>
  );
};

export default ThemeCard;
