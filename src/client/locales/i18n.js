import { memo, useEffect } from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pl from './pl';

const I18n = memo(({ children }) => {
  useEffect(() => {
    i18n.use(initReactI18next).init({
      lng: 'pl',
      fallbackLng: 'pl',
      resources: {
        pl,
      },
    });
  }, []);

  return children;
});

I18n.displayName = 'I18n';

I18n.propTypes = {
  children: oneOfType([arrayOf(node), node]),
};

I18n.defaultProps = {
  children: null,
};

export default I18n;
