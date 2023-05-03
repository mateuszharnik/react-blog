import {
  elementType, string, bool, arrayOf, oneOf,
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
  pageComponent: elementType,
  paywallComponent: elementType,
  accessDeniedComponent: elementType,
  redirect: string,
  shouldBeAuthenticated: bool,
  subscription: string,
  roles: arrayOf(oneOf([
    ADMIN,
    SUPERUSER,
    USER,
  ])),
  permissions: arrayOf(oneOf([
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
  ])),
};

export const protectedRouteDefaultProps = {
  pageComponent: undefined,
  paywallComponent: undefined,
  accessDeniedComponent: undefined,
  redirect: ROOT,
  shouldBeAuthenticated: true,
  subscription: '',
  roles: [],
  permissions: [],
};
