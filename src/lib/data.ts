import {
  Github,
  Linkedin,
  Code,
  PenTool,
  Server,
  Database,
  Cpu,
  BookOpen,
  Sparkles,
  Users,
  Volleyball,
  Puzzle,
} from 'lucide-react';

import type {
  SocialLink,
  Experience,
  Education,
  Project,
  SkillCategory,
  Certification,
  Hobby,
  Language,
} from './types';

export const personalData = {
  name: 'MOHAMED KHALLAOUI',
  photo: 'profile-photo',
  cv: '/mohamed-khallaoui-cv.pdf',
  socials: [
    { name: 'GitHub', url: 'https://github.com/khallaoui', icon: Github },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/mohamed-khallaoui', icon: Linkedin },
  ] as SocialLink[],
  contact: {
    email: 'med.khallaoui4@gmail.com',
    phone: '+212 624433295',
  },
};

export const experiences: Omit<Experience, 'role' | 'description'>[] = [
  {
    company: 'AtlionTech',
    duration: 'May 2024 – Jan 2025',
    logo: 'exp-logo-1',
    slug: 'sap-technical-consultant-atliontech',
  },
  {
    company: 'Le Premier Système',
    duration: 'Apr – Jun 2023',
    logo: 'exp-logo-2',
    slug: 'full-stack-developer-le-premier-systeme',
  },
  {
    company: 'Public Library, Khenifra',
    duration: 'May – Jun 2022',
    logo: 'exp-logo-3',
    slug: 'software-developer-public-library',
  },
];

export const education: Omit<Education, 'degree'>[] = [
    {
        institution: 'Ibn Tofail University',
        duration: '2024 – Present',
        slug: 'masters-ibn-tofail-university',
    },
    {
        institution: 'EST Kenitra',
        duration: '2022 – 2023',
        slug: 'bachelors-est-kenitra',
    },
    {
        institution: 'Moulay Ismail Technical HS',
        duration: '2020 – 2022',
        slug: 'diploma-moulay-ismail-technical-hs',
    },
    {
        institution: 'Khenifra',
        duration: '2020',
        slug: 'baccalaureate-khenifra',
    },
];

export const projects: Omit<Project, 'title' | 'description'>[] = [
  {
    tags: ['Next.js', 'GenAI', 'TypeScript', 'Tailwind CSS'],
    imageUrl: 'project-1',
    githubUrl: 'https://github.com/khallaoui',
    demoUrl: '#contact',
  },
  {
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    imageUrl: 'project-2',
    githubUrl: 'https://github.com/khallaoui',
    demoUrl: '#',
  },
  {
    tags: ['React Native', 'Firebase', 'GraphQL'],
    imageUrl: 'project-3',
    githubUrl: 'https://github.com/khallaoui',
  },
  {
    tags: ['Vue.js', 'Python', 'D3.js'],
    imageUrl: 'project-4',
    githubUrl: 'https://github.com/khallaoui',
    demoUrl: '#',
  },
];

export const skills: Omit<SkillCategory, 'title' | 'skills'>[] = [
  {
    icon: Code,
    skillNames: ['ABAP', 'Java', 'JavaScript', 'Python'],
  },
  {
    icon: Sparkles,
    skillNames: ['Spring Boot', 'Node.js', 'React / Next.js', 'RESTful APIs', 'AI/ML & AI Prompts'],
  },
  {
    icon: Server,
    skillNames: ['SAP S/4HANA', 'SAP BTP', 'RAP & CAP', 'SAPUI5 & SAP Fiori', 'OData Services', 'CDS-Views'],
  },
   {
    icon: Database,
    skillNames: ['SAP HANA', 'SQL & SQLScript', 'Oracle & PL/SQL'],
  },
   {
    icon: Users,
    skillNames: ['Git & GitHub', 'Jira', 'SAP BAS & Eclipse', 'Scrum & Agile'],
  },
];

export const skillIcons: { [key: string]: LucideIcon } = {
  'ABAP': Code,
  'Java': Code,
  'JavaScript': Code,
  'Python': Code,
  'Spring Boot': Code,
  'Node.js': Server,
  'React / Next.js': Code,
  'RESTful APIs': Code,
  'AI/ML & AI Prompts': Sparkles,
  'SAP S/4HANA': Server,
  'SAP BTP': Cpu,
  'RAP & CAP': Code,
  'SAPUI5 & SAP Fiori': PenTool,
  'OData Services': Code,
  'CDS-Views': Database,
  'SAP HANA': Database,
  'SQL & SQLScript': Database,
  'Oracle & PL/SQL': Database,
  'Git & GitHub': Github,
  'Jira': Code,
  'SAP BAS & Eclipse': Code,
  'Scrum & Agile': Users,
};

export const certifications: Omit<Certification, 'title'| 'issuer'>[] = [
  {
    imageUrl: 'cert-1',
    url: '#',
  },
  {
    imageUrl: 'cert-2',
    url: '#',
  },
  {
    imageUrl: 'cert-3',
    url: '#',
  },
  {
    imageUrl: 'project-4',
    url: '#',
  }
];

export const hobbies: Hobby[] = [
  { name: 'Volleyball', icon: Volleyball },
  { name: 'Chess', icon: Puzzle },
  { name: 'Research & Discovery', icon: BookOpen },
];

export const languages = [
  { name: 'English', icon: Code },
  { name: 'French', icon: Code },
  { name: 'Arabic', icon: Code },
  { name: 'Tamazight', icon: Code },
];


export const sectionLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];
