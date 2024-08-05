import colors from 'colors/safe';
import logger from '@server/logger';
import validateId from '@server/helpers/validation/validateId';
import validateIds from '@server/helpers/validation/validateIds';
import {
  ApiBodyValidationError,
  ApiParamsValidationError,
  ApiConflictError,
  ApiNotFoundError,
} from '@server/utils/errorUtils';
import sanitize from '@server/helpers/purify';
import { errorsConstants } from '@shared/constants';
import FAQ from '../model';
import validateFAQ from '../schema';

const { FAQ_ERRORS } = errorsConstants;

export const getFAQs = async (req, res, next) => {
  const { asAdmin = false } = req.query;
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
    next(error);
  }
};

export const getFAQ = async (req, res, next) => {
  const { asAdmin = false } = req.query;
  const { id } = req.params;
  const select = {};

  if (!asAdmin) {
    select.user = asAdmin;
  }

  try {
    const { validationError } = validateId(id);

    if (validationError) {
      throw ApiParamsValidationError({ validationError });
    }

    const faq = await FAQ.findOne({ _id: id, deleted_at: null })
      .populate({ path: 'user', select: 'display_name username' })
      .select(select);

    if (!faq) {
      throw ApiNotFoundError({
        key: FAQ_ERRORS.FAQ_NOT_FOUND_ERROR,
        message: 'FAQ not found',
      });
    }

    return res.status(200).json(faq);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const createFAQ = async (req, res, next) => {
  try {
    req.body.title = sanitize(req.body.title);
    req.body.contents = sanitize(req.body.contents);

    const { validationError, data } = validateFAQ(req.body);

    if (validationError) {
      throw ApiBodyValidationError({ validationError });
    }

    const faq = await FAQ.findOne({ title: data.title, deleted_at: null });

    if (faq) {
      throw ApiConflictError({
        key: FAQ_ERRORS.FAQ_ALREADY_EXIST_ERROR,
        message: 'FAQ already exist',
      });
    }

    const createdFAQ = await FAQ.create({
      ...data,
      user: req.user.id,
      is_published: false,
    });

    if (!createdFAQ) {
      throw ApiConflictError({
        key: FAQ_ERRORS.FAQ_NOT_CREATED_ERROR,
        message: 'FAQ not created',
      });
    }

    return res.status(201).json(createdFAQ);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const updateFAQ = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { validationError: validationIdError } = validateId(id);

    if (validationIdError) {
      throw ApiParamsValidationError({ validationError: validationIdError });
    }

    req.body.title = sanitize(req.body.title);
    req.body.contents = sanitize(req.body.contents);

    const { validationError, data } = validateFAQ(req.body);

    if (validationError) {
      throw ApiBodyValidationError({ validationError });
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
      throw ApiNotFoundError({
        key: FAQ_ERRORS.FAQ_NOT_FOUND_ERROR,
        message: 'FAQ not found',
      });
    }

    if (faq?.title) {
      throw ApiConflictError({
        key: FAQ_ERRORS.FAQ_ALREADY_EXIST_ERROR,
        message: 'FAQ already exist',
      });
    }

    const updatedFAQ = await FAQ.findOneAndUpdate({
      _id: id, deleted_at: null,
    }, { ...data }, { new: true });

    if (!updatedFAQ) {
      throw ApiConflictError({
        key: FAQ_ERRORS.FAQ_NOT_UPDATED_ERROR,
        message: 'FAQ not updated',
      });
    }

    return res.status(200).json(updatedFAQ);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const toggleIsPublishedFAQ = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { validationError: validationIdError } = validateId(id);

    if (validationIdError) {
      throw ApiParamsValidationError({ validationError: validationIdError });
    }

    const faq = await FAQ.findOne({ _id: id, deleted_at: null });

    if (!faq) {
      throw ApiNotFoundError({
        key: FAQ_ERRORS.FAQ_NOT_FOUND_ERROR,
        message: 'FAQ not found',
      });
    }

    const updatedFAQ = await FAQ.findOneAndUpdate({
      _id: id, deleted_at: null,
    }, { is_published: !faq.is_published }, { new: true });

    if (!updatedFAQ) {
      throw ApiConflictError({
        key: FAQ_ERRORS.FAQ_NOT_UPDATED_ERROR,
        message: 'FAQ not updated',
      });
    }

    return res.status(200).json(updatedFAQ);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const deleteFAQs = async (req, res, next) => {
  try {
    const query = { deleted_at: null };

    if (req.body?.length) {
      const { validationError, data } = validateIds(req.body);

      if (validationError) {
        throw ApiBodyValidationError({ validationError });
      }

      query._id = { $in: data };
    }

    const faqs = await FAQ.find(query);

    if (!faqs?.length) {
      throw ApiNotFoundError({
        key: FAQ_ERRORS.FAQS_NOT_FOUND_ERROR,
        message: 'FAQs not found',
      });
    }

    const ids = faqs.map(({ _id }) => _id.toString());

    const updatedFAQs = await FAQ.softDeleteMany(
      { _id: { $in: ids }, deleted_at: null },
      { new: true },
    );

    if (!updatedFAQs) {
      throw ApiNotFoundError({
        key: FAQ_ERRORS.FAQS_NOT_DELETED_ERROR,
        message: 'FAQs not deleted',
      });
    }

    const deletedFAQs = await FAQ.find({ _id: { $in: ids }, deleted_at: { $ne: null } });

    if (!deletedFAQs?.length) {
      throw ApiNotFoundError({
        key: FAQ_ERRORS.FAQS_NOT_FOUND_ERROR,
        message: 'FAQs not found',
      });
    }

    return res.status(200).json(deletedFAQs);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const deleteFAQ = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { validationError } = validateId(id);

    if (validationError) {
      throw ApiParamsValidationError({ validationError });
    }

    const faq = await FAQ.findOne({ _id: id, deleted_at: null });

    if (!faq) {
      throw ApiNotFoundError({
        key: FAQ_ERRORS.FAQ_NOT_FOUND_ERROR,
        message: 'FAQ not found',
      });
    }

    const deletedFAQ = await FAQ.findOneAndSoftDelete(
      { _id: id, deleted_at: null },
      { new: true },
    );

    if (!deletedFAQ) {
      throw ApiNotFoundError({
        key: FAQ_ERRORS.FAQ_NOT_DELETED_ERROR,
        message: 'FAQ not deleted',
      });
    }

    return res.status(200).json(deletedFAQ);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};
