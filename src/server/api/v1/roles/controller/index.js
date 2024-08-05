import colors from 'colors/safe';
import logger from '@server/logger';
import sanitize from '@server/helpers/purify';
import validateId from '@server/helpers/validation/validateId';
import {
  ApiBodyValidationError,
  ApiParamsValidationError,
  ApiConflictError,
  ApiNotFoundError,
} from '@server/utils/errorUtils';
import { errorsConstants } from '@shared/constants';

import validateRole from '../schema';
import Role from '../model';

const { ROLE_ERRORS } = errorsConstants;

export const countRoles = async (req, res, next) => {
  try {
    const roles = await Role.count({ deleted_at: null });

    return res.status(200).json({ roles });
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const getRoles = async (req, res, next) => {
  try {
    const roles = await Role.find({ deleted_at: null }).sort({ created_at: -1 });

    return res.status(200).json(roles);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const getRole = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { validationError } = validateId(id);

    if (validationError) {
      throw ApiParamsValidationError({ validationError });
    }

    const role = await Role.findOne({ _id: id, deleted_at: null });

    if (!role) {
      throw ApiNotFoundError({
        key: ROLE_ERRORS.ROLE_NOT_FOUND_ERROR,
        message: 'Role not found',
      });
    }

    return res.status(200).json(role);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const createRole = async (req, res, next) => {
  try {
    req.body.name = sanitize(req.body.name);
    req.body.description = sanitize(req.body.description);

    const { validationError, data } = validateRole(req.body);

    if (validationError) {
      throw ApiBodyValidationError({ validationError });
    }

    const role = await Role.findOne({
      name: req.body.name.toLowerCase(),
      deleted_at: null,
      can_be_modified: true,
      type: 'SUPERUSER',
    });

    if (role) {
      throw ApiConflictError({
        key: ROLE_ERRORS.ROLE_ALREADY_EXIST_ERROR,
        message: 'Role already exist',
      });
    }

    const createdRole = await Role.create({
      ...data,
      type: 'SUPERUSER',
      can_be_banned: true,
      can_be_modified: true,
    });

    if (!createdRole) {
      throw ApiConflictError({
        key: ROLE_ERRORS.ROLE_NOT_CREATED_ERROR,
        message: 'Role not created',
      });
    }

    return res.status(201).json(createdRole);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { validationError: validationIdError } = validateId(id);

    if (validationIdError) {
      throw ApiParamsValidationError({ validationError: validationIdError });
    }

    req.body.name = sanitize(req.body.name);
    req.body.description = sanitize(req.body.description);

    const { validationError, data } = validateRole(req.body);

    if (validationError) {
      throw ApiBodyValidationError({ validationError });
    }

    const role = await Role.findOne({ _id: id, deleted_at: null });

    if (!role) {
      throw ApiNotFoundError({
        key: ROLE_ERRORS.ROLE_NOT_FOUND_ERROR,
        message: 'Role not found',
      });
    }

    if (role?.type !== 'SUPERUSER') {
      throw ApiConflictError({
        key: ROLE_ERRORS.ROLE_CANNOT_BE_CHANGED_ERROR,
        message: 'Role cannot be changed',
      });
    }

    const updatedRole = await Role.findOneAndUpdate(
      {
        _id: id, deleted_at: null, type: 'SUPERUSER', can_be_modified: true,
      },
      { ...data },
      { new: true },
    );

    if (!updatedRole) {
      throw ApiConflictError({
        key: ROLE_ERRORS.ROLE_NOT_UPDATED_ERROR,
        message: 'Role not updated',
      });
    }

    return res.status(200).json(updatedRole);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const deleteRoles = async (req, res, next) => {
  try {
    const roles = await Role.find({ deleted_at: null, can_be_modified: true, type: 'SUPERUSER' });

    if (!roles?.length) {
      throw ApiNotFoundError({
        key: ROLE_ERRORS.ROLES_NOT_FOUND_ERROR,
        message: 'Roles not found',
      });
    }

    const ids = roles.map(({ _id }) => _id.toString());

    const updatedRoles = await Role.softDeleteMany(
      { _id: { $in: ids }, deleted_at: null },
      { new: true },
    );

    if (!updatedRoles) {
      throw ApiConflictError({
        key: ROLE_ERRORS.ROLES_NOT_DELETED_ERROR,
        message: 'Roles not deleted',
      });
    }

    const deletedRoles = await Role.find({
      _id: { $in: ids },
      can_be_modified: true,
      deleted_at: { $ne: null },
    });

    if (!deletedRoles?.length) {
      throw ApiNotFoundError({
        key: ROLE_ERRORS.ROLES_NOT_FOUND_ERROR,
        message: 'Roles not found',
      });
    }

    return res.status(200).json(deletedRoles);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const deleteRole = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { validationError } = validateId(id);

    if (validationError) {
      throw ApiParamsValidationError({ validationError });
    }

    const role = await Role.findOne({ _id: id, deleted_at: null });

    if (!role) {
      throw ApiNotFoundError({
        key: ROLE_ERRORS.ROLE_NOT_FOUND_ERROR,
        message: 'Role not found',
      });
    }

    if (role?.type !== 'SUPERUSER') {
      throw ApiConflictError({
        key: ROLE_ERRORS.ROLE_CANNOT_BE_DELETED_ERROR,
        message: 'Role cannot be deleted',
      });
    }

    const deletedRole = await Role.findOneAndSoftDelete(
      {
        _id: id, deleted_at: null, can_be_modified: true, type: 'SUPERUSER',
      },
      { new: true },
    );

    if (!deletedRole) {
      throw ApiConflictError({
        key: ROLE_ERRORS.ROLE_NOT_DELETED_ERROR,
        message: 'Role not deleted',
      });
    }

    return res.status(200).json(deletedRole);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};
