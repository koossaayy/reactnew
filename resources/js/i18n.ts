import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../../lang/en.json';
import frTranslations from '../../lang/fr.json';
import esTranslations from '../../lang/es.json';

i18n.use(initReactI18next).init({
  resources: {
    'en': { translation: enTranslations },
    'fr': { translation: frTranslations },
    'es': { translation: esTranslations },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;