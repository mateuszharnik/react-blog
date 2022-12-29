import colors from 'colors/safe';
import logger from '@server/logger';
import createResponseWithError from '@server/helpers/createResponseWithError';
import mapValidationMessages from '@server/helpers/validation/mapValidationMessages';
import sanitize from '@server/helpers/purify';
import validateId from '@server/helpers/validation/validateId';
import validateRole from '../schema';
import Role from '../model';

export const countRoles = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const roles = await Role.count({ deleted_at: null });

    return res.status(200).json({ roles });
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const getRoles = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const roles = await Role.find({ deleted_at: null }).sort({ created_at: -1 });

    return res.status(200).json(roles);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const getRole = async (req, res, next) => {
  const { id } = req.params;
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError } = validateId(id);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const role = await Role.findOne({ _id: id, deleted_at: null });

    if (!role) {
      return responseWithError(404, 'Nie znaleziono roli użytkownika.');
    }

    return res.status(200).json(role);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const createRole = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const role = await Role.findOne({
      name: req.body.name.toLowerCase(),
      deleted_at: null,
      can_be_modified: true,
      type: 'SUPERUSER',
    });

    if (role) {
      return responseWithError(409, 'Rola o takiej nazwie już istnieje.');
    }

    req.body.name = sanitize(req.body.name);
    req.body.description = sanitize(req.body.description);

    const { validationError, data } = validateRole(req.body);

    if (validationError) {
      return responseWithError(409, mapValidationMessages(validationError));
    }

    const createdRole = await Role.create({
      ...data,
      type: 'SUPERUSER',
      can_be_banned: true,
      can_be_modified: true,
    });

    if (!createdRole) {
      return responseWithError(409, 'Nie udało się utworzyć nowej roli użytkownika.');
    }

    return res.status(201).json(createdRole);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const updateRole = async (req, res, next) => {
  const { id } = req.params;
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError: validationIdError } = validateId(id);

    if (validationIdError) {
      return responseWithError(409, validationIdError.details[0].message);
    }

    const role = await Role.findOne({ _id: id, deleted_at: null });

    if (!role) {
      return responseWithError(404, 'Nie znaleziono roli użytkownika.');
    }

    if (role?.type !== 'SUPERUSER') {
      return responseWithError(409, 'Nie można zaktualizować tej roli użytkownika.');
    }

    req.body.name = sanitize(req.body.name);
    req.body.description = sanitize(req.body.description);

    const { validationError, data } = validateRole(req.body);

    if (validationError) {
      return responseWithError(409, mapValidationMessages(validationError));
    }

    const updatedRole = await Role.findOneAndUpdate(
      {
        _id: id, deleted_at: null, type: 'SUPERUSER', can_be_modified: true,
      },
      { ...data },
      { new: true },
    );

    if (!updatedRole) {
      return responseWithError(409, 'Nie udało się zaktualizować roli użytkownika.');
    }

    return res.status(200).json(updatedRole);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const deleteRoles = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const roles = await Role.find({ deleted_at: null, can_be_modified: true, type: 'SUPERUSER' });

    if (!roles?.length) {
      return responseWithError(404, 'Nie znaleziono żadnej roli użytkownika.');
    }

    const ids = roles.map(({ _id }) => _id.toString());

    const updatedRoles = await Role.softDeleteMany(
      { _id: { $in: ids }, deleted_at: null },
      { new: true },
    );

    if (!updatedRoles) {
      return responseWithError(409, 'Nie udało się usunąć roli użytkownika.');
    }

    const deletedRoles = await Role.find({
      _id: { $in: ids },
      can_be_modified: true,
      deleted_at: { $ne: null },
    });

    if (!deletedRoles?.length) {
      return responseWithError(404, 'Nie znaleziono żadnej roli użytkownika.');
    }

    return res.status(200).json(deletedRoles);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const deleteRole = async (req, res, next) => {
  const { id } = req.params;
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError } = validateId(id);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const role = await Role.findOne({ _id: id, deleted_at: null });

    if (!role) {
      return responseWithError(404, 'Nie znaleziono roli użytkownika.');
    }

    if (role?.type !== 'SUPERUSER') {
      return responseWithError(409, 'Nie można usunąć tej roli użytkownika.');
    }

    const deletedRole = await Role.findOneAndSoftDelete(
      {
        _id: id, deleted_at: null, can_be_modified: true, type: 'SUPERUSER',
      },
      { new: true },
    );

    if (!deletedRole) {
      return responseWithError(409, 'Nie udało się usunąć roli użytkownika.');
    }

    return res.status(200).json(deletedRole);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};
