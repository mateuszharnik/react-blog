import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { useLayerContext } from '@client/contexts/LayerContext';
import { routesConstants } from '@shared/constants';
import Link from '@client/router/components/Link';
import AuthWrapper from '@client/layouts/AuthWrapper';
import AuthContainer from '@client/layouts/AuthContainer';
import DocsSignInForm from '@client/forms/DocsSignInForm';
import Heading from '@client/components/Typography/Heading';
import Text from '@client/components/Typography/Text';
import Box from '@client/components/Box';

const PATH = 'auth';

const DocsContent = memo(() => {
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
          {t('head.title.DOCUMENTATION')}
        </Heading>
        <Text className="text-center text-muted">
          {t(`${PATH}.signIn.documentation.DESCRIPTION`)}
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
        <DocsSignInForm />
      </AuthContainer>
    </AuthWrapper>
  );
});

DocsContent.displayName = 'DocsContent';

export default DocsContent;
