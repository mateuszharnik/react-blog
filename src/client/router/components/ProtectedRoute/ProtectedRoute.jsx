import { memo, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import cond from 'lodash/cond';
import stubTrue from 'lodash/stubTrue';
import { usePermissions } from '@client/store/user';
import { protectedRoutePropTypes } from '@client/prop-types/protectedRoutePropTypes';
import Redirect from '@client/router/components/Redirect';

const ProtectedRoute = memo(({
  pageComponent,
  paywallComponent,
  accessDeniedComponent,
  redirect,
  shouldBeAuthenticated,
  requiredSubscriptions,
  requiredRoles,
  requiredPermissions,
  requiredCondition,
}) => {
  const {
    isAuthenticated,
    hasPermissions,
    hasSubscriptions,
    hasRoles,
    hasCorrectCondition,
  } = usePermissions({
    requiredPermissions,
    requiredSubscriptions,
    requiredRoles,
    requiredCondition,
  });

  const DynamicComponent = useMemo(() => {
    const result = cond([
      [
        () => isAuthenticated !== shouldBeAuthenticated,
        () => (() => <Redirect to={redirect} />),
      ],
      [
        () => !hasCorrectCondition,
        () => accessDeniedComponent || (() => <Redirect to={redirect} />),
      ],
      [
        () => !hasPermissions,
        () => accessDeniedComponent || (() => <Redirect to={redirect} />),
      ],
      [
        () => !hasRoles,
        () => accessDeniedComponent || (() => <Redirect to={redirect} />),
      ],
      [
        () => !hasSubscriptions,
        () => paywallComponent || (() => <Redirect to={redirect} />),
      ],
      [
        stubTrue,
        () => pageComponent,
      ],
    ]);

    return result();
  }, []);

  return DynamicComponent ? <DynamicComponent /> : <Outlet />;
});

ProtectedRoute.displayName = 'ProtectedRoute';

ProtectedRoute.propTypes = protectedRoutePropTypes.props;

ProtectedRoute.defaultProps = protectedRoutePropTypes.default;

export default ProtectedRoute;
