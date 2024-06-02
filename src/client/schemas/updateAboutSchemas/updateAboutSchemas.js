import { object, string } from 'yup';
import { i18nService as i18next } from '@client/services/i18nService';
import { getCharsTranslation } from '@client/utils/languageUtils';
import { formsConstants } from '@shared/constants';

const { UPDATE_ABOUT: { CONTENTS } } = formsConstants;

const { t, language } = i18next;

const chars = getCharsTranslation(language);

const PATH = 'messages.updateAbout';

export const updateAboutSchema = object({
  contents: string()
    .trim()
    .max(CONTENTS.MAX_LENGTH, t(`${PATH}.contents.MAX_LENGTH`, { count: `${CONTENTS.MAX_LENGTH} ${t(chars(CONTENTS.MAX_LENGTH))}` })),
});
