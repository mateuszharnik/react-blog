import colors from 'colors/safe';
import createResponseWithError from '@server/helpers/createResponseWithError';
import sanitize from '@server/helpers/purify';
import FAQ from '../model';
import { validateFAQ } from '../schema';

export const createFAQ = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    req.body.title = sanitize(req.body.title);
    req.body.contents = sanitize(req.body.contents);

    const { validationError, data } = validateFAQ(req.body);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const faq = await FAQ.findOne({ title: req.body.title, deleted_at: null });

    if (faq) {
      return responseWithError(409, 'Pytanie o takim tytule już istnieje.');
    }

    const createdFAQ = await FAQ.create({
      ...data,
      user: req.user.id,
      is_published: false,
    });

    if (!createdFAQ) {
      return responseWithError(409, 'Nie udało się utworzyć pytania.');
    }

    return res.status(201).json(createdFAQ);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export default createFAQ;
