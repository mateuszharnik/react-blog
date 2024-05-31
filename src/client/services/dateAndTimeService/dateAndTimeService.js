import moment from 'moment';
import { checkLanguage, getLanguage } from '@client/utils/languageUtils';
import { valuesConstants } from '@shared/constants';

const { LANG } = valuesConstants;

class DateAndTimeService {
  constructor() {
    this.client = moment;

    this.#init();
  }

  #init = () => {
    const language = getLanguage();

    this.#setLanguage(language);
  };

  #setLanguage = (language = LANG.PL) => {
    const lang = checkLanguage(language);

    this.client.locale(lang);
  };
}

const { client } = new DateAndTimeService();

export const dateAndTimeService = client;
