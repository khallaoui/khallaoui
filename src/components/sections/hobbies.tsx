'use client';

import { Section, SectionTitle, SectionSubtitle } from '@/components/section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { languages, hobbies } from '@/lib/data';
import { useLanguage } from '@/context/language-context';
import messagesEn from '../../../messages/en.json';
import messagesFr from '../../../messages/fr.json';

export default function Hobbies() {
  const { locale } = useLanguage();
  const t = locale === 'en' ? messagesEn.Hobbies : messagesFr.Hobbies;
  const hobbiesData = locale === 'en' ? messagesEn.Hobbies.hobbies : messagesFr.Hobbies.hobbies;
  const languagesData = locale === 'en' ? messagesEn.Hobbies.languages : messagesFr.Hobbies.languages;

  return (
    <Section id="hobbies">
      <SectionTitle>{t.title}</SectionTitle>
      <SectionSubtitle>
        {t.subtitle}
      </SectionSubtitle>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <Card className="slanted-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{t.languagesTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {languages.map((lang, index) => (
                <li key={index} className="flex items-center justify-between gap-4">
                  <div className='flex items-center gap-4'>
                    <div className="rounded-md bg-accent/10 p-2 text-accent">
                      <lang.icon className="h-6 w-6" />
                    </div>
                    <span className="font-medium">{languagesData[index].name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{languagesData[index].level}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="slanted-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{t.hobbiesTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {hobbies.map((hobby, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="rounded-md bg-accent/10 p-2 text-accent">
                    <hobby.icon className="h-6 w-6" />
                  </div>
                  <span className="font-medium">{hobbiesData[index]}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
