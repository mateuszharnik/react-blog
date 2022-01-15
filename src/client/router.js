import React, { memo } from 'react';
import Loadable from 'react-loadable';
import { Routes, Route } from 'react-router-dom';
import LazyComponentError from '@client/components/LazyComponent/LazyComponentError';
import LazyComponentSpinner from '@client/components/LazyComponent/LazyComponentSpinner';

const Main = Loadable({
  loader: () => import(/* webpackChunkName: 'main' */ '@client/views/Webpage/Main'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const SignIn = Loadable({
  loader: () => import(/* webpackChunkName: 'sign-in' */ '@client/views/Auth/SignIn'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: 'not-found' */ '@client/views/NotFound'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const Home = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ '@client/views/Webpage/Home'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const About = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ '@client/views/Webpage/About'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const Contact = Loadable({
  loader: () => import(/* webpackChunkName: 'contact' */ '@client/views/Webpage/Contact'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <LazyComponentSpinner />),
});

const FAQs = Loadable({
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
