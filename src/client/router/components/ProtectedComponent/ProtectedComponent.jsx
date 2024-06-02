import { memo, useMemo } from 'react';
import cond from 'lodash/cond';
import stubTrue from 'lodash/stubTrue';
import { usePermissions } from '@client/store/user';
import { protectedComponentPropTypes } from '@client/prop-types/protectedComponentPropTypes';

const result = cond([
  [
    ({ isAuthenticated, props }) => isAuthenticated !== props.shouldBeAuthenticated,
    ({ props }) => {
      if (props.accessDeniedComponent) {
        return {
          component: props.accessDeniedComponent,
          props: {},
        };
      }

      return {
        component: null,
        props: {},
      };
    },
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
        component: null,
        props: {},
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
        component: null,
        props: {},
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
        component: null,
        props: {},
      };
    },
  ],
  [
    stubTrue,
    ({ children }) => ({
      component: () => children,
      props: {},
    }),
  ],
]);

const ProtectedComponent = memo(({ children, ...props }) => {
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
    children,
    props,
  }), [
    isAuthenticated,
    hasPermissions,
    hasRoles,
    hasSubscriptions,
    children,
    props,
  ]);

  return render.component ? <render.component {...render.props} /> : null;
});

ProtectedComponent.displayName = 'ProtectedComponent';

ProtectedComponent.propTypes = protectedComponentPropTypes.props;

ProtectedComponent.defaultProps = protectedComponentPropTypes.default;

export default ProtectedComponent;
