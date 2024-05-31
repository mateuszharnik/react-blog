import { memo, useMemo } from 'react';
import cond from 'lodash/cond';
import stubTrue from 'lodash/stubTrue';
import { useRouter } from '@client/router/hooks';
import { usePermissions } from '@client/store/user';
import { rolesConstants, routesConstants } from '@shared/constants';
import Redirect from '@client/router/components/Redirect';
import SignOut from '@client/views/Auth/SignOut';

const { ADMIN, ROOT } = routesConstants.AUTH.SIGN_IN;

const result = cond([
  [
    ({ isAuthenticated, state }) => !isAuthenticated || !state?.signOut,
    () => ({
      component: Redirect,
      props: { to: routesConstants.ROOT },
    }),
  ],
  [
    stubTrue,
    ({ redirectUrl }) => ({
      component: SignOut,
      props: { redirectUrl },
    }),
  ],
]);

const SignOutRoute = memo(() => {
  const { location: { state } } = useRouter();
  const { isAuthenticated, permissions } = usePermissions();

  const redirectUrl = useMemo(() => (
    permissions?.type === rolesConstants.USER ? ROOT : ADMIN.ROOT
  ), []);

  const render = useMemo(() => result({ redirectUrl, isAuthenticated, state }), []);

  return <render.component {...render.props} />;
});

SignOutRoute.displayName = 'SignOutRoute';

export default SignOutRoute;
