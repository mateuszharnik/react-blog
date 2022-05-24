// eslint-disable no-console
import colors from 'colors/safe';
import config from '@server/config';
import validateFAQ from '@server/api/v1/faqs/schema';
import FAQ from '@server/api/v1/faqs/model';

const { NODE_ENV } = config;

const seedFAQs = async (faqs = []) => {
  const createdFAQs = [];

  faqs.forEach((faq) => {
    const { validationError, data } = validateFAQ(faq, { allowUnknown: true });

    if (validationError) {
      console.log(colors.red(validationError.details[0].message));
      process.exit(0);
    }

    createdFAQs.push(data);
  });

  try {
    if (createdFAQs.length) {
      const newFAQs = await FAQ.create(createdFAQs);

      if (NODE_ENV !== 'test') console.log(colors.green('DB seeded with frequently asked questions.'));

      return newFAQs;
    }
  } catch (error) {
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default seedFAQs;
