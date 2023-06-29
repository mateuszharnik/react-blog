import { memo, useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';
import { getWindowInnerHeight } from '@client/utils/sizesUtils';
import { testsConstants, routesConstants } from '@shared/constants';
import Link from '@client/router/components/Link';
import Heading from '@client/components/Typography/Heading';
import Text from '@client/components/Typography/Text';
import Box from '@client/components/Box';

const PATH = 'home.banner';

const WelcomeBanner = memo(() => {
  const { t } = useTranslation();

  const height = useMemo(() => `${getWindowInnerHeight() - 84}px`, []);

  return (
    <Box
      data-testid={testsConstants.WELCOME_BANNER}
      className="welcome-banner d-flex flex-wrap justify-content-center align-items-center"
      style={{ height }}
    >
      <Box className="container text-white text-center">
        <Box
          as="header"
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
            <Box>
              <Trans
                i18nKey={`${PATH}.HEADER`}
                components={{
                  span: <Box
                    as="span"
                    className="welcome-banner__title d-block d-lg-inline"
                  />,
                }}
              />
            </Box>
          </Heading>
        </Box>
        <Text
          className="welcome-banner__text mx-auto mb-4 mb-lg-5"
          data-aos="fade"
          data-aos-offset="-99999"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          {t(`${PATH}.DESCRIPTION`)}
        </Text>
        <Box
          data-aos="fade"
          data-aos-offset="-99999"
          data-aos-duration="1000"
          data-aos-delay="900"
        >
          <Link
            to={routesConstants.POSTS.ROOT}
            title={t(`${PATH}.BUTTON_TITLE`)}
            className="btn btn-primary rounded-pill px-4"
          >
            {t(`${PATH}.BUTTON_TEXT`)}
          </Link>
        </Box>
      </Box>
      <Box
        className="welcome-banner-arrow text-muted"
        data-aos="fade"
        data-aos-offset="-99999"
        data-aos-duration="1000"
        data-aos-delay="1300"
      >
        <Box className="welcome-banner-arrow__icon d-flex justify-content-center align-items-center">
          <FontAwesomeIcon icon={faAngleDoubleDown} />
        </Box>
      </Box>
    </Box>
  );
});

WelcomeBanner.displayName = 'WelcomeBanner';

export default WelcomeBanner;
