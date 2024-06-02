import axios from 'axios';
import { checkLanguage, getLanguage } from '@client/utils/languageUtils';
import { apiConstants, valuesConstants } from '@shared/constants';

import { PrivateAboutAPIService } from './private/privateAboutAPIService';
import { PrivateMessagesAPIService } from './private/privateMessagesAPIService';
import { PrivateContactAPIService } from './private/privateContactAPIService';
import { PrivateConfigAPIService } from './private/privateConfigAPIService';
import { PrivateAuthAPIService } from './private/privateAuthAPIService';

import { PublicAboutAPIService } from './public/publicAboutAPIService';
import { PublicMessagesAPIService } from './public/publicMessagesAPIService';
import { PublicContactAPIService } from './public/publicContactAPIService';
import { PublicConfigAPIService } from './public/publicConfigAPIService';
import { PublicAuthAPIService } from './public/publicAuthAPIService';
import { PublicDocsAPIService } from './public/publicDocsAPIService';
import { PublicCsrfAPIService } from './public/publicCsrfAPIService';

const { LANG } = valuesConstants;

class ApiService {
  constructor() {
    this.client = axios;

    this.#init();

    this.privateAbout = new PrivateAboutAPIService(apiConstants.ABOUT.ROOT);
    this.privateMessages = new PrivateMessagesAPIService(apiConstants.MESSAGES.ROOT);
    this.privateContact = new PrivateContactAPIService(apiConstants.CONTACT.ROOT);
    this.privateConfig = new PrivateConfigAPIService(apiConstants.CONFIG.ROOT);
    this.privateAuth = new PrivateAuthAPIService(apiConstants.AUTH.ROOT);

    this.publicAbout = new PublicAboutAPIService(apiConstants.ABOUT.ROOT);
    this.publicMessages = new PublicMessagesAPIService(apiConstants.MESSAGES.ROOT);
    this.publicContact = new PublicContactAPIService(apiConstants.CONTACT.ROOT);
    this.publicConfig = new PublicConfigAPIService(apiConstants.CONFIG.ROOT);
    this.publicAuth = new PublicAuthAPIService(apiConstants.AUTH.ROOT);
    this.publicDocs = new PublicDocsAPIService(apiConstants.DOCS.ROOT);
    this.publicCsrf = new PublicCsrfAPIService(apiConstants.CSRF_TOKEN.ROOT);
  }

  setStore = (store) => {
    this.privateAbout.setStore(store);
    this.privateMessages.setStore(store);
    this.privateContact.setStore(store);
    this.privateConfig.setStore(store);
    this.privateAuth.setStore(store);

    this.publicAbout.setStore(store);
    this.publicMessages.setStore(store);
    this.publicContact.setStore(store);
    this.publicConfig.setStore(store);
    this.publicAuth.setStore(store);
    this.publicDocs.setStore(store);
    this.publicCsrf.setStore(store);
  };

  #init = () => {
    const language = getLanguage();

    this.setLanguageHeader(language);
  };

  setLanguageHeader = (language = LANG.PL) => {
    const lang = checkLanguage(language);

    this.client.defaults.headers.common['Accept-Language'] = lang;
  };
}

const {
  client,
  setStore,
  setLanguageHeader,
  ...rest
} = new ApiService();

export const apiService = {
  ...client,
  ...rest,
  setStore,
  setLanguageHeader,
};
