import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { Link } from '@client/router/components';
import { useLayerContext } from '@client/context/LayerContext';
import { routesConstants } from '@shared/constants';
import AuthWrapper from '@client/layouts/AuthWrapper';
import AuthContainer from '@client/layouts/AuthContainer';
import AdminSignInForm from '@client/forms/AdminSignInForm';
import Heading from '@client/components/Heading';

const PATH = 'auth';

const AdminSignInContent = memo(() => {
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
        <p className="text-center text-muted">
          {t(`${PATH}.signIn.admin.DESCRIPTION`)}
        </p>
        <div className="mb-3">
          <FontAwesomeIcon icon={faArrowLeft} />{' '}
          <Link
            to={routesConstants.ROOT}
            title={t(`${PATH}.BACK_TO_HOMEPAGE`)}
          >
            <span>{t(`${PATH}.BACK`)}</span>
          </Link>
        </div>
        <AdminSignInForm />
      </AuthContainer>
    </AuthWrapper>
  );
});

AdminSignInContent.displayName = 'AdminSignInContent';

export default AdminSignInContent;
