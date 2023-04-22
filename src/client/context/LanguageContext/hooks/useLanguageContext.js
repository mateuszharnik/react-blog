import { useContext } from 'react';
import { Context } from '../LanguageContext';

export const useLanguageContext = () => {
  const {
    language,
    languages,
    setLanguage,
  } = useContext(Context);

  return {
    language,
    languages,
    setLanguage,
  };
};
