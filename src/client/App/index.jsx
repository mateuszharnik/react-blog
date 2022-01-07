import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import Router from '@client/router.js';

const App = memo(() => {
  const message = useStoreState(({ app }) => app.message);

  return (
    <div>
      {message && <div>{message}</div>}
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
      <Router />
    </div>
  );
});

export default App;
