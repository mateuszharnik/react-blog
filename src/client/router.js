import React, { memo } from 'react';
import Loadable from 'react-loadable';
import { Routes, Route } from 'react-router-dom';
import LazyComponentError from '@client/components/LazyComponentError';
import Spinner from '@client/components/Spinner';

const Main = Loadable({
  loader: () => import(/* webpackChunkName: 'main' */ '@client/views/Webpage/Main'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <Spinner />),
});

const SignIn = Loadable({
  loader: () => import(/* webpackChunkName: 'sign-in' */ '@client/views/Auth/SignIn'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <Spinner />),
});

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: 'not-found' */ '@client/views/NotFound'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <Spinner />),
});

const Home = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ '@client/views/Webpage/Home'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <Spinner />),
});

const About = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ '@client/views/Webpage/About'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <Spinner />),
});

const Contact = Loadable({
  loader: () => import(/* webpackChunkName: 'contact' */ '@client/views/Webpage/Contact'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <Spinner />),
});

const FAQs = Loadable({
  loader: () => import(/* webpackChunkName: 'faqs' */ '@client/views/Webpage/FAQs'),
  loading: ({ error }) => (error ? <LazyComponentError /> : <Spinner />),
});

const Router = memo(() => (
  <Routes>
    <Route path="/" element={<Main />}>
      <Route index element={<Home />} />
      <Route path="o-nas" element={<About />} />
      <Route path="kontakt" element={<Contact />} />
      <Route path="najczesciej-zadawane-pytania" element={<FAQs />} />
    </Route>
    <Route path="zaloguj" element={<SignIn />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
));

export default Router;
