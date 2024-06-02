import {
  object, string, boolean, ref, lazy,
} from 'yup';
import { i18nService as i18next } from '@client/services/i18nService';
import { getCharsTranslation } from '@client/utils/languageUtils';
import { formsConstants, valuesConstants } from '@shared/constants';

const { SIGN_UP: { USERNAME, PASSWORD, EMAIL } } = formsConstants;
const { GENDER: { FEMALE, MALE } } = valuesConstants;

const { t, language } = i18next;

const chars = getCharsTranslation(language);

const PATH = 'messages.signUp';

export const signUpSchema = object({
  username: string()
    .trim()
    .min(USERNAME.MIN_LENGTH, t(`${PATH}.username.MIN_LENGTH`, { count: `${USERNAME.MIN_LENGTH} ${t(chars(USERNAME.MIN_LENGTH))}` }))
    .max(USERNAME.MAX_LENGTH, t(`${PATH}.username.MAX_LENGTH`, { count: `${USERNAME.MAX_LENGTH} ${t(chars(USERNAME.MAX_LENGTH))}` }))
    .matches(USERNAME.REGEXP, t(`${PATH}.username.NOT_MATCH`))
    .required(t(`${PATH}.username.REQUIRED`)),
  email: string()
    .trim()
    .matches(EMAIL.REGEXP, t(`${PATH}.email.NOT_MATCH`))
    .required(t(`${PATH}.email.REQUIRED`)),
  password: string()
    .trim()
    .min(PASSWORD.MIN_LENGTH, t(`${PATH}.password.MIN_LENGTH`, { count: `${PASSWORD.MIN_LENGTH} ${t(chars(PASSWORD.MIN_LENGTH))}` }))
    .max(PASSWORD.MAX_LENGTH, t(`${PATH}.password.MIN_LENGTH`, { count: `${PASSWORD.MAX_LENGTH} ${t(chars(PASSWORD.MAX_LENGTH))}` }))
    .required(t(`${PATH}.password.REQUIRED`)),
  confirm_password: lazy((value) => (value
    ? string()
      .trim()
      .oneOf([ref('password')], t(`${PATH}.confirmPassword.NOT_MATCH`))
    : string()
      .trim()
      .required(t(`${PATH}.confirmPassword.REQUIRED`)))),
  gender: string()
    .oneOf([FEMALE, MALE], t(`${PATH}.gender.CHOSE_BETWEEN`))
    .lowercase()
    .required(t(`${PATH}.gender.REQUIRED`)),
  is_terms_of_use_accepted: boolean()
    .oneOf([true], t(`${PATH}.isTermsOfUseAccepted.REQUIRED`)),
});
