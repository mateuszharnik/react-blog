import colors from 'colors/safe';
import logger from '@server/logger';
import validateFAQ from '@server/api/v1/faqs/schema';
import FAQ from '@server/api/v1/faqs/model';
import sanitize from '@server/helpers/purify';

export const seedFAQs = async (faq = {}) => {
  try {
    const { validationError, data } = validateFAQ(faq, { allowUnknown: true });

    if (validationError) {
      logger.error(colors.red(validationError.details[0].message));
    }

    data.title = sanitize(data.title);
    data.contents = sanitize(data.contents);

    const newFAQ = await FAQ.create(data);

    logger.debug(colors.green('DB seeded with frequently asked question.'));

    return JSON.parse(JSON.stringify(newFAQ.toJSON()));
  } catch (error) {
    logger.error(colors.red(error));
  }
};

export const removeFAQs = async () => {
  try {
    await FAQ.deleteMany({});
    logger.debug(colors.green('Frequently asked questions removed from DB.'));
  } catch (error) {
    logger.error(colors.red(error));
  }
};
