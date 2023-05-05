import { object, string } from 'yup';
import { i18nService as i18next } from '@client/services/i18nService';
import { formsConstants } from '@shared/constants';

const { SIGN_IN: { USERNAME } } = formsConstants;

const { t } = i18next;

const PATH = 'messages.signIn';

export const signInSchema = object({
  username: string()
    .trim()
    .matches(USERNAME.REGEXP, t(`${PATH}.username.NOT_MATCH`))
    .required(t(`${PATH}.username.REQUIRED`)),
  password: string()
    .trim()
    .required(t(`${PATH}.password.REQUIRED`)),
});
