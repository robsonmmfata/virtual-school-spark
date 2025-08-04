import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import ptTranslations from './locales/pt.json';
import esTranslations from './locales/es.json';
import enTranslations from './locales/en.json';

const resources = {
  pt: {
    translation: ptTranslations
  },
  es: {
    translation: esTranslations
  },
  en: {
    translation: enTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    debug: false,
    
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;