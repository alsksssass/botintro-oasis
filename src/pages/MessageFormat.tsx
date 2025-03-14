
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Eye, MessageSquare } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';

interface MessageFormatFormValues {
  formatType: 'welcome' | 'goodbye' | 'announcement' | 'custom';
  content: string;
  isEnabled: boolean;
}

const MessageFormat: React.FC = () => {
  const { guildId } = useParams<{ guildId: string }>();
  const navigate = useNavigate();
  const [previewMode, setPreviewMode] = React.useState(false);
  
  // This would be fetched from Supabase in a real implementation
  const initialData = {
    formatType: 'welcome' as const,
    content: '# Welcome to our server, {user}!\n\nWe\'re glad to have you here. Please check out our <#123456789> channel for the rules.\n\n## Useful commands\n- `/help` - List available commands\n- `/role` - Assign yourself a role\n\nEnjoy your stay!',
    isEnabled: true
  };
  
  const form = useForm<MessageFormatFormValues>({
    defaultValues: initialData
  });
  
  const onSubmit = (data: MessageFormatFormValues) => {
    console.log('Saving message format:', data);
    // In a real implementation, this would save to Supabase
    // toast.success('Message format saved successfully!');
  };
  
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate('/dashboard/guilds')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Servers
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Message Format Editor</h1>
          <p className="text-muted-foreground">
            Customize how messages appear in your Discord server.
            Server ID: {guildId}
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1 space-y-6">
                <FormField
                  control={form.control}
                  name="formatType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select message type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="welcome">Welcome</SelectItem>
                          <SelectItem value="goodbye">Goodbye</SelectItem>
                          <SelectItem value="announcement">Announcement</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the type of message you want to customize
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <div className="pt-6">
                  <Label className="mb-2 block">Help</Label>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>You can use Markdown to format your messages.</p>
                    <p>Available variables:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><code>{'{user}'}</code> - Username</li>
                      <li><code>{'{server}'}</code> - Server name</li>
                      <li><code>{'{count}'}</code> - Member count</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <Tabs defaultValue="editor">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="editor">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Editor
                      </TabsTrigger>
                      <TabsTrigger value="preview">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="editor" className="mt-0">
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your message format using Markdown..."
                              className="font-mono min-h-[300px] resize-y"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="preview" className="mt-0">
                    <div className="border rounded-md p-6 min-h-[300px] bg-background">
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown>
                          {form.watch('content')
                            .replace('{user}', 'ExampleUser')
                            .replace('{server}', 'Example Server')
                            .replace('{count}', '145')
                          }
                        </ReactMarkdown>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save Message Format
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageTransition>
  );
};

export default MessageFormat;
