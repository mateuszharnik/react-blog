import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import lazyLoad from '@client/helpers/lazyLoad';
import LazyComponentError from '@client/components/LazyLoading/LazyComponentError';
import LazyComponentSpinner from '@client/components/LazyLoading/LazyComponentSpinner';

const Main = lazyLoad({
  loader: () => import(/* webpackChunkName: 'main' */ '@client/views/Webpage/Main'),
});

const SignIn = lazyLoad({
  loader: () => import(/* webpackChunkName: 'sign-in' */ '@client/views/Auth/SignIn'),
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
