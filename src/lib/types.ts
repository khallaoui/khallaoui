import type { LucideIcon } from 'lucide-react';

export type SocialLink = {
  name: string;
  url: string;
  icon: LucideIcon;
};

export type Experience = {
  company: string;
  role: string;
  duration: string;
  description: string;
  logo: string;
  slug: string;
};

export type Education = {
  institution: string;
  degree: string;
  duration: string;
  slug: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
};

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skillNames: string[];
  skills: {
    name: string;
    icon: LucideIcon;
  }[];
};

export type Certification = {
  title: string;
  issuer: string;
  imageUrl: string;
  url?: string;
};

export type Hobby = {
  name: string;
  icon: LucideIcon;
};

export type Language = {
  name: string;
  level?: string;
  icon: LucideIcon;
};
