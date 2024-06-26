import {
  elementType, string, bool, arrayOf, oneOf, func, array, oneOfType,
} from 'prop-types';
import { permissionsConstants, rolesConstants, routesConstants } from '@shared/constants';

const { ROOT } = routesConstants;
const { ADMIN, SUPERUSER, USER } = rolesConstants;

const {
  CAN_MANAGE_POSTS,
  CAN_MANAGE_CATEGORIES,
  CAN_MANAGE_TAGS,
  CAN_MANAGE_COMMENTS,
  CAN_MANAGE_MESSAGES,
  CAN_MANAGE_CONTACT,
  CAN_MANAGE_ABOUT_US,
  CAN_MANAGE_NEWSLETTER,
  CAN_MANAGE_USERS,
  CAN_MANAGE_ADMIN_USERS,
  CAN_MANAGE_ROLES,
  CAN_MANAGE_TERMS_OF_USE,
  CAN_MANAGE_CONFIG,
  CAN_MANAGE_FAQS,
} = permissionsConstants;

export const protectedRoutePropTypes = {
  props: {
    pageComponent: elementType,
    paywallComponent: elementType,
    accessDeniedComponent: elementType,
    redirectComponent: elementType,
    redirect: string,
    shouldBeAuthenticated: bool,
    requiredSubscriptions: oneOfType([func, array]),
    requiredRoles: oneOfType([func, arrayOf(oneOf([
      ADMIN,
      SUPERUSER,
      USER,
    ]))]),
    requiredPermissions: oneOfType([func, arrayOf(oneOf([
      CAN_MANAGE_POSTS,
      CAN_MANAGE_CATEGORIES,
      CAN_MANAGE_TAGS,
      CAN_MANAGE_COMMENTS,
      CAN_MANAGE_MESSAGES,
      CAN_MANAGE_CONTACT,
      CAN_MANAGE_ABOUT_US,
      CAN_MANAGE_NEWSLETTER,
      CAN_MANAGE_USERS,
      CAN_MANAGE_ADMIN_USERS,
      CAN_MANAGE_ROLES,
      CAN_MANAGE_TERMS_OF_USE,
      CAN_MANAGE_CONFIG,
      CAN_MANAGE_FAQS,
    ]))]),
  },
  default: {
    pageComponent: undefined,
    paywallComponent: undefined,
    accessDeniedComponent: undefined,
    redirectComponent: undefined,
    redirect: ROOT,
    shouldBeAuthenticated: true,
    requiredSubscriptions: [],
    requiredRoles: [],
    requiredPermissions: [],
  },
};
