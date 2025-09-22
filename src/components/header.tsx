'use client';

import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { personalData } from '@/lib/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { LanguageToggle } from './language-toggle';
import { useLanguage } from '@/context/language-context';
import messagesEn from '../../messages/en.json';
import messagesFr from '../../messages/fr.json';

export default function Header() {
  const { locale } = useLanguage();
  const t = locale === 'en' ? messagesEn.Header : messagesFr.Header;
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const sectionLinks = [
    { name: t.about, href: '#about' },
    { name: t.experience, href: '#experience' },
    { name: t.projects, href: '#projects' },
    { name: t.skills, href: '#skills' },
    { name: t.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'glassmorphism shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between">
        <Link href="/" className="font-headline text-2xl font-bold text-glow">
          {personalData.name.split(' ')[0]}<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.name}
            </a>))}
           <LanguageToggle />
        </nav>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background">
              <nav className="flex h-full flex-col justify-center">
                <ul className="space-y-6 text-center">
                  {sectionLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="font-headline text-2xl font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                   <li>
                    <LanguageToggle />
                  </li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
