import { useMemo, useCallback } from 'react';
import { useStoreState } from 'easy-peasy';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';

export const usePermissions = ({
  requiredPermissions = [],
  requiredSubscriptions = [],
  requiredRoles = [],
} = {}) => {
  const { permissions: userPermissions } = useStoreState((store) => store.userStore);

  const checkRoles = useCallback((roles, userData) => {
    if (isFunction(roles)) return roles(userData);

    if (!isArray(roles)) throw new Error('Prop "requiredRoles" should be an array or a function.');

    if (!roles.length) return true;

    const hasRequiredRole = !!roles.find(
      (role) => userData?.type === role,
    );

    return hasRequiredRole;
  }, []);

  const checkSubscriptions = useCallback((subscriptions, userData) => {
    if (isFunction(subscriptions)) return subscriptions(userData);

    if (!isArray(subscriptions)) throw new Error('Prop "requiredSubscriptions" should be an array or a function.');

    if (!subscriptions.length) return true;

    const hasRequiredSubscription = !!subscriptions.find(
      (subscription) => userData?.subscription === subscription,
    );

    return hasRequiredSubscription;
  }, []);

  const checkPermissions = useCallback((permissions, userData) => {
    if (isFunction(permissions)) return permissions(userData);

    if (!isArray(permissions)) throw new Error('Prop "requiredPermissions" should be an array or a function.');

    if (!permissions.length) return true;

    const hasRequiredPermissions = permissions.every(
      (requiredPermission) => userData?.[requiredPermission],
    );

    return hasRequiredPermissions;
  }, []);

  const isAuthenticated = useMemo(
    () => !isEmpty(userPermissions),
    [userPermissions],
  );

  const hasRoles = useMemo(
    () => checkRoles(requiredRoles, userPermissions),
    [checkRoles, userPermissions, requiredRoles],
  );

  const hasPermissions = useMemo(
    () => checkPermissions(requiredPermissions, userPermissions),
    [checkPermissions, userPermissions, requiredPermissions],
  );

  const hasSubscriptions = useMemo(
    () => checkSubscriptions(requiredSubscriptions, userPermissions),
    [checkSubscriptions, userPermissions, requiredSubscriptions],
  );

  return {
    permissions: userPermissions,
    isAuthenticated,
    hasPermissions,
    hasSubscriptions,
    hasRoles,
    actions: {
      checkRoles,
      checkPermissions,
      checkSubscriptions,
    },
  };
};
