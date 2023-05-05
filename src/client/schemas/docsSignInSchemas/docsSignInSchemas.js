import { object, string } from 'yup';
import { i18nService as i18next } from '@client/services/i18nService';

const { t } = i18next;

const PATH = 'messages.docsSignIn';

export const docsSignInSchema = object({
  password: string()
    .trim()
    .required(t(`${PATH}.password.REQUIRED`)),
});
