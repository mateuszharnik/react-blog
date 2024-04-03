import { object, string } from 'yup';
import { i18nService as i18next } from '@client/services/i18nService';
import { getCharsTranslation } from '@client/utils/languageUtils';
import { formsConstants } from '@shared/constants';

const {
  CREATE_MESSAGES: {
    FIRST_NAME, LAST_NAME, EMAIL, SUBJECT, CONTENTS,
  },
} = formsConstants;

const { t, language } = i18next;

const chars = getCharsTranslation(language);

const PATH = 'messages.createMessage';

export const createMessageSchema = object({
  first_name: string()
    .trim()
    .min(FIRST_NAME.MIN_LENGTH, t(`${PATH}.firstName.MIN_LENGTH`, { count: `${FIRST_NAME.MIN_LENGTH} ${t(chars(FIRST_NAME.MIN_LENGTH))}` }))
    .max(FIRST_NAME.MAX_LENGTH, t(`${PATH}.firstName.MAX_LENGTH`, { count: `${FIRST_NAME.MAX_LENGTH} ${t(chars(FIRST_NAME.MAX_LENGTH))}` }))
    .matches(FIRST_NAME.REGEXP, t(`${PATH}.firstName.NOT_MATCH`))
    .required(t(`${PATH}.firstName.REQUIRED`)),
  last_name: string()
    .trim()
    .min(LAST_NAME.MIN_LENGTH, t(`${PATH}.lastName.MIN_LENGTH`, { count: `${LAST_NAME.MIN_LENGTH} ${t(chars(LAST_NAME.MIN_LENGTH))}` }))
    .max(LAST_NAME.MAX_LENGTH, t(`${PATH}.lastName.MAX_LENGTH`, { count: `${LAST_NAME.MAX_LENGTH} ${t(chars(LAST_NAME.MAX_LENGTH))}` }))
    .matches(LAST_NAME.REGEXP, t(`${PATH}.lastName.NOT_MATCH`))
    .required(t(`${PATH}.lastName.REQUIRED`)),
  email: string()
    .trim()
    .matches(EMAIL.REGEXP, t(`${PATH}.email.NOT_MATCH`))
    .required(t(`${PATH}.email.REQUIRED`)),
  subject: string()
    .trim()
    .max(SUBJECT.MAX_LENGTH, t(`${PATH}.subject.MAX_LENGTH`, { count: `${SUBJECT.MAX_LENGTH} ${t(chars(SUBJECT.MAX_LENGTH))}` }))
    .required(t(`${PATH}.subject.REQUIRED`)),
  contents: string()
    .trim()
    .max(CONTENTS.MAX_LENGTH, t(`${PATH}.contents.MAX_LENGTH`, { count: `${CONTENTS.MAX_LENGTH} ${t(chars(CONTENTS.MAX_LENGTH))}` }))
    .required(t(`${PATH}.contents.REQUIRED`)),
});
