import React, { lazy, memo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import Main from '@client/views/Webpage/Main';
import SuspenseComponent from '@client/components/SuspenseComponent';

const Home = lazy(() => import(/* webpackChunkName: 'home' */ '@client/views/Webpage/Home'));
const About = lazy(() => import(/* webpackChunkName: 'about' */ '@client/views/Webpage/About'));
const Contact = lazy(() => import(/* webpackChunkName: 'contact' */ '@client/views/Webpage/Contact'));
const FAQs = lazy(() => import(/* webpackChunkName: 'faqs' */ '@client/views/Webpage/FAQs'));
const SignIn = lazy(() => import(/* webpackChunkName: 'sign-in' */ '@client/views/Auth/SignIn'));
const NotFound = lazy(() => import(/* webpackChunkName: 'not-found' */ '@client/views/NotFound'));

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
      <Routes>
        <Route path="/" element={<Main />}>
          <Route
            index
            element={(
              <SuspenseComponent>
                <Home />
              </SuspenseComponent>
            )}
          />
          <Route
            path="o-nas"
            element={(
              <SuspenseComponent>
                <About />
              </SuspenseComponent>
            )}
          />
          <Route
            path="kontakt"
            element={(
              <SuspenseComponent>
                <Contact />
              </SuspenseComponent>
            )}
          />
          <Route
            path="najczesciej-zadawane-pytania"
            element={(
              <SuspenseComponent>
                <FAQs />
              </SuspenseComponent>
            )}
          />
        </Route>
        <Route
          path="zaloguj"
          element={(
            <SuspenseComponent>
              <SignIn />
            </SuspenseComponent>
          )}
        />
        <Route
          path="*"
          element={(
            <SuspenseComponent>
              <NotFound />
            </SuspenseComponent>
          )}
        />
      </Routes>
    </div>
  );
});

export default App;
