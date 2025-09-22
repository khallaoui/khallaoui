'use client';

import Link from 'next/link';
import { Section, SectionTitle, SectionSubtitle } from '@/components/section';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { education } from '@/lib/data';
import { School } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import messagesEn from '../../../messages/en.json';
import messagesFr from '../../../messages/fr.json';

export default function Education() {
  const { locale } = useLanguage();
  const t = locale === 'en' ? messagesEn.Education : messagesFr.Education;
  const educationItems = t.items;

  return (
    <Section id="education">
      <SectionTitle>{t.title}</SectionTitle>
      <SectionSubtitle>{t.subtitle}</SectionSubtitle>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {education.map((edu, index) => (
          <Link key={index} href={`/education/${edu.slug}`}>
            <div className="group relative h-full">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary to-accent opacity-0 transition duration-500 group-hover:opacity-75 blur"></div>
              <Card className="relative h-full slanted-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                <CardHeader>
                    <div className='flex items-center gap-4'>
                      <div className="rounded-lg bg-primary/10 p-3 text-primary">
                          <School className="h-8 w-8" />
                      </div>
                      <div>
                          <CardTitle className="text-xl">{educationItems[index].degree}</CardTitle>
                          <CardDescription className="text-md">{edu.institution}</CardDescription>
                          <p className="mt-1 text-sm text-muted-foreground">{edu.duration}</p>
                      </div>
                    </div>
                </CardHeader>
              </Card>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
