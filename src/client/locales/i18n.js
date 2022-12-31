import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pl from './pl';

i18n.use(initReactI18next).init({
  lng: 'pl',
  fallbackLng: 'pl',
  resources: {
    pl,
  },
});

export default i18n;
