import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Simple translation dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    'profile.language': 'App Language',
    'profile.selectLanguage': 'Select your preferred language',
    // Add more translations as needed
  },
  es: {
    'profile.language': 'Idioma de la Aplicación',
    'profile.selectLanguage': 'Selecciona tu idioma preferido',
  },
  fr: {
    'profile.language': 'Langue de l\'Application',
    'profile.selectLanguage': 'Sélectionnez votre langue préférée',
  },
  de: {
    'profile.language': 'App-Sprache',
    'profile.selectLanguage': 'Wählen Sie Ihre bevorzugte Sprache',
  },
  it: {
    'profile.language': 'Lingua dell\'App',
    'profile.selectLanguage': 'Seleziona la tua lingua preferita',
  },
  pt: {
    'profile.language': 'Idioma do Aplicativo',
    'profile.selectLanguage': 'Selecione seu idioma preferido',
  },
  ru: {
    'profile.language': 'Язык Приложения',
    'profile.selectLanguage': 'Выберите предпочитаемый язык',
  },
  ja: {
    'profile.language': 'アプリの言語',
    'profile.selectLanguage': '言語を選択してください',
  },
  ko: {
    'profile.language': '앱 언어',
    'profile.selectLanguage': '선호하는 언어를 선택하세요',
  },
  zh: {
    'profile.language': '应用语言',
    'profile.selectLanguage': '选择您的首选语言',
  },
};

export const useTranslation = () => {
  const [language, setLanguageState] = useState<string>('en');

  useEffect(() => {
    // Load saved language preference
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('appLanguage');
        if (savedLanguage) {
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };

    loadLanguage();
  }, []);

  // Function to set language and save to AsyncStorage
  const setLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem('appLanguage', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) {
      return translations.en[key] || key;
    }
    
    return translations[language][key] || translations.en[key] || key;
  };

  return { language, setLanguage, t };
}; 