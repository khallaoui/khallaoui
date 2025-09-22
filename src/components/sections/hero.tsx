'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { personalData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Download } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import messagesEn from '../../../messages/en.json';
import messagesFr from '../../../messages/fr.json';

export default function Hero() {
  const { locale } = useLanguage();
  const t = locale === 'en' ? messagesEn.Hero : messagesFr.Hero;
  const tPersonal = locale === 'en' ? messagesEn.personalData : messagesFr.personalData;
  const profilePhoto = PlaceHolderImages.find(p => p.id === personalData.photo);

  return (
    <section id="home" className="relative min-h-[80vh] overflow-hidden bg-gradient-to-tr from-background to-secondary">
      <div className="container mx-auto grid min-h-[80vh] grid-cols-1 items-center md:grid-cols-2">
        <div className="relative z-10 animate-in fade-in slide-in-from-left-10 duration-700">
          <h1 className="font-headline text-5xl font-bold md:text-7xl">
            <span className="text-glow">{tPersonal.name}</span>
          </h1>
          <h2 className="mt-2 text-2xl font-medium text-primary md:text-3xl">
            {tPersonal.headline}
          </h2>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            {t.welcome}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="group">
              <a href="#contact">
                {t.getInTouch}
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={personalData.cv} download>
                <Download className="mr-2 h-5 w-5" />
                {t.downloadCv}
              </a>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-4">
            {personalData.socials.map((social) => (
              <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                <social.icon className="h-8 w-8 text-muted-foreground transition-colors hover:text-primary" />
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="relative hidden h-full items-center justify-center md:flex">
          {profilePhoto && (
            <div className="relative h-[400px] w-[400px] animate-in fade-in slide-in-from-right-10 duration-700 lg:h-[500px] lg:w-[500px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-30 blur-3xl"></div>
              <Image
                src={profilePhoto.imageUrl}
                alt={personalData.name}
                width={500}
                height={500}
                priority
                className="slanted-edge z-10 rounded-lg object-cover shadow-2xl"
                data-ai-hint={profilePhoto.imageHint}
              />
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
