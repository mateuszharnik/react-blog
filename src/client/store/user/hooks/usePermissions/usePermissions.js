import { useMemo, useCallback } from 'react';
import { useStoreState } from 'easy-peasy';
import isFunction from 'lodash/isFunction';

export const usePermissions = ({
  requiredPermissions = [],
  requiredSubscriptions = [],
  requiredRoles = [],
  requiredCondition = () => true,
}) => {
  const { permissions: userPermissions } = useStoreState((store) => store.userStore);

  const checkRoles = useCallback((roles) => {
    if (!roles.length) return true;

    const hasRequiredRole = !!roles.find(
      (role) => userPermissions?.type === role,
    );

    return hasRequiredRole;
  }, [userPermissions]);

  const checkSubscriptions = useCallback((subscriptions) => {
    if (!subscriptions.length) return true;

    const hasRequiredSubscription = !!subscriptions.find(
      (subscription) => userPermissions?.subscription === subscription,
    );

    return hasRequiredSubscription;
  }, [userPermissions]);

  const checkPermissions = useCallback((permissions) => {
    if (!permissions.length) return true;

    const requiredPermissionsLength = permissions
      .filter((requiredPermission) => userPermissions?.[requiredPermission]).length;

    const isPermissionsLengthEqual = (
      requiredPermissionsLength === permissions.length
    );

    return isPermissionsLengthEqual;
  }, [userPermissions]);

  const checkRequiredCondition = useCallback((condition) => (
    !isFunction(condition) ? true : condition(userPermissions)
  ), [userPermissions]);

  const isAuthenticated = useMemo(
    () => !!userPermissions,
    [userPermissions],
  );

  const hasRoles = useMemo(
    () => checkRoles(requiredRoles),
    [checkRoles, requiredRoles],
  );

  const hasPermissions = useMemo(
    () => checkPermissions(requiredPermissions),
    [checkPermissions, requiredPermissions],
  );

  const hasSubscriptions = useMemo(
    () => checkSubscriptions(requiredSubscriptions),
    [checkSubscriptions, requiredSubscriptions],
  );

  const hasCorrectCondition = useMemo(
    () => checkRequiredCondition(requiredCondition),
    [checkRequiredCondition, requiredCondition],
  );

  return {
    isAuthenticated,
    hasPermissions,
    hasSubscriptions,
    hasRoles,
    hasCorrectCondition,
    actions: {
      checkRoles,
      checkPermissions,
      checkSubscriptions,
      checkRequiredCondition,
    },
  };
};
