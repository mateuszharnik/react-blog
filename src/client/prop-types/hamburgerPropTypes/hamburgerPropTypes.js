import { func, string, bool } from 'prop-types';
import { i18nService as i18next } from '@client/services/i18nService';

const { t } = i18next;

export const hamburgerPropTypes = {
  title: string.isRequired,
  onClick: func.isRequired,
  isExpanded: bool.isRequired,
  text: string,
  onBlur: func,
  hamburgerClassName: string,
  attr: bool,
};

export const hamburgerDefaultProps = {
  onBlur: () => { },
  text: t('navigation.menu.MENU'),
  hamburgerClassName: '',
  attr: false,
};
