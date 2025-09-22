'use client';

import Link from 'next/link';
import { personalData } from '@/lib/data';
import { useLanguage } from '@/context/language-context';
import messagesEn from '../../messages/en.json';
import messagesFr from '../../messages/fr.json';

export default function Footer() {
  const { locale } = useLanguage();
  const t = locale === 'en' ? messagesEn.Footer : messagesFr.Footer;
  const tPersonal = locale === 'en' ? messagesEn.personalData : messagesFr.personalData;

  return (
    <footer className="bg-secondary">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          {t.copy.replace('{year}', new Date().getFullYear().toString()).replace('{name}', tPersonal.name)}
        </p>
        <div className="flex items-center gap-4">
          {personalData.socials.map((social) => (
            <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
              <social.icon className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
              <span className="sr-only">{social.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
