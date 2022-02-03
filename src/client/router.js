import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import LazyComponentError from '@client/components/LazyLoading/LazyComponentError';
import LazyComponentSpinner from '@client/components/LazyLoading/LazyComponentSpinner';
import lazyLoadView from '@client/helpers/lazyLoadView';

const Main = lazyLoadView({
  loader: () => import(/* webpackChunkName: 'main' */ '@client/views/Webpage/Main'),
});

const SignIn = lazyLoadView({
  loader: () => import(/* webpackChunkName: 'sign-in' */ '@client/views/Auth/SignIn'),
});

const NotFound = lazyLoadView({
  loader: () => import(/* webpackChunkName: 'not-found' */ '@client/views/NotFound'),
});

const Home = lazyLoadView({
  loader: () => import(/* webpackChunkName: 'home' */ '@client/views/Webpage/Home'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const About = lazyLoadView({
  loader: () => import(/* webpackChunkName: 'about' */ '@client/views/Webpage/About'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const Contact = lazyLoadView({
  loader: () => import(/* webpackChunkName: 'contact' */ '@client/views/Webpage/Contact'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const FAQs = lazyLoadView({
  loader: () => import(/* webpackChunkName: 'faqs' */ '@client/views/Webpage/FAQs'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const Router = memo(() => (
  <Routes>
    <Route path="/" element={<Main />}>
      <Route index element={<Home />} />
      <Route path="o-blogu" element={<About />} />
      <Route path="kontakt" element={<Contact />} />
      <Route path="najczesciej-zadawane-pytania" element={<FAQs />} />
    </Route>
    <Route path="zaloguj" element={<SignIn />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
));

Router.displayName = 'Router';

export default Router;
