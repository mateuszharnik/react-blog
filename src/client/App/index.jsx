import React, { memo, useState } from 'react';
import logo from '@client/assets/images/logo-dark.svg';

const App = memo(() => {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setMessage('Hello World');
  };

  return (
    <div className="container text-center mt-5">
      <img src={logo} width="100px" height="55px" className="img-fluid" alt="Logo strony" />
      <h2 className="mt-5 mb-10">Naciśnij przycisk, żeby wyświetlić wiadomość.</h2>
      <button type="button" className="btn btn-primary rounded-pill" title="Pokaż" onClick={handleClick}>
        Pokaż wiadomość
      </button>
      {message && <p className="mt-6">{message}</p>}
    </div>
  );
});

export default App;
