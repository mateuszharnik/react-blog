import { memo } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { adminsRoles, userProfileRoles, editAboutPermissions } from '@client/configs/routerConfig';
import { routesConstants } from '@shared/constants';
import Webpage from '@client/views/Webpage';
import Home from '@client/views/Webpage/pages/Home';
import About from '@client/views/Webpage/pages/About';
import EditAbout from '@client/views/Webpage/pages/EditAbout';
import Contact from '@client/views/Webpage/pages/Contact';
import FAQs from '@client/views/Webpage/pages/FAQs';
import Posts from '@client/views/Webpage/pages/Posts';
import Profile from '@client/views/Webpage/pages/Profile';
import Settings from '@client/views/Webpage/pages/Profile/pages/Settings';
import ProfileDashboard from '@client/views/Webpage/pages/Profile/pages/Dashboard';
import Admin from '@client/views/Admin';
import AdminDashboard from '@client/views/Admin/pages/Dashboard';
import AdminSignIn from '@client/views/Auth/AdminSignIn';
import SignIn from '@client/views/Auth/SignIn';
import SignUp from '@client/views/Auth/SignUp';
import SignOut from '@client/views/Auth/SignOut';
import Docs from '@client/views/Docs';
import NotFound from '@client/views/NotFound';
import ProtectedRoute from '@client/router/components/ProtectedRoute';
import DocsRoute from '@client/router/components/DocsRoute';
import Redirect from '@client/router/components/Redirect';

const Router = memo(() => (
  <Routes>
    <Route
      path={routesConstants.ROOT}
      element={<Webpage />}
    >
      <Route
        index
        element={<Home />}
      />
      <Route
        path={routesConstants.POSTS.ROOT}
        element={<Posts />}
      />
      <Route
        path={routesConstants.ABOUT.ROOT}
        element={<Outlet />}
      >
        <Route
          index
          element={<About />}
        />
        <Route
          path={routesConstants.ABOUT.EDIT.ROOT}
          element={(
            <ProtectedRoute
              key="EditAbout"
              pageComponent={EditAbout}
              requiredPermissions={editAboutPermissions}
            />
          )}
        />
      </Route>
      <Route
        path={routesConstants.CONTACT.ROOT}
        element={<Contact />}
      />
      <Route
        path={routesConstants.FAQS.ROOT}
        element={<FAQs />}
      />
      <Route
        path={routesConstants.PROFILE.ROOT}
        element={(
          <ProtectedRoute
            key="Profile"
            pageComponent={Profile}
            requiredRoles={userProfileRoles}
          />
        )}
      >
        <Route
          index
          element={(
            <Redirect
              to={routesConstants.PROFILE.DASHBOARD.ROOT}
            />
          )}
        />
        <Route
          path={routesConstants.PROFILE.DASHBOARD.ROOT}
          element={<ProfileDashboard />}
        />
        <Route
          path={routesConstants.PROFILE.SETTINGS.ROOT}
          element={<Settings />}
        />
      </Route>
    </Route>
    <Route
      path={routesConstants.ADMIN.ROOT}
      element={(
        <ProtectedRoute
          key="Admin"
          pageComponent={Admin}
          requiredRoles={adminsRoles}
        />
      )}
    >
      <Route
        index
        element={<AdminDashboard />}
      />
    </Route>
    <Route
      path={routesConstants.AUTH.SIGN_IN.ROOT}
      element={(
        <ProtectedRoute
          key="SignIn"
          pageComponent={SignIn}
          shouldBeAuthenticated={false}
        />
      )}
    />
    <Route
      path={routesConstants.AUTH.SIGN_IN.ADMIN.ROOT}
      element={(
        <ProtectedRoute
          key="AdminSignIn"
          pageComponent={AdminSignIn}
          shouldBeAuthenticated={false}
        />
      )}
    />
    <Route
      path={routesConstants.AUTH.SIGN_UP.ROOT}
      element={(
        <ProtectedRoute
          key="SignUp"
          pageComponent={SignUp}
          shouldBeAuthenticated={false}
        />
      )}
    />
    <Route
      path={routesConstants.AUTH.SIGN_OUT.ROOT}
      element={(
        <ProtectedRoute
          key="SignOut"
          pageComponent={SignOut}
        />
      )}
    />
    <Route
      path={routesConstants.DOCS.ROOT}
      element={<DocsRoute />}
    >
      <Route
        index
        element={<Docs />}
      />
    </Route>
    <Route
      path={routesConstants.NOT_FOUND}
      element={<NotFound />}
    />
  </Routes>
));

Router.displayName = 'Router';

export default Router;
