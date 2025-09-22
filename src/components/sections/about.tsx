'use client';

import Image from 'next/image';
import { Section, SectionTitle, SectionSubtitle } from '@/components/section';
import { Card, CardContent } from '@/components/ui/card';
import { personalData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-context';
import messagesEn from '../../../messages/en.json';
import messagesFr from '../../../messages/fr.json';

export default function About() {
  const { locale } = useLanguage();
  const t = locale === 'en' ? messagesEn.About : messagesFr.About;
  const tPersonal = locale === 'en' ? messagesEn.personalData : messagesFr.personalData;
  const profilePhoto = PlaceHolderImages.find(p => p.id === personalData.photo);

  return (
    <Section id="about">
      <SectionTitle>{t.title}</SectionTitle>
      <SectionSubtitle>
        {t.subtitle}
      </SectionSubtitle>
      
      <div className="mt-12 grid grid-cols-1 items-center gap-12 md:grid-cols-3">
        <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80">
          {profilePhoto && (
            <Image
              src={profilePhoto.imageUrl}
              alt={personalData.name}
              width={320}
              height={320}
              className="slanted-edge-rev rounded-lg object-cover shadow-lg"
              data-ai-hint={profilePhoto.imageHint}
            />
          )}
          <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-lg bg-gradient-to-br from-primary to-accent"></div>
        </div>
        <div className="md:col-span-2">
            <Card className="slanted-card bg-card/80 p-6 backdrop-blur-sm">
                <CardContent className="text-lg text-foreground/90">
                    <p>{tPersonal.about}</p>
                    <p className="mt-4">
                        {t.paragraph}
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </Section>
  );
}
