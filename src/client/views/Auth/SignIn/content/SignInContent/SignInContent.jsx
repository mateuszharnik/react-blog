import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { useLayerContext } from '@client/context/LayerContext';
import { routesConstants } from '@shared/constants';
import Link from '@client/router/components/Link';
import AuthWrapper from '@client/layouts/AuthWrapper';
import AuthContainer from '@client/layouts/AuthContainer';
import SignInForm from '@client/forms/SignInForm';
import Heading from '@client/components/Typography/Heading';
import Text from '@client/components/Typography/Text';
import Box from '@client/components/Box';

const PATH = 'auth';

const SignInContent = memo(() => {
  const { t } = useTranslation();
  const { hideLayer } = useLayerContext();

  useEffect(() => {
    hideLayer();
  }, []);

  return (
    <AuthWrapper>
      <AuthContainer>
        <Heading
          as="h2"
          className="text-center fw-bold"
        >
          {t('head.title.SIGN_IN')}
        </Heading>
        <Text className="text-center text-muted">
          {t(`${PATH}.signIn.user.DESCRIPTION`)}
        </Text>
        <Box className="mb-3">
          <FontAwesomeIcon icon={faArrowLeft} />{' '}
          <Link
            to={routesConstants.ROOT}
            title={t(`${PATH}.BACK_TO_HOMEPAGE`)}
          >
            <Box as="span">
              {t(`${PATH}.BACK`)}
            </Box>
          </Link>
        </Box>
        <SignInForm />
        <Box className="mt-3 text-center">
          {t(`${PATH}.signIn.user.YOU_DON_NOT_HAVE_ACCOUNT`)}{' '}
          <Link
            to={routesConstants.AUTH.SIGN_UP.ROOT}
            title={t(`${PATH}.GO_TO_SIGN_UP`)}
          >
            <Box as="span">
              {t(`${PATH}.SIGN_UP`)}
            </Box>
          </Link>.
        </Box>
      </AuthContainer>
    </AuthWrapper>
  );
});

SignInContent.displayName = 'SignInContent';

export default SignInContent;
