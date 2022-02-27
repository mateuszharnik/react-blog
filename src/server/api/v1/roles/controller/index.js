import colors from 'colors/safe';
import createResponseWithError from '@server/helpers/createResponseWithError';
import purify from '@server/helpers/purify';
import validateId from '@server/helpers/validation/validateId';
import validateRole from '../schema';
import Role from '../model';

export const countRoles = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const roles = await Role.count({ deleted_at: null, can_be_modified: true });

    return res.status(200).json({ roles });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const getRoles = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const roles = await Role
      .find({ deleted_at: null, can_be_modified: true })
      .sort({ created_at: -1 });

    if (!roles?.length) {
      return responseWithError(404, 'Nie znaleziono żadnej roli użytkownika.');
    }

    return res.status(200).json(roles);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
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

    const role = await Role.findOne({ _id: id, deleted_at: null, can_be_modified: true });

    if (!role) {
      return responseWithError(404, 'Nie znaleziono roli użytkownika.');
    }

    return res.status(200).json(role);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const createRole = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const role = await Role.findOne({
      name: req.body.name,
      deleted_at: null,
      can_be_modified: true,
    });

    if (role) {
      return responseWithError(409, 'Rola o takiej nazwie już istnieje.');
    }

    req.body.name = purify(req.body.name);
    req.body.description = purify(req.body.description);

    const { validationError, data } = validateRole(req.body);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const createdRole = await Role.create({
      ...data,
      type: 'ADMIN',
      can_be_banned: true,
      can_be_modified: true,
    });

    if (!createdRole) {
      return responseWithError(409, 'Nie udało się utworzyć nowej roli użytkownika.');
    }

    return res.status(201).json(createdRole);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
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

    if (!role?.can_be_modified) {
      return responseWithError(409, 'Nie można zaktualizować tej roli użytkownika.');
    }

    req.body.name = purify(req.body.name);
    req.body.description = purify(req.body.description);

    const { validationError, data } = validateRole(req.body);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const updatedRole = await Role.findOneAndUpdate(
      { _id: id, deleted_at: null, can_be_modified: true },
      { ...data },
      { new: true },
    );

    if (!updatedRole) {
      return responseWithError(409, 'Nie udało się zaktualizować roli użytkownika.');
    }

    return res.status(200).json(updatedRole);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const deleteRoles = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const roles = await Role.find({ deleted_at: null, can_be_modified: true });

    if (!roles?.length) {
      return responseWithError(404, 'Nie znaleziono żadnej roli użytkownika.');
    }

    const updatedRoles = await Role.updateMany(
      { deleted_at: null, can_be_modified: true },
      { deleted_at: Date.now() },
      { new: true },
    );

    if (!updatedRoles) {
      return responseWithError(409, 'Nie udało się usunąć roli użytkownika.');
    }

    const ids = roles.map(({ _id }) => _id.toString());

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
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
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

    if (!role?.can_be_modified) {
      return responseWithError(409, 'Nie można usunąć tej roli użytkownika.');
    }

    const deletedRole = await Role.findOneAndUpdate(
      { _id: id, deleted_at: null, can_be_modified: true },
      { deleted_at: Date.now() },
      { new: true },
    );

    if (!deletedRole) {
      return responseWithError(409, 'Nie udało się usunąć roli użytkownika.');
    }

    return res.status(200).json(deletedRole);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};
