'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Section, SectionTitle, SectionSubtitle } from '@/components/section';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Github, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import messagesEn from '../../../messages/en.json';
import messagesFr from '../../../messages/fr.json';

export default function Projects() {
  const { locale } = useLanguage();
  const t = locale === 'en' ? messagesEn.Projects : messagesFr.Projects;
  const projectItems = t.items;

  return (
    <Section id="projects" className="bg-secondary">
      <SectionTitle>{t.title}</SectionTitle>
      <SectionSubtitle>{t.subtitle}</SectionSubtitle>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => {
          const image = PlaceHolderImages.find(p => p.id === project.imageUrl);
          const translatedProject = projectItems[index];
          return (
            <Card key={index} className="slanted-card group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-52 w-full overflow-hidden">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={translatedProject.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={image.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {project.githubUrl && (
                    <Link href={project.githubUrl} target="_blank" className="rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground">
                      <Github className="h-5 w-5" />
                    </Link>
                  )}
                  {project.demoUrl && (
                    <Link href={project.demoUrl} target="_blank" className="rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground">
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                  )}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-headline">{translatedProject.title}</h3>
                <p className="mt-2 text-muted-foreground">{translatedProject.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
