import React from 'react';
import { Navigate } from 'react-router-dom';
import store from '@client/store/index.store';

export const canManage = (role = '', redirect = '') => (children = null) => {
  const user = store.getState().user?.user;

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user?.role?.type !== 'USER' && user?.role?.[role]) {
    return children;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const path = user?.role?.type === 'USER' ? '/profil' : '/admin';

  return <Navigate to={path} />;
};

export const isAdmin = (redirect = '/') => (children = null) => {
  const user = store.getState().user?.user;

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user?.role?.type === 'USER') {
    return <Navigate to={redirect} />;
  }

  return children;
};

export const isNotAdmin = (redirect = '/') => (children = null) => {
  const user = store.getState().user?.user;

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user?.role?.type === 'USER') {
    return children;
  }

  return <Navigate to={redirect} />;
};

export const isNotLoggedIn = (children = null) => {
  const user = store.getState().user?.user;

  if (user) {
    return <Navigate to={user?.role?.type === 'USER' ? '/profil' : '/admin'} />;
  }

  return children;
};
