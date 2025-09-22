import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import Chatbot from '@/components/chatbot';
import { LanguageProvider } from '@/context/language-context';

export const metadata: Metadata = {
  title: 'KineticFolio',
  description: 'A personal portfolio website created with Next.js and Firebase Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <LanguageProvider>
      <html lang="en" className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased">
              {children}
              <Chatbot />
              <Toaster />
        </body>
      </html>
    </LanguageProvider>
  );
}
