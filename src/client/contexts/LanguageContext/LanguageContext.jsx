import {
  memo, createContext, useMemo, useState, useCallback, useEffect,
} from 'react';
import { useLayerContext } from '@client/contexts/LayerContext';
import { dateAndTimeService } from '@client/services/dateAndTimeService';
import { i18nService } from '@client/services/i18nService';
import { languages, getLanguage, checkLanguage } from '@client/utils/languageUtils';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

export const Context = createContext();

const LanguageContext = memo(({ children }) => {
  const [lang, setLang] = useState(checkLanguage(getLanguage()));

  const { showLayer } = useLayerContext();

  const setLanguage = useCallback(({ language = '', reload = true } = {}) => {
    const trimmedLanguage = checkLanguage(language.trim() || getLanguage());

    if (trimmedLanguage) {
      dateAndTimeService.locale(trimmedLanguage);
      i18nService.changeLanguage(trimmedLanguage);

      document.documentElement.setAttribute('lang', trimmedLanguage);

      document.querySelector('meta[http-equiv="Content-Language"]')?.setAttribute('content', trimmedLanguage);
      document.querySelector('meta[property="og:locale"]')?.setAttribute('content', trimmedLanguage);

      if (reload) {
        showLayer();
        window.location.reload();
      } else {
        setLang(trimmedLanguage);
      }
    }
  }, []);

  useEffect(() => {
    setLanguage({ reload: false });
  }, []);

  const context = useMemo(() => ({
    language: lang,
    languages,
    setLanguage,
  }), [lang, setLanguage]);

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
});

LanguageContext.displayName = 'LanguageContext';

LanguageContext.propTypes = {
  children: childrenPropTypes.props,
};

LanguageContext.defaultProps = {
  children: childrenPropTypes.default,
};

export default LanguageContext;
