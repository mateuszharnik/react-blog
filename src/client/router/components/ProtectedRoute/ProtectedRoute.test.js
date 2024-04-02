import { useStoreState } from 'easy-peasy';
import { render, screen } from '@client/utils/testUtils';
import { useRouterSpyOn } from '@client/utils/testUtils/spyOn/useRouterSpyOn';
import { rolesConstants, routesConstants, permissionsConstants } from '@shared/constants';
import ProtectedRoute from './index';

jest.mock('easy-peasy', () => ({
  ...jest.requireActual('easy-peasy'),
  useStoreState: jest.fn(),
}));

const PageComponent = () => <div>Page Component</div>;

const AccessDeniedComponent = () => <div>Access Denied Component</div>;

const PaywallComponent = () => <div>Paywall Component</div>;

const setUserInfo = (permissions = {}) => {
  useStoreState.mockReturnValue(permissions === null ? {} : {
    permissions: {
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
      ...permissions,
    },
  });
};

describe('ProtectedRoute', () => {
  beforeAll(() => {
    setUserInfo();
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

      expect(pageComponentText).not.toBeInTheDocument();
      expect(mockedImplementation.history.replace).toBeCalledTimes(1);
      expect(mockedImplementation.history.replace).toBeCalledWith(routesConstants.DOCS.ROOT);

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

      expect(pageComponentText).not.toBeInTheDocument();
      expect(mockedImplementation.history.replace).toBeCalledTimes(1);
      expect(mockedImplementation.history.replace).toBeCalledWith(routesConstants.ABOUT.ROOT);

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

      expect(pageComponentText).not.toBeInTheDocument();
      expect(mockedImplementation.history.replace).toBeCalledTimes(1);
      expect(mockedImplementation.history.replace).toBeCalledWith(routesConstants.ADMIN.ROOT);

      spyOnUseRouter.mockRestore();
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

      expect(pageComponentText).not.toBeInTheDocument();
      expect(mockedImplementation.history.replace).toBeCalledTimes(1);
      expect(mockedImplementation.history.replace).toBeCalledWith(routesConstants.PROFILE.ROOT);

      spyOnUseRouter.mockRestore();
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
  });

  describe('requiredCondition', () => {
    it('should not render PageComponent component if user do not have required condition', async () => {
      const { mockedImplementation, spyOnUseRouter } = useRouterSpyOn();

      await render(ProtectedRoute, {
        props: {
          requiredCondition: () => false,
          redirect: routesConstants.POSTS.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(pageComponentText).not.toBeInTheDocument();
      expect(mockedImplementation.history.replace).toBeCalledTimes(1);
      expect(mockedImplementation.history.replace).toBeCalledWith(routesConstants.POSTS.ROOT);

      spyOnUseRouter.mockRestore();
    });

    it('should render AccessDeniedComponent component if user do not have required condition but we pass accessDeniedComponent', async () => {
      await render(ProtectedRoute, {
        props: {
          requiredCondition: () => false,
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

    it('should render PageComponent component if user have required condition', async () => {
      setUserInfo();

      const requiredCondition = jest.fn((permissions) => permissions.can_manage_posts);

      await render(ProtectedRoute, {
        props: {
          requiredCondition,
          redirect: routesConstants.ABOUT.ROOT,
          pageComponent: PageComponent,
        },
      });

      const pageComponentText = screen.queryByText('Page Component');

      expect(requiredCondition).toBeCalledTimes(1);
      expect(requiredCondition).toBeCalledWith({
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
      });
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

      expect(pageComponentText).not.toBeInTheDocument();
      expect(mockedImplementation.history.replace).toBeCalledTimes(1);
      expect(mockedImplementation.history.replace).toBeCalledWith(routesConstants.FAQS.ROOT);

      spyOnUseRouter.mockRestore();
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

    it('should render PageComponent component if user have required subscription', async () => {
      setUserInfo({ subscription: 'FREE' });

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
  });
});
