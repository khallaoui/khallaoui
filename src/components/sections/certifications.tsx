'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Section, SectionTitle, SectionSubtitle } from '@/components/section';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { certifications } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-context';
import messagesEn from '../../../messages/en.json';
import messagesFr from '../../../messages/fr.json';

export default function Certifications() {
  const { locale } = useLanguage();
  const t = locale === 'en' ? messagesEn.Certifications : messagesFr.Certifications;
  const certificationItems = t.items;

  return (
    <Section id="certifications" className="bg-secondary">
      <SectionTitle>{t.title}</SectionTitle>
      <SectionSubtitle>
        {t.subtitle}
      </SectionSubtitle>
      <div className="mt-12">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {certifications.map((cert, index) => {
              const image = PlaceHolderImages.find(p => p.id === cert.imageUrl);
              const translatedCert = certificationItems[index];
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <Link href={cert.url || '#'} target="_blank" rel="noopener noreferrer">
                      <Card className="slanted-card group overflow-hidden">
                        <CardContent className="flex aspect-[4/3] flex-col items-center justify-center p-6">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={translatedCert.title}
                              width={400}
                              height={300}
                              className="mb-4 rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
                              data-ai-hint={image.imageHint}
                            />
                          )}
                          <h3 className="text-center font-headline text-lg font-semibold">{translatedCert.title}</h3>
                          <p className="text-center text-sm text-muted-foreground">{translatedCert.issuer}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </Section>
  );
}
