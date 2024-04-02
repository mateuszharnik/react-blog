import { memo, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { useRouter } from '@client/router/hooks';
import { useForm } from '@client/hooks/useForm';
import { useAuth } from '@client/store/auth';
import { signInSchema } from '@client/schemas/signInSchemas';
import { routesConstants } from '@shared/constants';
import FormContext from '@client/contexts/FormContext';
import FormTextInput from '@client/contexts/FormContext/components/FormTextInput';
import FormPasswordInput from '@client/contexts/FormContext/components/FormPasswordInput';
import FormGroup from '@client/contexts/FormContext/components/FormGroup';
import Link from '@client/router/components/Link';
import Box from '@client/components/Box';
import Button from '@client/components/Buttons/Button';

const FORMS_PATH = 'forms';
const PATH = 'forms.signInForm';

const AdminSignInForm = memo((props) => {
  const { t } = useTranslation();
  const { history: { push } } = useRouter();

  const {
    actions: { adminSignIn },
    utils: { adminSignInMetadata, resetAdminSignInMetadata },
  } = useAuth();

  const title = useMemo(() => (
    adminSignInMetadata.isFetching ? `${FORMS_PATH}.SIGNING_IN` : `${FORMS_PATH}.SIGN_IN`
  ), [adminSignInMetadata.isFetching]);

  const initialValues = useMemo(() => ({
    username: '',
    password: '',
  }), []);

  const validationSchema = useMemo(() => signInSchema, []);

  const form = useForm({
    initialValues,
    validationSchema,
    onSubmit: async (payload) => {
      await adminSignIn({
        payload,
        onSuccess: () => {
          push(routesConstants.ADMIN.ROOT);
        },
      });
    },
  });

  useEffect(() => () => {
    resetAdminSignInMetadata();
  }, []);

  return (
    <FormContext
      form={form}
      {...props}
    >
      <FormGroup>
        <FormTextInput
          field="username"
          label={t(`${PATH}.username.LABEL`)}
          placeholder={t(`${PATH}.username.PLACEHOLDER`)}
        />
      </FormGroup>
      <FormGroup>
        <FormPasswordInput
          field="password"
          label={t(`${PATH}.password.LABEL`)}
          placeholder={t(`${PATH}.password.PLACEHOLDER`)}
        />
        <Box className="mt-1">
          <Link
            to={routesConstants.ROOT}
            title={t(`${PATH}.GO_TO_PASSWORD_RECOVERY`)}
          >
            {t(`${PATH}.FORGOT_PASSWORD`)}
          </Link>
        </Box>
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
          disabled={adminSignInMetadata.isFetching}
        >
          <Box as="span">
            {t(`${FORMS_PATH}.SIGN_IN`)}
          </Box>{' '}
          {adminSignInMetadata.isFetching && (
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

AdminSignInForm.displayName = 'AdminSignInForm';

export default AdminSignInForm;
