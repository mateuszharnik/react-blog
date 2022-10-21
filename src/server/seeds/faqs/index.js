import colors from 'colors/safe';
import logger from '@server/logger';
import validateFAQ from '@server/api/v1/faqs/schema';
import FAQ from '@server/api/v1/faqs/model';

const seedFAQs = async (faqs = []) => {
  const createdFAQs = [];

  faqs.forEach((faq) => {
    const { validationError, data } = validateFAQ(faq, { allowUnknown: true });

    if (validationError) {
      logger.error(colors.red(validationError.details[0].message));
      process.exit(0);
    }

    createdFAQs.push(data);
  });

  try {
    if (createdFAQs.length) {
      const newFAQs = await FAQ.create(createdFAQs);

      logger.debug(colors.green('DB seeded with frequently asked questions.'));

      return newFAQs;
    }
  } catch (error) {
    logger.error(colors.red(error));
    process.exit(0);
  }
};

export default seedFAQs;
