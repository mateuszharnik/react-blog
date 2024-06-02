import { memo, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import cond from 'lodash/cond';
import stubTrue from 'lodash/stubTrue';
import { usePermissions } from '@client/store/user';
import { protectedRoutePropTypes } from '@client/prop-types/protectedRoutePropTypes';
import Redirect from '@client/router/components/Redirect';

const result = cond([
  [
    ({ isAuthenticated, props }) => isAuthenticated !== props.shouldBeAuthenticated,
    ({ props }) => ({
      component: props.redirectComponent || Redirect,
      props: { to: props.redirect },
    }),
  ],
  [
    ({ hasPermissions }) => !hasPermissions,
    ({ props }) => {
      if (props.accessDeniedComponent) {
        return {
          component: props.accessDeniedComponent,
          props: { requiredPermissions: props.requiredPermissions },
        };
      }

      return {
        component: props.redirectComponent || Redirect,
        props: { to: props.redirect },
      };
    },
  ],
  [
    ({ hasRoles }) => !hasRoles,
    ({ props }) => {
      if (props.accessDeniedComponent) {
        return {
          component: props.accessDeniedComponent,
          props: { requiredRoles: props.requiredRoles },
        };
      }

      return {
        component: props.redirectComponent || Redirect,
        props: { to: props.redirect },
      };
    },
  ],
  [
    ({ hasSubscriptions }) => !hasSubscriptions,
    ({ props }) => {
      if (props.paywallComponent) {
        return {
          component: props.paywallComponent,
          props: { requiredSubscriptions: props.requiredSubscriptions },
        };
      }

      return {
        component: props.redirectComponent || Redirect,
        props: { to: props.redirect },
      };
    },
  ],
  [
    ({ props }) => props.pageComponent,
    ({ props }) => ({
      component: props.pageComponent,
      props: {},
    }),
  ],
  [
    stubTrue,
    () => ({
      component: Outlet,
      props: {},
    }),
  ],
]);

const ProtectedRoute = memo((props) => {
  const {
    isAuthenticated,
    hasPermissions,
    hasSubscriptions,
    hasRoles,
  } = usePermissions({
    requiredPermissions: props.requiredPermissions,
    requiredSubscriptions: props.requiredSubscriptions,
    requiredRoles: props.requiredRoles,
  });

  const render = useMemo(() => result({
    isAuthenticated,
    hasPermissions,
    hasRoles,
    hasSubscriptions,
    props,
  }), [
    isAuthenticated,
    hasPermissions,
    hasRoles,
    hasSubscriptions,
    props,
  ]);

  return <render.component {...render.props} />;
});

ProtectedRoute.displayName = 'ProtectedRoute';

ProtectedRoute.propTypes = protectedRoutePropTypes.props;

ProtectedRoute.defaultProps = protectedRoutePropTypes.default;

export default ProtectedRoute;
