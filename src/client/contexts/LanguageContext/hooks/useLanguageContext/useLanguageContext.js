import { useSafeContext } from '@client/hooks/useSafeContext';
import { Context as LanguageContext } from '../../LanguageContext';

export const useLanguageContext = () => {
  const {
    language,
    languages,
    setLanguage,
  } = useSafeContext({ context: LanguageContext });

  return {
    language,
    languages,
    setLanguage,
  };
};
