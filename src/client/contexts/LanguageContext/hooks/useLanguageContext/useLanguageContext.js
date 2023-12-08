import { useContext } from 'react';
import { Context as LanguageContext } from '../../LanguageContext';

export const useLanguageContext = () => {
  const {
    language,
    languages,
    setLanguage,
  } = useContext(LanguageContext);

  return {
    language,
    languages,
    setLanguage,
  };
};
