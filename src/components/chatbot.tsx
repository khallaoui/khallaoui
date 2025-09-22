'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Loader2, Send, Sparkles, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { chatWithCv } from '@/ai/flows/chat-with-cv';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useLanguage } from '@/context/language-context';
import messagesEn from '../../messages/en.json';
import messagesFr from '../../messages/fr.json';


type Message = {
  role: 'user' | 'bot';
  text: string;
};

export default function Chatbot() {
  const { locale } = useLanguage();
  const t = locale === 'en' ? messagesEn.Chatbot : messagesFr.Chatbot;
  const tPersonal = locale === 'en' ? messagesEn.personalData : messagesFr.personalData;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'bot',
          text: t.greeting.replace('{name}', tPersonal.name.split(' ')[0]),
        },
      ]);
    }
  }, [isOpen, messages.length, t.greeting, tPersonal.name]);

  useEffect(() => {
    // Scroll to the bottom when a new message is added
    if (scrollAreaRef.current) {
        setTimeout(() => {
             const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
             if(viewport) {
                viewport.scrollTop = viewport.scrollHeight;
             }
        }, 100);
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatWithCv({ question: input, locale });
      const botMessage: Message = { role: 'bot', text: result.answer };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        role: 'bot',
        text: t.errorMessage,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full h-16 w-16 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
          <span className="sr-only">Toggle Chatbot</span>
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm">
          <Card className="slanted-card-rev shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                KineticBot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80 pr-4" ref={scrollAreaRef}>
                <div className="flex flex-col gap-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-start gap-3',
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {msg.role === 'bot' && (
                        <Avatar className="h-8 w-8 border-2 border-primary">
                          <AvatarFallback>
                            <Bot className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          'max-w-[80%] rounded-lg px-4 py-2 text-sm',
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                      >
                        {msg.text}
                      </div>
                       {msg.role === 'user' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            U
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                     <div className='flex items-start gap-3 justify-start'>
                        <Avatar className="h-8 w-8 border-2 border-primary">
                          <AvatarFallback>
                            <Bot className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className='bg-muted rounded-lg px-4 py-2 text-sm'>
                            <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={t.inputPlaceholder}
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
