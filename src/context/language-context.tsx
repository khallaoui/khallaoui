'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context data
type LanguageContextType = {
  locale: 'en' | 'fr';
  setLocale: (locale: 'en' | 'fr') => void;
};

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create a provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<'en' | 'fr'>('en');

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
