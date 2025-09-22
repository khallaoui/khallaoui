'use client';

import { Section, SectionTitle, SectionSubtitle } from '@/components/section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { skills, skillIcons } from '@/lib/data';
import { useLanguage } from '@/context/language-context';
import messagesEn from '../../../messages/en.json';
import messagesFr from '../../../messages/fr.json';

export default function Skills() {
  const { locale } = useLanguage();
  const t = locale === 'en' ? messagesEn.Skills : messagesFr.Skills;
  const skillCategories = t.categories;

  return (
    <Section id="skills">
      <SectionTitle>{t.title}</SectionTitle>
      <SectionSubtitle>
        {t.subtitle}
      </SectionSubtitle>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card key={index} className="slanted-card-rev flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl">{skillCategories[index].title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {category.skillNames.map((skillName, skillIndex) => {
                    const SkillIcon = skillIcons[skillName];
                    return (
                      <li key={skillIndex} className="flex items-center gap-4">
                        <div className="rounded-md bg-primary/10 p-2 text-primary">
                          {SkillIcon && <SkillIcon className="h-6 w-6" />}
                        </div>
                        <span className="font-medium">{skillName}</span>
                      </li>
                    )
                  })}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
