import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@client/components/Buttons/Button';

const PATH = 'forms.signUpForm';

const AcceptTermsOfUseLabel = memo((props) => {
  const { t } = useTranslation();

  return (
    <>
      {t(`${PATH}.isTermsOfUseAccepted.LABEL`)}{' '}
      <Button
        className="button-link"
        title={t(`${PATH}.isTermsOfUseAccepted.LABEL_BUTTON_TITLE`)}
        {...props}
      >
        {t(`${PATH}.isTermsOfUseAccepted.LABEL_BUTTON`)}
      </Button>
    </>
  );
});

AcceptTermsOfUseLabel.displayName = 'AcceptTermsOfUseLabel';

export default AcceptTermsOfUseLabel;
