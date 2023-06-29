import { memo } from 'react';
import { I18nextProvider as I18NextReact } from 'react-i18next';
import { i18nService as i18next } from '@client/services/i18nService';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const I18nextProvider = memo(({ children }) => (
  <I18NextReact i18n={i18next}>
    {children}
  </I18NextReact>
));

I18nextProvider.displayName = 'I18nextProvider';

I18nextProvider.propTypes = {
  children: childrenPropTypes.props,
};

I18nextProvider.defaultProps = {
  children: childrenPropTypes.default,
};

export default I18nextProvider;
