import {
  useState, useMemo, useCallback, useEffect,
} from 'react';
import { useStoreState } from 'easy-peasy';

export const usePermissions = ({
  requiredPermissions = [],
  requiredSubscription = '',
  requiredRoles = [],
  requiredCondition = () => true,
}) => {
  const [isReady, setIsReady] = useState(false);

  const [hasPermissions, setHasPermissions] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [hasCorrectCondition, setHasCorrectCondition] = useState(false);

  const { permissions } = useStoreState((store) => store.userStore);

  const isAuthenticated = useMemo(() => !!permissions, [permissions]);

  const hasRole = useMemo(
    () => !!requiredRoles.find((role) => permissions?.type === role),
    [requiredRoles, permissions],
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

  const checkSubscription = useCallback(() => {
    setHasSubscription(!requiredSubscription);
  }, [requiredSubscription]);

  const checkCondition = useCallback(() => {
    setHasCorrectCondition(requiredCondition());
  }, [requiredCondition]);

  useEffect(() => {
    checkPermissions();
    checkSubscription();
    checkCondition();

    setIsReady(true);
  }, [
    requiredPermissions,
    requiredSubscription,
    requiredCondition,
    permissions,
  ]);

  return {
    isReady,
    isAuthenticated,
    hasPermissions,
    hasSubscription,
    hasRole,
    hasCorrectCondition,
    actions: {
      checkPermissions,
      checkSubscription,
      checkCondition,
    },
  };
};
