import { useStoreState } from 'easy-peasy';
import unset from 'lodash/unset';
import set from 'lodash/set';
import isEmpty from 'lodash/isEmpty';
import { render, screen } from '@client/utils/testUtils';
import { useRouterSpyOn } from '@client/utils/testUtils/spyOn/useRouterSpyOn';
import { rolesConstants, routesConstants, permissionsConstants } from '@shared/constants';
import ProtectedRoute from './index';

jest.mock('easy-peasy', () => ({
  ...jest.requireActual('easy-peasy'),
  useStoreState: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => 'Outlet Component',
}));

const PageComponent = () => <div>Page Component</div>;

const AccessDeniedComponent = () => <div>Access Denied Component</div>;

const PaywallComponent = () => <div>Paywall Component</div>;

const RedirectComponent = () => <div>Redirect Component</div>;

const createSetUserInfo = () => {
  const defaultPermissions = {
    type: 'ADMIN',
    can_manage_posts: true,
    can_manage_categories: true,
    can_manage_tags: true,
    can_manage_comments: true,
    can_manage_messages: true,
    can_manage_contact: true,
    can_manage_about_us: true,
    can_manage_newsletter: true,
    can_manage_users: true,
    can_manage_admin_users: true,
    can_manage_roles: true,
    can_manage_terms_of_use: true,
    can_manage_config: true,
    can_manage_faqs: true,
    can_be_banned: false,
    can_be_modified: false,
    subscription: 'FREE',
  };

  const permissions = { ...defaultPermissions };

  return (newPermissions = {}) => {
    if (newPermissions === null) {
      Object.keys(permissions).forEach((key) => unset(permissions, key));
    } else if (isEmpty(newPermissions)) {
      Object.keys(permissions).forEach((key) => unset(permissions, key));
      Object.entries(defaultPermissions).forEach(([key, value]) => set(permissions, key, value));
    } else {
      Object.entries(newPermissions).forEach(([key, value]) => set(permissions, key, value));
    }

    useStoreState.mockReturnValue({
      permissions: { ...permissions },
    });
  };
};

const setUserInfo = createSetUserInfo();

