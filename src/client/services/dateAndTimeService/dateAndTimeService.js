import moment from 'moment';
import { checkLanguage, getLanguage } from '@client/utils/languageUtils';
import { valuesConstants } from '@shared/constants';

const { LANG } = valuesConstants;

class DateAndTimeService {
  #client = null;

  constructor(client) {
    this.#client = client;
  }

  init() {
    const language = getLanguage();

    this.#setLanguage(language);

    return this.#client;
  }

  #setLanguage(language = LANG.PL) {
    const lang = checkLanguage(language);

    this.#client.locale(lang);
  }
}

export const dateAndTimeService = new DateAndTimeService(moment).init();
