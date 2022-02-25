import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import lazyLoad from '@client/helpers/lazyLoad';
import LazyComponentError from '@client/components/LazyLoading/LazyComponentError';
import LazyComponentSpinner from '@client/components/LazyLoading/LazyComponentSpinner';

const Webpage = lazyLoad({
  loader: () => import(/* webpackChunkName: 'webpage-main' */ '@client/views/Webpage/Main'),
});

const Admin = lazyLoad({
  loader: () => import(/* webpackChunkName: 'admin-main' */ '@client/views/Admin/Main'),
});

const SignIn = lazyLoad({
  loader: () => import(/* webpackChunkName: 'sign-in' */ '@client/views/Auth/SignIn'),
});

const SignUp = lazyLoad({
  loader: () => import(/* webpackChunkName: 'sign-up' */ '@client/views/Auth/SignUp'),
});

const NotFound = lazyLoad({
  loader: () => import(/* webpackChunkName: 'not-found' */ '@client/views/NotFound'),
});

const Home = lazyLoad({
  loader: () => import(/* webpackChunkName: 'home' */ '@client/views/Webpage/Home'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const About = lazyLoad({
  loader: () => import(/* webpackChunkName: 'about' */ '@client/views/Webpage/About'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const Contact = lazyLoad({
  loader: () => import(/* webpackChunkName: 'contact' */ '@client/views/Webpage/Contact'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const FAQs = lazyLoad({
  loader: () => import(/* webpackChunkName: 'faqs' */ '@client/views/Webpage/FAQs'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const Posts = lazyLoad({
  loader: () => import(/* webpackChunkName: 'posts' */ '@client/views/Webpage/Posts'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const Profile = lazyLoad({
  loader: () => import(/* webpackChunkName: 'profile' */ '@client/views/Webpage/Profile'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const Settings = lazyLoad({
  loader: () => import(/* webpackChunkName: 'settings' */ '@client/views/Webpage/Settings'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const Dashboard = lazyLoad({
  loader: () => import(/* webpackChunkName: 'dashboard' */ '@client/views/Admin/Dashboard'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const Router = memo(() => (
  <Routes>
    <Route path="/" element={<Webpage />}>
      <Route index element={<Home />} />
      <Route path="o-blogu" element={<About />} />
      <Route path="kontakt" element={<Contact />} />
      <Route path="posty" element={<Posts />} />
      <Route path="najczesciej-zadawane-pytania" element={<FAQs />} />
      <Route path="profil" element={<Profile />} />
      <Route path="profil/ustawienia" element={<Settings />} />
    </Route>
    <Route path="/admin" element={<Admin />}>
      <Route index element={<Dashboard />} />
    </Route>
    <Route path="/zaloguj" element={<SignIn />} />
    <Route path="/rejestracja" element={<SignUp />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
));

Router.displayName = 'Router';

export default Router;
