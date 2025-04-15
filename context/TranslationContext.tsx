import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from '../hooks/useTranslation';

// Define the context type
interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => Promise<void>;
  t: (key: string) => string;
}

// Create the context with default values
const TranslationContext = createContext<TranslationContextType>({
  language: 'en',
  setLanguage: async () => {},
  t: (key) => key,
});

// Provider component
export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const translationHook = useTranslation();
  
  return (
    <TranslationContext.Provider value={translationHook}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use the translation context
export const useAppTranslation = () => useContext(TranslationContext); 