import {
  memo, useMemo, useState, useEffect,
} from 'react';
import { Outlet } from 'react-router-dom';
import cond from 'lodash/cond';
import stubTrue from 'lodash/stubTrue';
import { useRouter } from '@client/router/hooks';
import { usePermissions } from '@client/store/user';
import { protectedRoutePropTypes } from '@client/prop-types/protectedRoutePropTypes';

const ProtectedRoute = memo(({
  pageComponent,
  paywallComponent,
  accessDeniedComponent,
  redirect,
  shouldBeAuthenticated,
  requiredSubscription,
  requiredRoles,
  requiredPermissions,
  requiredCondition,
}) => {
  const [shouldRenderComponent, setShouldRenderComponent] = useState(false);

  const { history: { replace } } = useRouter();
  const {
    isReady,
    isAuthenticated,
    hasPermissions,
    hasSubscription,
    hasRole,
    hasCorrectCondition,
  } = usePermissions({
    requiredPermissions,
    requiredSubscription,
    requiredRoles,
    requiredCondition,
  });

  const DynamicComponent = useMemo(() => {
    const result = cond([
      [
        () => !hasCorrectCondition && accessDeniedComponent,
        () => accessDeniedComponent,
      ],
      [
        () => !hasPermissions && accessDeniedComponent,
        () => accessDeniedComponent,
      ],
      [
        () => !hasSubscription && paywallComponent,
        () => paywallComponent,
      ],
      [
        stubTrue,
        () => pageComponent,
      ],
    ]);

    return result();
  }, [
    hasCorrectCondition,
    hasPermissions,
    hasSubscription,
    accessDeniedComponent,
    paywallComponent,
    pageComponent,
  ]);

  useEffect(() => {
    if (!isReady) return;

    if (isAuthenticated !== shouldBeAuthenticated) {
      return replace(redirect);
    }

    if (!hasRole && requiredRoles.length) {
      return replace(redirect);
    }

    if (!hasCorrectCondition && !accessDeniedComponent) {
      return replace(redirect);
    }

    if (!hasPermissions && !accessDeniedComponent) {
      return replace(redirect);
    }

    if (!hasSubscription && !paywallComponent) {
      return replace(redirect);
    }

    setShouldRenderComponent(true);
  }, [isReady]);

  return shouldRenderComponent ? (
    <>
      {DynamicComponent ? <DynamicComponent /> : <Outlet />}
    </>
  ) : null;
});

ProtectedRoute.displayName = 'ProtectedRoute';

ProtectedRoute.propTypes = protectedRoutePropTypes.props;

ProtectedRoute.defaultProps = protectedRoutePropTypes.default;

export default ProtectedRoute;
