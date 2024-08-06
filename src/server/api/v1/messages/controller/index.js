import colors from 'colors/safe';
import logger from '@server/logger';
import validateId from '@server/helpers/validation/validateId';
import validateIds from '@server/helpers/validation/validateIds';
import sanitize from '@server/helpers/purify';
import {
  ApiParamsValidationError,
  ApiBodyValidationError,
  ApiConflictError,
  ApiNotFoundError,
} from '@server/utils/errorUtils';
import { errorsConstants } from '@shared/constants';
import Message from '../model';
import validateMessage from '../schema';

const { MESSAGE_ERRORS } = errorsConstants;

export const countMessages = (isRead = null) => async (req, res, next) => {
  const query = { deleted_at: null };

  if (isRead !== null) {
    query.is_read = !!isRead;
  }

  try {
    const messages = await Message.count(query);

    return res.status(200).json({ messages });
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ deleted_at: null }).sort({ created_at: -1 });

    return res.status(200).json(messages);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { validationError } = validateId(id);

    if (validationError) {
      throw ApiParamsValidationError({ validationError });
    }

    const message = await Message.findOne({ _id: id, deleted_at: null });

    if (!message) {
      throw ApiNotFoundError({
        key: MESSAGE_ERRORS.MESSAGE_NOT_FOUND_ERROR,
        message: 'Message not found',
      });
    }

    const updatedMessage = await Message.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { is_read: true },
      { new: true },
    );

    if (!updatedMessage) {
      throw ApiConflictError({
        key: MESSAGE_ERRORS.MESSAGE_NOT_UPDATED_ERROR,
        message: 'Message not updated',
      });
    }

    return res.status(200).json(updatedMessage);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    req.body.contents = sanitize(req.body.contents);

    const { validationError, data } = validateMessage(req.body);

    if (validationError) {
      throw ApiBodyValidationError({ validationError });
    }

    const createdMessage = await Message.create({
      ...data,
      is_read: false,
    });

    if (!createdMessage) {
      throw ApiConflictError({
        key: MESSAGE_ERRORS.MESSAGE_NOT_CREATED_ERROR,
        message: 'Message not created',
      });
    }

    return res.status(201).json(createdMessage);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const deleteMessages = async (req, res, next) => {
  try {
    const query = { deleted_at: null };

    if (req.body?.length) {
      const { validationError, data } = validateIds(req.body);

      if (validationError) {
        throw ApiBodyValidationError({ validationError });
      }

      query._id = { $in: data };
    }

    const messages = await Message.find(query);

    if (!messages?.length) {
      throw ApiNotFoundError({
        key: MESSAGE_ERRORS.MESSAGES_NOT_FOUND_ERROR,
        message: 'Messages not found',
      });
    }

    const ids = messages.map(({ _id }) => _id.toString());

    const updatedMessages = await Message.softDeleteMany(
      { _id: { $in: ids }, deleted_at: null },
      { new: true },
    );

    if (!updatedMessages) {
      throw ApiConflictError({
        key: MESSAGE_ERRORS.MESSAGES_NOT_DELETED_ERROR,
        message: 'Messages not deleted',
      });
    }

    const deletedMessages = await Message.find({ _id: { $in: ids }, deleted_at: { $ne: null } });

    if (!deletedMessages?.length) {
      throw ApiNotFoundError({
        key: MESSAGE_ERRORS.MESSAGES_NOT_FOUND_ERROR,
        message: 'Messages not found',
      });
    }

    return res.status(200).json(deletedMessages);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { validationError } = validateId(id);

    if (validationError) {
      throw ApiParamsValidationError({ validationError });
    }

    const message = await Message.findOne({ _id: id, deleted_at: null });

    if (!message) {
      throw ApiNotFoundError({
        key: MESSAGE_ERRORS.MESSAGE_NOT_FOUND_ERROR,
        message: 'Message not found',
      });
    }

    const deletedMessage = await Message.findOneAndSoftDelete(
      { _id: id, deleted_at: null },
      { new: true },
    );

    if (!deletedMessage) {
      throw ApiConflictError({
        key: MESSAGE_ERRORS.MESSAGE_NOT_DELETED_ERROR,
        message: 'Message not deleted',
      });
    }

    return res.status(200).json(deletedMessage);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};
