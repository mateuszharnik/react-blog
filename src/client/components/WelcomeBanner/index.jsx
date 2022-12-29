import React, { memo, useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';
import testIds from '@shared/testIds';
import getWindowInnerHeight from '@client/helpers/getWindowInnerHeight';

const WelcomeBanner = memo(() => {
  const { t } = useTranslation();

  const height = useMemo(() => `${getWindowInnerHeight() - 84}px`, []);

  return (
    <div
      data-testid={testIds.WelcomeBanner}
      className="welcome-banner d-flex flex-wrap justify-content-center align-items-center"
      style={{ height }}
    >
      <div className="container text-white text-center">
        <header
          className="welcome-banner__header mb-5"
          data-aos="fade-down"
          data-aos-offset="-99999"
          data-aos-duration="1000"
          data-aos-delay="100"
        >
          <h2 className="display-1 fw-bolder text-uppercase mb-0">
            <div>
              <Trans
                i18nKey="home.banner.HEADER"
                components={{ span: <span className="welcome-banner__title d-block d-lg-inline" /> }}
              />
            </div>
          </h2>
        </header>
        <p
          className="welcome-banner__text mx-auto mb-4 mb-lg-5"
          data-aos="fade"
          data-aos-offset="-99999"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          {t('home.banner.DESCRIPTION')}
        </p>
        <div
          data-aos="fade"
          data-aos-offset="-99999"
          data-aos-duration="1000"
          data-aos-delay="900"
        >
          <Link
            to="/posty"
            className="btn btn-primary rounded-pill px-4"
            title="Przejdź do wszystkich wpisów"
          >
            Przejdź do bloga
          </Link>
        </div>
      </div>
      <div
        className="welcome-banner-arrow text-muted"
        data-aos="fade"
        data-aos-offset="-99999"
        data-aos-duration="1000"
        data-aos-delay="1300"
      >
        <div className="welcome-banner-arrow__icon d-flex justify-content-center align-items-center">
          <FontAwesomeIcon icon={faAngleDoubleDown} />
        </div>
      </div>
    </div>
  );
});

WelcomeBanner.displayName = 'WelcomeBanner';

export default WelcomeBanner;
