import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { pl } from '@client/locales';
import { checkLanguage, getLanguage } from '@client/utils/languageUtils';
import { valuesConstants } from '@shared/constants';

const { LANG } = valuesConstants;

class I18nService {
  constructor() {
    this.client = i18next;

    this.#init();
  }

  #init = () => {
    const language = getLanguage();

    this.client
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        lng: checkLanguage(language),
        fallbackLng: LANG.PL,
        resources: {
          pl,
        },
      });
  };
}

const { client } = new I18nService();

export const i18nService = client;
