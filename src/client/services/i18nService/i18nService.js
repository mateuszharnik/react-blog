import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { pl } from '@client/locales';
import { checkLanguage, getLanguage } from '@client/utils/languageUtils';
import { valuesConstants } from '@shared/constants';

const { LANG } = valuesConstants;

class I18nService {
  #client = null;

  constructor(client) {
    this.#client = client;
  }

  init() {
    const language = getLanguage();

    this.#client
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        lng: checkLanguage(language),
        fallbackLng: LANG.PL,
        resources: {
          pl,
        },
      });

    return this.#client;
  }
}

export const i18nService = new I18nService(i18next).init();
