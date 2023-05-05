import {
  memo, useMemo, useState, useEffect,
} from 'react';
import { Outlet } from 'react-router-dom';
import cond from 'lodash/cond';
import stubTrue from 'lodash/stubTrue';
import { useRouter } from '@client/router/hooks';
import { usePermissions } from '@client/store/user';
import { protectedRoutePropTypes, protectedRouteDefaultProps } from '@client/prop-types';

const ProtectedRoute = memo(({
  pageComponent,
  paywallComponent,
  accessDeniedComponent,
  redirect,
  shouldBeAuthenticated,
  subscription,
  roles,
  permissions,
}) => {
  const [shouldRenderComponent, setShouldRenderComponent] = useState(false);

  const { history: { replace } } = useRouter();
  const {
    isReady,
    isAuthenticated,
    hasPermissions,
    hasSubscription,
    hasRole,
  } = usePermissions(permissions, subscription, roles);

  const DynamicComponent = useMemo(() => {
    const result = cond([
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

    if (!hasRole && roles.length) {
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

ProtectedRoute.propTypes = protectedRoutePropTypes;

ProtectedRoute.defaultProps = protectedRouteDefaultProps;

export default ProtectedRoute;
