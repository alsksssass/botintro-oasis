
import React from 'react';
import Hero from '@/components/Hero';
import { motion } from 'framer-motion';
import { Bot, Code, Gamepad, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';

const Index: React.FC = () => {
  const features = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: 'Intuitive Commands',
      description: 'Easy to use slash commands for all your server management needs.',
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Advanced Moderation',
      description: 'Protect your server with powerful moderation tools and auto-moderation features.',
    },
    {
      icon: <Gamepad className="h-8 w-8 text-primary" />,
      title: 'Game Integration',
      description: 'Connect your favorite games to your Discord server with rich integrations.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'User Management',
      description: 'Easily manage roles, permissions, and user experiences in your server.',
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Features</h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="p-6 rounded-lg glass card-hover"
                variants={item}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-300/5 rounded-full filter blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto glass rounded-xl p-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Ready to enhance your Discord server?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Add our bot to your server today and discover the full suite of features that will take your community to the next level.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                Add to Discord
              </Button>
              <Link to="/commands" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  View Commands
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
