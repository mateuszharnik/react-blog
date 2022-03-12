import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { isAdmin, isNotAdmin, isNotLoggedIn } from '@client/helpers/guards';
import lazyLoad from '@client/helpers/lazyLoad';
import ProtectedRoute from '@client/components/ProtectedRoute';
import LazyComponentError from '@client/components/LazyLoading/LazyComponentError';
import LazyComponentSpinner from '@client/components/LazyLoading/LazyComponentSpinner';

const Website = lazyLoad({
  loader: () => import(/* webpackChunkName: 'website-main' */ '@client/views/Webpage/Main'),
});

const Admin = lazyLoad({
  loader: () => import(/* webpackChunkName: 'admin-main' */ '@client/views/Admin/Main'),
});

const Docs = lazyLoad({
  loader: () => import(/* webpackChunkName: 'docs-main' */ '@client/views/Docs/Main'),
});

const AdminSignIn = lazyLoad({
  loader: () => import(/* webpackChunkName: 'admin-sign-in' */ '@client/views/Auth/AdminSignIn'),
});

const SignIn = lazyLoad({
  loader: () => import(/* webpackChunkName: 'sign-in' */ '@client/views/Auth/SignIn'),
});

const SignUp = lazyLoad({
  loader: () => import(/* webpackChunkName: 'sign-up' */ '@client/views/Auth/SignUp'),
});

const DocsSignIn = lazyLoad({
  loader: () => import(/* webpackChunkName: 'docs-sign-in' */ '@client/views/Docs/SignIn'),
});

const NotFound = lazyLoad({
  loader: () => import(/* webpackChunkName: 'not-found' */ '@client/views/NotFound'),
});

const Home = lazyLoad({
  loader: () => import(/* webpackChunkName: 'home' */ '@client/views/Webpage/Home'),
  loading: LazyComponentSpinner,
  error: LazyComponentError,
});

const About = lazyLoad({
  loader: () => import(/* webpackChunkName: 'about' */ '@client/views/Webpage/About'),
  loading: LazyComponentSpinner,
  error: LazyComponentError,
});

const FAQs = lazyLoad({
  loader: () => import(/* webpackChunkName: 'faqs' */ '@client/views/Webpage/FAQs'),
  loading: LazyComponentSpinner,
  error: LazyComponentError,
});

const Posts = lazyLoad({
  loader: () => import(/* webpackChunkName: 'posts' */ '@client/views/Webpage/Posts'),
  loading: LazyComponentSpinner,
  error: LazyComponentError,
});

const Contact = lazyLoad({
  loader: () => import(/* webpackChunkName: 'contact' */ '@client/views/Webpage/Contact'),
  loading: LazyComponentSpinner,
  error: LazyComponentError,
});

const Profile = lazyLoad({
  loader: () => import(/* webpackChunkName: 'profile' */ '@client/views/Webpage/Profile'),
  loading: LazyComponentSpinner,
  error: LazyComponentError,
});

const Settings = lazyLoad({
  loader: () => import(/* webpackChunkName: 'settings' */ '@client/views/Webpage/Settings'),
  loading: LazyComponentSpinner,
  error: LazyComponentError,
});

const Dashboard = lazyLoad({
  loader: () => import(/* webpackChunkName: 'dashboard' */ '@client/views/Admin/Dashboard'),
  loading: LazyComponentSpinner,
  error: LazyComponentError,
});

const Router = memo(() => (
  <Routes>
    <Route
      path="/"
      element={<Website />}
    >
      <Route
        index
        element={<Home />}
      />
      <Route
        path="posty"
        element={<Posts />}
      />
      <Route
        path="o-blogu"
        element={<About />}
      />
      <Route
        path="kontakt"
        element={<Contact />}
      />
      <Route
        path="najczesciej-zadawane-pytania"
        element={<FAQs />}
      />
      <Route
        path="profil"
        element={<ProtectedRoute beforeEnter={isNotAdmin()}><Profile /></ProtectedRoute>}
      />
      <Route
        path="profil/ustawienia"
        element={<ProtectedRoute beforeEnter={isNotAdmin()}><Settings /></ProtectedRoute>}
      />
    </Route>
    <Route
      path="/admin"
      element={<ProtectedRoute beforeEnter={isAdmin()}><Admin /></ProtectedRoute>}
    >
      <Route
        index
        element={<ProtectedRoute beforeEnter={isAdmin()}><Dashboard /></ProtectedRoute>}
      />
    </Route>
    <Route
      path="/zaloguj"
      element={<ProtectedRoute beforeEnter={isNotLoggedIn}><SignIn /></ProtectedRoute>}
    />
    <Route
      path="/zaloguj/admin"
      element={<ProtectedRoute beforeEnter={isNotLoggedIn}><AdminSignIn /></ProtectedRoute>}
    />
    <Route
      path="/rejestracja"
      element={<ProtectedRoute beforeEnter={isNotLoggedIn}><SignUp /></ProtectedRoute>}
    />
    <Route
      path="/dokumentacja"
      element={<Docs><DocsSignIn /></Docs>}
    />
    <Route
      path="*"
      element={<NotFound />}
    />
  </Routes>
));

Router.displayName = 'Router';

export default Router;
