import colors from 'colors/safe';
import createResponseWithError from '@server/helpers/createResponseWithError';
import validateId from '@server/helpers/validation/validateId';
import sanitize from '@server/helpers/purify';
import FAQ from '../model';
import validateFAQ from '../schema';

export const getFAQs = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const faqs = await FAQ.find({ deleted_at: null }).sort({ created_at: -1 });

    return res.status(200).json(faqs);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const getFAQ = async (req, res, next) => {
  const { id } = req.params;
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError } = validateId(id);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const faq = await FAQ.findOne({ _id: id, deleted_at: null });

    if (!faq) {
      return responseWithError(404, 'Nie znaleziono pytania.');
    }

    return res.status(200).json(faq);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const createFAQ = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    req.body.title = sanitize(req.body.title);
    req.body.contents = sanitize(req.body.contents);

    const { validationError, data } = validateFAQ(req.body);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const faq = await FAQ.findOne({ title: data.title, deleted_at: null });

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

export const updateFAQ = async (req, res, next) => {
  const { id } = req.params;
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError: validationIdError } = validateId(id);

    if (validationIdError) {
      return responseWithError(409, validationIdError.details[0].message);
    }

    req.body.title = sanitize(req.body.title);
    req.body.contents = sanitize(req.body.contents);

    const { validationError, data } = validateFAQ(req.body);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const faqs = await FAQ.find({
      $or: [
        { _id: id },
        { title: data.title },
      ],
      deleted_at: null,
    });

    const faq = faqs.length ? faqs.reduce((obj, value) => {
      if (value.title === data.title) {
        obj.title = true;
      }

      if (value.id === id) {
        obj.id = true;
      }

      return obj;
    }, {}) : {};

    if (!faq?.id) {
      return responseWithError(404, 'Pytanie nie istnieje.');
    }

    if (faq?.title) {
      return responseWithError(409, 'Pytanie o takim tytule już istnieje.');
    }

    const updatedFAQ = await FAQ.findOneAndUpdate({
      _id: id, deleted_at: null,
    }, { ...data }, { new: true });

    if (!updatedFAQ) {
      return responseWithError(409, 'Nie udało się zaktualizować pytania.');
    }

    return res.status(200).json(updatedFAQ);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const toggleIsPublishedFAQ = async (req, res, next) => {
  const { id } = req.params;
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError: validationIdError } = validateId(id);

    if (validationIdError) {
      return responseWithError(409, validationIdError.details[0].message);
    }

    const faq = await FAQ.findOne({ _id: id, deleted_at: null });

    if (!faq) {
      return responseWithError(409, 'Pytanie nie istnieje.');
    }

    const updatedFAQ = await FAQ.findOneAndUpdate({
      _id: id, deleted_at: null,
    }, { is_published: !faq.is_published }, { new: true });

    if (!updatedFAQ) {
      return responseWithError(409, 'Nie udało się zaktualizować pytania.');
    }

    return res.status(200).json(updatedFAQ);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};
