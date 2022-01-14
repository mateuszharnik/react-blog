import React, { memo, useState, useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import SkipNavLink from '@client/components/SkipNavLink';
import logo from '@client/assets/images/logo-dark.svg';

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
      <nav>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Strona główna
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/o-nas">
              O nas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/kontakt">
              Kontakt
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/najczesciej-zadawane-pytania">
              FAQ
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/zaloguj">
              Logowanie
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/404">
              404
            </Link>
          </li>
        </ul>
      </nav>
      <main id="tresc" ref={mainRef} className="app-main container text-center mt-3">
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
