import React, { memo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import logo from '@client/assets/images/logo-dark.svg';

const Main = memo(() => {
  const [message, setMessage] = useState('');

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
    <div className="container text-center mt-5">
      <img src={logo} width="100" height="55" className="img-fluid" alt="Logo strony" />
      <h2 className="mt-5 mb-10">Naciśnij przycisk, żeby wyświetlić wiadomość.</h2>
      <button
        type="button"
        className="btn btn-primary rounded-pill"
        title="Pokaż"
        onClick={handleClick}
      >
        Pokaż wiadomość
      </button>
      {message && <p className="mt-5">{message}</p>}
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
});

export default Main;
