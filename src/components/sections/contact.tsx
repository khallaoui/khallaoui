'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

import { Section, SectionTitle, SectionSubtitle } from '@/components/section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  suggestRelevantProjects,
  SuggestRelevantProjectsOutput,
} from '@/ai/flows/suggest-relevant-projects';
import { personalData } from '@/lib/data';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/context/language-context';
import messagesEn from '../../../messages/en.json';
import messagesFr from '../../../messages/fr.json';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  interests: z.string().min(5, 'Please describe your interests.'),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const { locale } = useLanguage();
  const t = locale === 'en' ? messagesEn.Contact : messagesFr.Contact;
  const tPersonal = locale === 'en' ? messagesEn.personalData : messagesFr.personalData;
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<SuggestRelevantProjectsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      interests: '',
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await suggestRelevantProjects({ areasOfInterest: values.interests });
      setSuggestions(result);
      toast({
        title: 'Suggestions Generated!',
        description: 'Check out the projects tailored to your interests.',
      });
    } catch (error) {
      console.error('Failed to get suggestions:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem generating suggestions. Please try again.',
      });
    }
    setIsLoading(false);
  };

  const contactInfo = [
    { icon: Mail, text: tPersonal.contact.email, href: `mailto:${tPersonal.contact.email}` },
    { icon: Phone, text: tPersonal.contact.phone, href: `tel:${tPersonal.contact.phone}` },
    { icon: MapPin, text: tPersonal.contact.address },
  ];

  return (
    <Section id="contact" className="bg-gradient-to-br from-background to-secondary">
      <SectionTitle>{t.title}</SectionTitle>
      <SectionSubtitle>
        {t.subtitle}
      </SectionSubtitle>
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="space-y-8">
            <h3 className="font-headline text-2xl font-semibold">{t.contactInfo}</h3>
            {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4">
                    <div className="rounded-md bg-primary/10 p-3 text-primary">
                        <info.icon className="h-6 w-6" />
                    </div>
                    {info.href ? (
                        <a href={info.href} className="font-medium hover:underline">{info.text}</a>
                    ) : (
                        <span className="font-medium">{info.text}</span>
                    )}
                </div>
            ))}
        </div>
        <div className="lg:col-span-2">
          <Card className="slanted-card p-2">
            <CardContent className="p-6">
              <h3 className="mb-4 font-headline text-2xl font-semibold">
                {t.formTitle}
              </h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.nameLabel}</FormLabel>
                          <FormControl>
                            <Input placeholder={t.namePlaceholder} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.emailLabel}</FormLabel>
                          <FormControl>
                            <Input placeholder={t.emailPlaceholder} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.interestsLabel}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t.interestsPlaceholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    {t.submitButton}
                  </Button>
                </form>
              </Form>

              {suggestions && (
                <Alert className="mt-8 slanted-edge-rev">
                  <Sparkles className="h-4 w-4" />
                  <AlertTitle className="font-headline">{t.suggestionsTitle}</AlertTitle>
                  <AlertDescription className="mt-2 space-y-2">
                    <div>
                      <h4 className="font-semibold">{t.relevantProjects}</h4>
                      <p>{suggestions.relevantProjects}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">{t.relevantExperience}</h4>
                      <p>{suggestions.relevantExperience}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
