import { string, func, bool } from 'prop-types';
import { i18nService as i18next } from '@client/services/i18nService';

const { t } = i18next;

export const editorPropTypes = {
  props: {
    id: string,
    name: string,
    initialValue: string,
    placeholder: string,
    errors: string,
    touched: bool,
    setValues: func.isRequired,
    setTouched: func.isRequired,
  },
  default: {
    id: 'editor',
    name: 'editor',
    initialValue: '',
    placeholder: t('dictionary.editor.PLACEHOLDER'),
    errors: '',
    touched: false,
  },
};
