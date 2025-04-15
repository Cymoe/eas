import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

// Initialize i18n
const i18n = new I18n();

// Default language
i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.enableFallback = true;

// Translations
i18n.translations = {
  en: {
    // General
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    done: 'Done',
    
    // Auth & Profile
    myProfile: 'My Profile',
    managePreferences: 'Manage your preferences',
    editProfile: 'Edit Profile',
    logOut: 'Log out',
    closeAccount: 'Close my account',
    
    // Settings
    settings: 'Settings',
    general: 'General',
    preferences: 'Preferences',
    darkMode: 'Dark mode',
    notifications: 'Notifications',
    language: 'Language',
    appLanguage: 'App language',
    
    // Features
    superLikes: 'Super Likes',
    boosts: 'Boosts',
    rewinds: 'Rewinds',
    subscription: 'Subscription',
    
    // Matching
    match: 'Match',
    like: 'Like',
    dislike: 'Dislike',
    superLike: 'Super Like',
    
    // Community
    community: 'Community',
    followUs: 'Follow us',
    rateApp: 'Rate this app',
    helpImprove: 'Help us improve',
    
    // Subscription
    subscriptionPlans: 'Subscription plans',
    perMonth: '/month',
    learnMore: 'Learn more',
    
    // Messages
    messages: 'Messages',
    noMessages: 'No messages yet',
    typeMessage: 'Type a message...',
    
    // Errors
    error: 'Error',
    tryAgain: 'Try again',
    
    // Success
    success: 'Success',
    saved: 'Saved',
    
    // Onboarding
    welcome: 'Welcome to BandMate',
    getStarted: 'Get Started',
    next: 'Next',
    skip: 'Skip',
  },
  
  es: {
    // Spanish translations
    back: 'Atrás',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    done: 'Hecho',
    
    myProfile: 'Mi Perfil',
    managePreferences: 'Administrar preferencias',
    editProfile: 'Editar Perfil',
    logOut: 'Cerrar sesión',
    closeAccount: 'Cerrar mi cuenta',
    
    settings: 'Configuración',
    general: 'General',
    preferences: 'Preferencias',
    darkMode: 'Modo oscuro',
    notifications: 'Notificaciones',
    language: 'Idioma',
    appLanguage: 'Idioma de la aplicación',
    
    superLikes: 'Super Me gusta',
    boosts: 'Impulsos',
    rewinds: 'Rebobinar',
    subscription: 'Suscripción',
    
    match: 'Coincidencia',
    like: 'Me gusta',
    dislike: 'No me gusta',
    superLike: 'Super Me gusta',
    
    community: 'Comunidad',
    followUs: 'Síguenos',
    rateApp: 'Califica la app',
    helpImprove: 'Ayúdanos a mejorar',
    
    subscriptionPlans: 'Planes de suscripción',
    perMonth: '/mes',
    learnMore: 'Más información',
    
    messages: 'Mensajes',
    noMessages: 'No hay mensajes aún',
    typeMessage: 'Escribe un mensaje...',
    
    error: 'Error',
    tryAgain: 'Intentar de nuevo',
    
    success: 'Éxito',
    saved: 'Guardado',
    
    welcome: 'Bienvenido a BandMate',
    getStarted: 'Comenzar',
    next: 'Siguiente',
    skip: 'Saltar',
  },
  // Add more languages as needed
};

// Function to get the current locale
export const getCurrentLocale = async () => {
  try {
    const savedLocale = await AsyncStorage.getItem('appLanguage');
    return savedLocale || Localization.locale.split('-')[0];
  } catch (error) {
    console.error('Error getting locale:', error);
    return 'en';
  }
};

// Function to set the locale
export const setLocale = async (locale: string) => {
  try {
    i18n.locale = locale;
    await AsyncStorage.setItem('appLanguage', locale);
  } catch (error) {
    console.error('Error setting locale:', error);
  }
};

// Function to translate text
export const translate = (key: string, params = {}) => {
  return i18n.t(key, params);
};

export default i18n; 