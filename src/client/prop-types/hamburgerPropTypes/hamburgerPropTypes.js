import { string, bool, func } from 'prop-types';
import { i18nService as i18next } from '@client/services/i18nService';

const { t } = i18next;

export const hamburgerPropTypes = {
  props: {
    title: string.isRequired,
    onClick: func.isRequired,
    isExpanded: bool.isRequired,
    text: string,
    attr: bool,
    className: string,
    onBlur: func,
  },
  default: {
    text: t('navigation.menu.MENU'),
    attr: false,
    className: '',
    onBlur: undefined,
  },
};