describe('ProtectedRoute', () => {
  beforeAll(() => {
    setUserInfo();
  });

  describe('Outlet', () => {
    it('should render Outlet component if we not pass pageComponent', async () => {
      await render(ProtectedRoute);

      const outletComponentText = screen.queryByText('Outlet Component');

      expect(outletComponentText).toBeInTheDocument();
    });
  });

  describe('redirectComponent', () => {
    it('should render RedirectComponent component if we pass redirectComponent props', async () => {
      const { mockedImplementation, spyOnUseRouter } = useRouterSpyOn();

      await render(ProtectedRoute, {
        props: {
          shouldBeAuthenticated: false,
          redirect: routesConstants.DOCS.ROOT,
          redirectComponent: RedirectComponent,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');
      const redirectComponentText = screen.queryByText('Redirect Component');

      expect(mockedImplementation.history.replace).toBeCalledTimes(0);

      expect(pageComponentText).not.toBeInTheDocument();
      expect(redirectComponentText).toBeInTheDocument();

      spyOnUseRouter.mockRestore();
    });
  });

  describe('shouldBeAuthenticated', () => {
    it('should not render PageComponent component if shouldBeAuthenticated prop is equal false and user is logged in', async () => {
      const { mockedImplementation, spyOnUseRouter } = useRouterSpyOn();

      await render(ProtectedRoute, {
        props: {
          shouldBeAuthenticated: false,
          redirect: routesConstants.DOCS.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(mockedImplementation.history.replace).toBeCalledTimes(1);
      expect(mockedImplementation.history.replace).toBeCalledWith(routesConstants.DOCS.ROOT);

      expect(pageComponentText).not.toBeInTheDocument();

      spyOnUseRouter.mockRestore();
    });

    it('should render PageComponent component if shouldBeAuthenticated prop is equal true and user is logged in', async () => {
      await render(ProtectedRoute, {
        props: {
          shouldBeAuthenticated: true,
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(pageComponentText).toBeInTheDocument();
    });

    it('should not render PageComponent component if shouldBeAuthenticated prop is equal true and user is not logged in', async () => {
      const { mockedImplementation, spyOnUseRouter } = useRouterSpyOn();

      setUserInfo(null);

      await render(ProtectedRoute, {
        props: {
          shouldBeAuthenticated: true,
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(mockedImplementation.history.replace).toBeCalledTimes(1);
      expect(mockedImplementation.history.replace).toBeCalledWith(routesConstants.ABOUT.ROOT);

      expect(pageComponentText).not.toBeInTheDocument();

      spyOnUseRouter.mockRestore();
    });

    it('should render PageComponent component if shouldBeAuthenticated prop is equal false and user is not logged in', async () => {
      await render(ProtectedRoute, {
        props: {
          shouldBeAuthenticated: false,
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(pageComponentText).toBeInTheDocument();
    });
  });

  describe('requiredRoles', () => {
    it('should not render PageComponent component if user do not have required roles', async () => {
      const { mockedImplementation, spyOnUseRouter } = useRouterSpyOn();

      setUserInfo();

      await render(ProtectedRoute, {
        props: {
          requiredRoles: [rolesConstants.USER],
          redirect: routesConstants.ADMIN.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(mockedImplementation.history.replace).toBeCalledTimes(1);
      expect(mockedImplementation.history.replace).toBeCalledWith(routesConstants.ADMIN.ROOT);

      expect(pageComponentText).not.toBeInTheDocument();

      spyOnUseRouter.mockRestore();
    });

    it('should render AccessDeniedComponent component if user do not have required roles - as function', async () => {
      const requiredRoles = jest.fn(
        (permissions) => permissions.type === rolesConstants.USER,
      );

      await render(ProtectedRoute, {
        props: {
          requiredRoles,
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
          accessDeniedComponent: AccessDeniedComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');
      const accessDeniedComponentText = screen.queryByText('Access Denied Component');

      expect(requiredRoles).toBeCalledTimes(1);
      expect(requiredRoles).toBeCalledWith(expect.objectContaining({ type: 'ADMIN' }));

      expect(pageComponentText).not.toBeInTheDocument();
      expect(accessDeniedComponentText).toBeInTheDocument();
    });

    it('should render AccessDeniedComponent component if user do not have required roles but we pass accessDeniedComponent', async () => {
      await render(ProtectedRoute, {
        props: {
          requiredRoles: [rolesConstants.USER],
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
          accessDeniedComponent: AccessDeniedComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');
      const accessDeniedComponentText = screen.queryByText('Access Denied Component');

      expect(pageComponentText).not.toBeInTheDocument();
      expect(accessDeniedComponentText).toBeInTheDocument();
    });

    it('should render PageComponent component if user have one of the required roles', async () => {
      await render(ProtectedRoute, {
        props: {
          requiredRoles: [rolesConstants.USER, rolesConstants.ADMIN],
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(pageComponentText).toBeInTheDocument();
    });

    it('should render PageComponent component if user have required roles', async () => {
      await render(ProtectedRoute, {
        props: {
          requiredRoles: [rolesConstants.ADMIN],
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(pageComponentText).toBeInTheDocument();
    });

    it('should render PageComponent component if user have required roles - as function', async () => {
      const requiredRoles = jest.fn(
        (permissions) => permissions.type === rolesConstants.ADMIN,
      );

      await render(ProtectedRoute, {
        props: {
          requiredRoles,
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(requiredRoles).toBeCalledTimes(1);
      expect(requiredRoles).toBeCalledWith(expect.objectContaining({ type: 'ADMIN' }));

      expect(pageComponentText).toBeInTheDocument();
    });
  });

  describe('requiredPermissions', () => {
    it('should not render PageComponent component if user do not have required permissions', async () => {
      const { mockedImplementation, spyOnUseRouter } = useRouterSpyOn();

      setUserInfo({ can_manage_about_us: false });

      await render(ProtectedRoute, {
        props: {
          requiredPermissions: [permissionsConstants.CAN_MANAGE_ABOUT_US],
          redirect: routesConstants.PROFILE.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(mockedImplementation.history.replace).toBeCalledTimes(1);
      expect(mockedImplementation.history.replace).toBeCalledWith(routesConstants.PROFILE.ROOT);

      expect(pageComponentText).not.toBeInTheDocument();

      spyOnUseRouter.mockRestore();
    });

    it('should render AccessDeniedComponent component if user do not have required permissions - as function', async () => {
      const requiredPermissions = jest.fn(
        (permissions) => permissions.can_manage_about_us
          && permissions.can_manage_comments,
      );

      await render(ProtectedRoute, {
        props: {
          requiredPermissions,
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
          accessDeniedComponent: AccessDeniedComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');
      const accessDeniedComponentText = screen.queryByText('Access Denied Component');

      expect(requiredPermissions).toBeCalledTimes(1);
      expect(requiredPermissions).toBeCalledWith(expect.objectContaining({
        can_manage_comments: true,
        can_manage_about_us: false,
      }));

      expect(pageComponentText).not.toBeInTheDocument();
      expect(accessDeniedComponentText).toBeInTheDocument();
    });

    it('should render AccessDeniedComponent component if user do not have required permissions but we pass accessDeniedComponent', async () => {
      setUserInfo({ can_manage_about_us: false });

      await render(ProtectedRoute, {
        props: {
          requiredPermissions: [permissionsConstants.CAN_MANAGE_ABOUT_US],
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
          accessDeniedComponent: AccessDeniedComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');
      const accessDeniedComponentText = screen.queryByText('Access Denied Component');

      expect(pageComponentText).not.toBeInTheDocument();
      expect(accessDeniedComponentText).toBeInTheDocument();
    });

    it('should render AccessDeniedComponent component if user do not have all required permissions', async () => {
      await render(ProtectedRoute, {
        props: {
          requiredPermissions: [
            permissionsConstants.CAN_MANAGE_COMMENTS,
            permissionsConstants.CAN_MANAGE_FAQS,
            permissionsConstants.CAN_MANAGE_ABOUT_US,
          ],
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
          accessDeniedComponent: AccessDeniedComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');
      const accessDeniedComponentText = screen.queryByText('Access Denied Component');

      expect(pageComponentText).not.toBeInTheDocument();
      expect(accessDeniedComponentText).toBeInTheDocument();
    });

    it('should render PageComponent component if user have required permissions', async () => {
      setUserInfo();

      await render(ProtectedRoute, {
        props: {
          requiredPermissions: [permissionsConstants.CAN_MANAGE_ABOUT_US],
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(pageComponentText).toBeInTheDocument();
    });

    it('should render PageComponent component if user have required permissions - as function', async () => {
      const requiredPermissions = jest.fn(
        (permissions) => permissions.can_manage_about_us
          || permissions.can_manage_comments,
      );

      await render(ProtectedRoute, {
        props: {
          requiredPermissions,
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(requiredPermissions).toBeCalledTimes(1);
      expect(requiredPermissions).toBeCalledWith(expect.objectContaining({
        can_manage_comments: true,
        can_manage_about_us: true,
      }));

      expect(pageComponentText).toBeInTheDocument();
    });

    it('should render PageComponent component if user have all required permissions', async () => {
      await render(ProtectedRoute, {
        props: {
          requiredPermissions: [
            permissionsConstants.CAN_MANAGE_ABOUT_US,
            permissionsConstants.CAN_MANAGE_COMMENTS,
            permissionsConstants.CAN_MANAGE_FAQS,
          ],
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(pageComponentText).toBeInTheDocument();
    });
  });

  describe('requiredSubscriptions', () => {
    it('should not render PageComponent component if user do not have required subscription', async () => {
      const { mockedImplementation, spyOnUseRouter } = useRouterSpyOn();

      await render(ProtectedRoute, {
        props: {
          requiredSubscriptions: ['PREMIUM'],
          redirect: routesConstants.FAQS.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(mockedImplementation.history.replace).toBeCalledTimes(1);
      expect(mockedImplementation.history.replace).toBeCalledWith(routesConstants.FAQS.ROOT);

      expect(pageComponentText).not.toBeInTheDocument();

      spyOnUseRouter.mockRestore();
    });

    it('should render PaywallComponent component if user do not have required subscription - as function', async () => {
      setUserInfo({ subscription: 'FREE' });

      const requiredSubscriptions = jest.fn(
        (permissions) => permissions.subscription === 'PREMIUM',
      );

      await render(ProtectedRoute, {
        props: {
          requiredSubscriptions,
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
          paywallComponent: PaywallComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');
      const paywallComponentText = screen.queryByText('Paywall Component');

      expect(requiredSubscriptions).toBeCalledTimes(1);
      expect(requiredSubscriptions).toBeCalledWith(expect.objectContaining({
        subscription: 'FREE',
      }));

      expect(pageComponentText).not.toBeInTheDocument();
      expect(paywallComponentText).toBeInTheDocument();
    });

    it('should render PaywallComponent component if user do not have required subscription but we pass accessDeniedComponent', async () => {
      await render(ProtectedRoute, {
        props: {
          requiredSubscriptions: ['PREMIUM'],
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
          paywallComponent: PaywallComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');
      const paywallComponentText = screen.queryByText('Paywall Component');

      expect(pageComponentText).not.toBeInTheDocument();
      expect(paywallComponentText).toBeInTheDocument();
    });

    it('should render PageComponent component if user have one of the required subscription', async () => {
      await render(ProtectedRoute, {
        props: {
          requiredSubscriptions: ['PREMIUM', 'FREE'],
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(pageComponentText).toBeInTheDocument();
    });

    it('should render PageComponent component if user have required subscription', async () => {
      await render(ProtectedRoute, {
        props: {
          requiredSubscriptions: ['FREE'],
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(pageComponentText).toBeInTheDocument();
    });

    it('should render PageComponent component if user have required subscription - as function', async () => {
      const requiredSubscriptions = jest.fn(
        (permissions) => permissions.subscription === 'FREE',
      );

      await render(ProtectedRoute, {
        props: {
          requiredSubscriptions,
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(requiredSubscriptions).toBeCalledTimes(1);
      expect(requiredSubscriptions).toBeCalledWith(expect.objectContaining({ subscription: 'FREE' }));

      expect(pageComponentText).toBeInTheDocument();
    });

    it('should render PageComponent component and when we logout user then should redirect to "/docs"', async () => {
      const { mockedImplementation, spyOnUseRouter } = useRouterSpyOn();

      const { rerender } = await render(ProtectedRoute, {
        props: {
          requiredSubscriptions: jest.fn(
            (permissions) => permissions.subscription === 'FREE',
          ),
          redirect: routesConstants.DOCS.ROOT,
          pageComponent: PageComponent,
        },
      });

      let pageComponentText = screen.queryByText('Page Component');

      expect(pageComponentText).toBeInTheDocument();

      setUserInfo({ subscription: 'PREMIUM' });

      await rerender({
        requiredSubscriptions: jest.fn(
          (permissions) => permissions.subscription === 'FREE',
        ),
        redirect: routesConstants.DOCS.ROOT,
        pageComponent: PageComponent,
      });

      pageComponentText = screen.queryByText('Page Component');

      expect(mockedImplementation.history.replace).toBeCalledTimes(1);
      expect(mockedImplementation.history.replace).toBeCalledWith(routesConstants.DOCS.ROOT);

      expect(pageComponentText).not.toBeInTheDocument();

      setUserInfo({ subscription: 'FREE' });

      await rerender({
        requiredSubscriptions: jest.fn(
          (permissions) => permissions.subscription === 'FREE',
        ),
        redirect: routesConstants.DOCS.ROOT,
        pageComponent: PageComponent,
      });

      pageComponentText = screen.queryByText('Page Component');

      expect(pageComponentText).toBeInTheDocument();

      setUserInfo(null);

      await rerender({
        requiredSubscriptions: jest.fn(
          (permissions) => permissions.subscription === 'FREE',
        ),
        redirect: routesConstants.DOCS.ROOT,
        pageComponent: PageComponent,
      });

      pageComponentText = screen.queryByText('Page Component');

      expect(mockedImplementation.history.replace).toBeCalledTimes(2);
      expect(mockedImplementation.history.replace).toBeCalledWith(routesConstants.DOCS.ROOT);

      expect(pageComponentText).not.toBeInTheDocument();

      spyOnUseRouter.mockRestore();
    });
  });
});
