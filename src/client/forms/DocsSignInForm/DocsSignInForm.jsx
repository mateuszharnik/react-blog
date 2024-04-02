import { memo, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { useForm } from '@client/hooks/useForm';
import { useDocs } from '@client/store/docs';
import { envConfig } from '@client/configs/envConfig';
import { docsSignInSchema } from '@client/schemas/docsSignInSchemas';
import { apiConstants } from '@shared/constants';
import FormContext from '@client/contexts/FormContext';
import FormPasswordInput from '@client/contexts/FormContext/components/FormPasswordInput';
import FormGroup from '@client/contexts/FormContext/components/FormGroup';
import Box from '@client/components/Box';
import Button from '@client/components/Buttons/Button';

const apiDocsUrl = `${envConfig.CLIENT_URL}${apiConstants.DOCS.ROOT}`;

const FORMS_PATH = 'forms';
const PATH = 'forms.docsSignInForm';

const DocsSignInForm = memo((props) => {
  const { t } = useTranslation();

  const {
    actions: { signIn },
    utils: { signInMetadata, resetSignInMetadata },
  } = useDocs();

  const title = useMemo(() => (
    signInMetadata.isFetching ? `${FORMS_PATH}.SIGNING_IN` : `${FORMS_PATH}.SIGN_IN`
  ), [signInMetadata.isFetching]);

  const initialValues = useMemo(() => ({
    password: '',
  }), []);

  const validationSchema = useMemo(() => docsSignInSchema, []);

  const form = useForm({
    initialValues,
    validationSchema,
    onSubmit: async (payload) => {
      await signIn({
        payload,
        onSuccess: () => {
          document.body.focus();
          document.location.href = apiDocsUrl;
        },
      });
    },
  });

  useEffect(() => () => {
    resetSignInMetadata();
  }, []);

  return (
    <FormContext
      form={form}
      {...props}
    >
      <FormGroup>
        <FormPasswordInput
          field="password"
          label={t(`${PATH}.password.LABEL`)}
          placeholder={t(`${PATH}.password.PLACEHOLDER`)}
          showToggler
        />
      </FormGroup>
      <FormGroup
        className="text-center"
        type="button"
      >
        <Button
          type="submit"
          variant="solid"
          className="px-4"
          rounded
          title={t(title)}
          disabled={signInMetadata.isFetching}
        >
          <Box as="span">
            {t(`${FORMS_PATH}.SIGN_IN`)}
          </Box>{' '}
          {signInMetadata.isFetching && (
            <Box
              as="span"
              className="ms-1"
            >
              <FontAwesomeIcon
                spin
                icon={faCircleNotch}
              />
            </Box>
          )}
        </Button>
      </FormGroup>
    </FormContext>
  );
});

DocsSignInForm.displayName = 'DocsSignInForm';

export default DocsSignInForm;
