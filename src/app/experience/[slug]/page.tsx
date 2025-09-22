'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { experiences } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import messagesEn from '../../../../messages/en.json';
import messagesFr from '../../../../messages/fr.json';

export default function ExperiencePage({ params }: { params: { slug: string } }) {
  const { locale } = useLanguage();
  const t = locale === 'en' ? messagesEn.Education : messagesFr.Education;
  const tExp = locale === 'en' ? messagesEn.Experience.items : messagesFr.Experience.items;

  const experienceIndex = experiences.findIndex(exp => exp.slug === params.slug);
  const experience = experiences[experienceIndex];
  const translatedExperience = tExp[experienceIndex];


  if (!experience) {
    notFound();
  }

  const logo = PlaceHolderImages.find(p => p.id === experience.logo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/#experience">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.backLink}
            </Link>
        </Button>

        <Card className="slanted-card-rev shadow-2xl">
          <CardHeader className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            {logo && (
              <Image
                src={logo.imageUrl}
                alt={`${experience.company} logo`}
                width={100}
                height={100}
                className="rounded-lg object-contain"
                data-ai-hint={logo.imageHint}
              />
            )}
            <div className="flex-1">
              <CardTitle className="font-headline text-4xl">{translatedExperience.role}</CardTitle>
              <CardDescription className="mt-2 text-xl text-muted-foreground">
                {experience.company}
              </CardDescription>
              <p className="mt-1 text-sm text-muted-foreground">{experience.duration}</p>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose prose-lg mx-auto max-w-none text-foreground/90 dark:prose-invert">
                <p className='text-lg whitespace-pre-line'>{translatedExperience.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
