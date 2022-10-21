import colors from 'colors/safe';
import logger from '@server/logger';
import createResponseWithError from '@server/helpers/createResponseWithError';
import mapValidationMessages from '@server/helpers/validation/mapValidationMessages';
import validateId from '@server/helpers/validation/validateId';
import validateIds from '@server/helpers/validation/validateIds';
import sanitize from '@server/helpers/purify';
import FAQ from '../model';
import validateFAQ from '../schema';

export const getFAQs = async (req, res, next) => {
  const { asAdmin = false } = req.query;
  const responseWithError = createResponseWithError(res, next);
  const select = {};

  if (!asAdmin) {
    select.user = asAdmin;
  }

  try {
    const faqs = await FAQ.find({ deleted_at: null })
      .populate({ path: 'user', select: 'display_name username' })
      .select(select)
      .sort({ created_at: -1 });

    return res.status(200).json(faqs);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const getFAQ = async (req, res, next) => {
  const { asAdmin = false } = req.query;
  const { id } = req.params;
  const responseWithError = createResponseWithError(res, next);
  const select = {};

  if (!asAdmin) {
    select.user = asAdmin;
  }

  try {
    const { validationError } = validateId(id);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const faq = await FAQ.findOne({ _id: id, deleted_at: null })
      .populate({ path: 'user', select: 'display_name username' })
      .select(select);

    if (!faq) {
      return responseWithError(404, 'Nie znaleziono pytania.');
    }

    return res.status(200).json(faq);
  } catch (error) {
    logger.error(colors.red(error));
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
      return responseWithError(409, mapValidationMessages(validationError));
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
    logger.error(colors.red(error));
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
      return responseWithError(409, mapValidationMessages(validationError));
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
    logger.error(colors.red(error));
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
      return responseWithError(404, 'Pytanie nie istnieje.');
    }

    const updatedFAQ = await FAQ.findOneAndUpdate({
      _id: id, deleted_at: null,
    }, { is_published: !faq.is_published }, { new: true });

    if (!updatedFAQ) {
      return responseWithError(409, 'Nie udało się zaktualizować pytania.');
    }

    return res.status(200).json(updatedFAQ);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const deleteFAQs = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const query = { deleted_at: null };

    if (req.body?.length) {
      const { validationError, data } = validateIds(req.body);

      if (validationError) {
        return responseWithError(409, mapValidationMessages(validationError));
      }

      query._id = { $in: data };
    }

    const faqs = await FAQ.find(query);

    if (!faqs?.length) {
      return responseWithError(404, 'Nie znaleziono pytań.');
    }

    const ids = faqs.map(({ _id }) => _id.toString());

    const updatedFAQs = await FAQ.softDeleteMany(
      { _id: { $in: ids }, deleted_at: null },
      { new: true },
    );

    if (!updatedFAQs) {
      return responseWithError(409, 'Nie udało się usunąć pytań.');
    }

    const deletedFAQs = await FAQ.find({ _id: { $in: ids }, deleted_at: { $ne: null } });

    if (!deletedFAQs?.length) {
      return responseWithError(404, 'Nie znaleziono pytań.');
    }

    return res.status(200).json(deletedFAQs);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const deleteFAQ = async (req, res, next) => {
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

    const deletedFAQ = await FAQ.findOneAndSoftDelete(
      { _id: id, deleted_at: null },
      { new: true },
    );

    if (!deletedFAQ) {
      return responseWithError(409, 'Nie udało się usunąć pytania.');
    }

    return res.status(200).json(deletedFAQ);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};
