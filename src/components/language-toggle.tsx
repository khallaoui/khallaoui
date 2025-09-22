'use client';

import { useLanguage } from '@/context/language-context';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Globe } from 'lucide-react';
import messagesEn from '../../messages/en.json';
import messagesFr from '../../messages/fr.json';

export const LanguageToggle = () => {
  const { locale, setLocale } = useLanguage();
  const t = locale === 'en' ? messagesEn.Header : messagesFr.Header;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <Globe className="h-5 w-5" />
          <span className="font-medium">{locale === 'en' ? 'EN' : 'FR'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale('en')}>
          <div className="flex items-center gap-2">
            <span className="text-lg">🇬🇧</span>
            <span>{t.english}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale('fr')}>
          <div className="flex items-center gap-2">
            <span className="text-lg">🇫🇷</span>
            <span>{t.french}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
