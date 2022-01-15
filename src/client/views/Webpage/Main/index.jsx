import React, { memo, useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Loadable from 'react-loadable';
import Header from '@client/components/NavBar/Header';
import logo from '@client/assets/images/logo-dark.svg';

const SkipNavLink = Loadable({
  loader: () => import(/* webpackChunkName: 'skip-nav-link' */ '@client/components/SkipNavLink'),
  loading: () => null,
});

const Main = memo(() => {
  const [message, setMessage] = useState('');
  const mainRef = useRef(null);

  const handleClick = async () => {
    try {
      const { default: axios } = await import(/* webpackChunkName: 'axios' */ 'axios');

      const { data } = await axios('/api');

      setMessage(data.message);
    } catch (error) {
      setMessage('Wystąpił błąd.');
    }
  };

  return (
    <>
      <SkipNavLink target={mainRef} />
      <Header />
      <main id="tresc" ref={mainRef} className="main container text-center mt-3">
        <img src={logo} width="100" height="55" className="img-fluid" alt="Logo strony" />
        <h2 className="mt-3 mb-5">Naciśnij przycisk, żeby wyświetlić wiadomość.</h2>
        <button
          type="button"
          className="btn btn-primary rounded-pill"
          title="Pokaż"
          onClick={handleClick}
        >
          Pokaż wiadomość
        </button>
        {message && <p className="mt-3">{message}</p>}
        <div className="mt-3">
          <Outlet />
        </div>
      </main>
    </>
  );
});

Main.displayName = 'Main';

export default Main;
