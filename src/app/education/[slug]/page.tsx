'use client';

import { notFound } from 'next/navigation';
import { education } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, School } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import messagesEn from '../../../messages/en.json';
import messagesFr from '../../../messages/fr.json';


function getEducationPageT(degree: string, institution: string, locale: 'en' | 'fr') {
    const t = locale === 'en' ? messagesEn.Education : messagesFr.Education;
    return {
        "pageTitle": t.pageTitle.replace('{degree}', degree).replace('{institution}', institution),
        "pageDescription": t.pageDescription.replace('{degree}', degree).replace('{institution}', institution),
        "backLink": t.backLink
    };
}


export default function EducationPage({ params: {slug} }: { params: { slug: string } }) {
  const { locale } = useLanguage();
  
  const eduIndex = education.findIndex(e => e.slug === slug);
  const edu = education[eduIndex];

  if (!edu) {
    notFound();
  }

  const tEdu = locale === 'en' ? messagesEn.Education.items : messagesFr.Education.items;
  const translatedEdu = tEdu[eduIndex];
  
  const t = getEducationPageT(translatedEdu.degree, edu.institution, locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/#education">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.backLink}
            </Link>
        </Button>

        <Card className="slanted-card shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 rounded-lg bg-primary/10 p-4 text-primary">
                <School className="h-12 w-12" />
            </div>
            <CardTitle className="font-headline text-4xl">{translatedEdu.degree}</CardTitle>
            <CardDescription className="mt-2 text-xl text-muted-foreground">
              {edu.institution}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 text-center">
             <p className="mt-1 text-lg text-muted-foreground">{edu.duration}</p>
             <p className="mt-8 text-lg max-w-prose mx-auto">
                This qualification is a key part of my academic journey, providing me with a strong foundation in my field.
             </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
