import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';
import { Link } from '@client/router/components';
import { getWindowInnerHeight } from '@client/utils/sizesUtils';
import { testsConstants, routesConstants } from '@shared/constants';
import Heading from '@client/components/Heading';

const PATH = 'home.banner';

const WelcomeBanner = memo(() => {
  const { t } = useTranslation();

  const height = useMemo(() => `${getWindowInnerHeight() - 84}px`, []);

  return (
    <div
      data-testid={testsConstants.WELCOME_BANNER}
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
          <Heading
            as="h2"
            className="display-1 fw-bolder text-uppercase mb-0"
          >
            <div>
              <span className="welcome-banner__title d-block d-lg-inline">
                {t(`${PATH}.HEADER_FIRST_HALF`)}
              </span>{' '}
              <span className="welcome-banner__title d-block d-lg-inline">
                {t(`${PATH}.HEADER_SECOND_HALF`)}
              </span>
            </div>
          </Heading>
        </header>
        <p
          className="welcome-banner__text mx-auto mb-4 mb-lg-5"
          data-aos="fade"
          data-aos-offset="-99999"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          {t(`${PATH}.DESCRIPTION`)}
        </p>
        <div
          data-aos="fade"
          data-aos-offset="-99999"
          data-aos-duration="1000"
          data-aos-delay="900"
        >
          <Link
            to={routesConstants.POSTS.ROOT}
            className="btn btn-primary rounded-pill px-4"
            title={t(`${PATH}.BUTTON_TITLE`)}
          >
            {t(`${PATH}.BUTTON_TEXT`)}
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
