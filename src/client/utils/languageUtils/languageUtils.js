import { polishPlurals } from 'polish-plurals';
import { getUserLocale } from 'get-user-locale';
import { valuesConstants } from '@shared/constants';

const { LANG, LOCAL_STORAGE_LANG_KEY } = valuesConstants;

export const languages = Object.values(LANG);

// eslint-disable-next-line no-unused-vars
export const getCharsTranslation = (language = '') => polishPlurals.bind(
  null,
  'forms.chars.SINGULAR_NOMINATIVE',
  'forms.chars.PLURAL_NOMINATIVE',
  'forms.chars.PLURAL_GENITIVE',
);

export const getLanguage = () => {
  const language = getUserLocale();

  return localStorage.getItem(LOCAL_STORAGE_LANG_KEY) || language.split('-')[0];
};

export const checkLanguage = (language = '') => languages.find((lang) => lang === language) || LANG.PL;
