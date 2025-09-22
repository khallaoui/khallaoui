'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Section, SectionTitle, SectionSubtitle } from '@/components/section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { experiences } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Briefcase } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import messagesEn from '../../../messages/en.json';
import messagesFr from '../../../messages/fr.json';

export default function Experience() {
  const { locale } = useLanguage();
  const t = locale === 'en' ? messagesEn.Experience : messagesFr.Experience;
  const experienceItems = t.items;

  return (
    <Section id="experience" className="bg-secondary">
      <SectionTitle>{t.title}</SectionTitle>
      <SectionSubtitle>
        {t.subtitle}
      </SectionSubtitle>
      <div className="relative mt-12">
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
        {experiences.map((exp, index) => {
          const logo = PlaceHolderImages.find(p => p.id === exp.logo);
          const isRight = index % 2 !== 0;
          const translatedExp = experienceItems[index];

          return (
            <div key={exp.company} className={`relative mb-12 flex w-full items-center ${isRight ? 'justify-start' : 'justify-end'}`}>
              <div className={`w-1/2 ${isRight ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
                <Link href={`/experience/${exp.slug}`}>
                  <Card className="slanted-card group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    {logo && (
                      <Image
                        src={logo.imageUrl}
                        alt={`${exp.company} logo`}
                        width={50}
                        height={50}
                        className="absolute -right-2 -top-2 z-10 rounded-bl-lg bg-background p-1 opacity-50 transition-opacity duration-300 group-hover:opacity-100"
                        data-ai-hint={logo.imageHint}
                      />
                    )}
                    <CardHeader>
                      <CardTitle className={`text-xl font-bold ${isRight ? '' : 'md:text-right'}`}>{translatedExp.role}</CardTitle>
                      <CardDescription className={isRight ? '' : 'md:text-right'}>
                        {exp.company} &bull; {exp.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">{translatedExp.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
              <div className="absolute left-1/2 z-10 -translate-x-1/2 transform rounded-full bg-primary p-2 text-primary-foreground shadow-lg">
                <Briefcase className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
