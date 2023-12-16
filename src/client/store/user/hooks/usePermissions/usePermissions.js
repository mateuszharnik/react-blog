import {
  useState, useMemo, useCallback, useEffect,
} from 'react';
import { useStoreState } from 'easy-peasy';

export const usePermissions = (requiredPermissions = [], requiredSubscription = '', roles = []) => {
  const [isReady, setIsReady] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);

  const { permissions } = useStoreState((store) => store.userStore);

  const isAuthenticated = useMemo(() => !!permissions, [permissions]);

  const hasRole = useMemo(
    () => !!roles.find((role) => permissions?.type === role),
    [roles, permissions],
  );

  const checkPermissions = useCallback(() => {
    if (!requiredPermissions.length) {
      setHasPermissions(true);
      return true;
    }

    const requiredPermissionsLength = requiredPermissions
      .filter((requiredPermission) => permissions?.[requiredPermission]).length;

    const isPermissionsLengthEqual = (
      requiredPermissionsLength === requiredPermissions.length
    );

    setHasPermissions(isPermissionsLengthEqual);
    return isPermissionsLengthEqual;
  }, [requiredPermissions, permissions]);

  // TODO: Add subscription check if needed
  const checkSubscription = useCallback(() => {
    setHasSubscription(!requiredSubscription);
  }, [requiredSubscription]);

  useEffect(() => {
    checkPermissions();
    checkSubscription();

    setIsReady(true);
  }, [requiredPermissions, requiredSubscription, permissions]);

  return {
    isReady,
    isAuthenticated,
    hasPermissions,
    hasSubscription,
    hasRole,
    actions: {
      checkPermissions,
      checkSubscription,
    },
  };
};
