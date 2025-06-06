import { useTranslation } from 'react-i18next';
import Link from '@client/router/components/Link';

const PATH = 'forms.signUpForm';

const AcceptTermsOfUseLabel = (props) => {
  const { t } = useTranslation();

  return (
    <>
      {t(`${PATH}.isTermsOfUseAccepted.LABEL`)}{' '}
      <Link
        to="#terms-of-use"
        title={t(`${PATH}.isTermsOfUseAccepted.LABEL_BUTTON_TITLE`)}
        {...props}
      >
        {t(`${PATH}.isTermsOfUseAccepted.LABEL_BUTTON`)}
      </Link>
    </>
  );
};

AcceptTermsOfUseLabel.displayName = 'AcceptTermsOfUseLabel';

export default AcceptTermsOfUseLabel;
