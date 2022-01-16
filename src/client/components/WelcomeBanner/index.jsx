import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';
import MaxViewHeight from '@client/components/MaxViewHeight';

const WelcomeBanner = memo(() => (
  <MaxViewHeight className="welcome-banner d-flex justify-content-center align-items-center">
    <div className="container text-white text-center">
      <header className="welcome-banner__header mb-5">
        <h2 className="display-1 fw-bolder text-uppercase mb-0">
          <div>
            <span className="welcome-banner__title d-block d-lg-inline">Blog o</span> {' '}
            <span className="welcome-banner__title d-block d-lg-inline">kodowaniu</span>
          </div>
        </h2>
      </header>
      <p className="welcome-banner__text mx-auto mb-4">
        Witaj 👋🏼 Jesteś tutaj ponieważ szukasz informacji o tworzeniu stron internetowych. Może
        żaden ze mnie ekspert, ale kilka rzeczy potrafię. Tak więc śmiało rozejrzyj się, może
        znajdziesz coś przydatnego.
      </p>
      <Link
        to="/posty"
        className="btn btn-outline-primary btn-lg rounded-pill"
        title="Przejdź do wszystkich wpisów"
      >
        Przejdź do blog
      </Link>
    </div>
    <div className="welcome-banner-arrow text-muted">
      <div className="welcome-banner-arrow__icon d-flex justify-content-center align-items-center">
        <FontAwesomeIcon icon={faAngleDoubleDown} />
      </div>
    </div>
  </MaxViewHeight>
));

WelcomeBanner.displayName = 'WelcomeBanner';

export default WelcomeBanner;
