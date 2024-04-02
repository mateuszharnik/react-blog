import { memo, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { useRouter } from '@client/router/hooks';
import { useForm } from '@client/hooks/useForm';
import { useAuth } from '@client/store/auth';
import { signUpSchema } from '@client/schemas/signUpSchemas';
import { routesConstants, valuesConstants } from '@shared/constants';
import FormContext from '@client/contexts/FormContext';
import FormTextInput from '@client/contexts/FormContext/components/FormTextInput';
import FormCheckboxInput from '@client/contexts/FormContext/components/FormCheckboxInput';
import FormRadioInput from '@client/contexts/FormContext/components/FormRadioInput';
import FormPasswordInput from '@client/contexts/FormContext/components/FormPasswordInput';
import FormValidationError from '@client/contexts/FormContext/components/FormValidationError';
import FormGroup from '@client/contexts/FormContext/components/FormGroup';
import Box from '@client/components/Box';
import Button from '@client/components/Buttons/Button';
import AcceptTermsOfUseLabel from '@client/forms/SignUpForm/components/AcceptTermsOfUseLabel';

const FORMS_PATH = 'forms';
const PATH = 'forms.signUpForm';

const SignUpForm = memo((props) => {
  const { t } = useTranslation();
  const { history: { push } } = useRouter();

  const {
    actions: { signUp },
    utils: { signUpMetadata, resetSignUpMetadata },
  } = useAuth();

  const title = useMemo(() => (
    signUpMetadata.isFetching ? `${FORMS_PATH}.SIGNING_UP` : `${FORMS_PATH}.SIGN_UP`
  ), [signUpMetadata.isFetching]);

  const initialValues = useMemo(() => ({
    username: '',
    email: '',
    gender: valuesConstants.GENDER.MALE,
    password: '',
    confirm_password: '',
    is_terms_of_use_accepted: false,
  }), []);

  const validationSchema = useMemo(() => signUpSchema, []);

  const form = useForm({
    initialValues,
    validationSchema,
    onSubmit: async (payload) => {
      await signUp({
        payload,
        onSuccess: () => {
          push(routesConstants.PROFILE.DASHBOARD.ROOT);
        },
      });
    },
  });

  useEffect(() => () => {
    resetSignUpMetadata();
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
        <FormTextInput
          field="email"
          label={t(`${PATH}.email.LABEL`)}
          placeholder={t(`${PATH}.email.PLACEHOLDER`)}
        />
      </FormGroup>
      <FormGroup>
        <FormPasswordInput
          field="password"
          label={t(`${PATH}.password.LABEL`)}
          placeholder={t(`${PATH}.password.PLACEHOLDER`)}
        />
      </FormGroup>
      <FormGroup>
        <FormPasswordInput
          field="confirm_password"
          label={t(`${PATH}.confirmPassword.LABEL`)}
          placeholder={t(`${PATH}.confirmPassword.PLACEHOLDER`)}
        />
      </FormGroup>
      <FormGroup>
        <Box className="form-label">
          {t(`${PATH}.gender.LABEL`)}{' '}
        </Box>
        <Box className="row mx-0 justify-content-center">
          <FormRadioInput
            id="male"
            field="gender"
            label={t(`${PATH}.gender.MALE_VALUE`)}
            value={valuesConstants.GENDER.MALE}
          />
          <FormRadioInput
            id="female"
            field="gender"
            label={t(`${PATH}.gender.FEMALE_VALUE`)}
            value={valuesConstants.GENDER.FEMALE}
          />
        </Box>
        <FormValidationError
          className="text-center"
          error={form.errors.gender}
          touched={form.touched.gender}
        />
      </FormGroup>
      <FormGroup className="text-center">
        <FormCheckboxInput
          field="is_terms_of_use_accepted"
          label={AcceptTermsOfUseLabel}
        />
      </FormGroup>
      <FormGroup
        className="text-center"
        type="button"
      >
        <Button
          type="submit"
          className="px-4"
          variant="solid"
          rounded
          title={t(title)}
          disabled={signUpMetadata.isFetching}
        >
          <Box as="span">
            {t(`${FORMS_PATH}.SIGN_UP`)}
          </Box>{' '}
          {signUpMetadata.isFetching && (
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

SignUpForm.displayName = 'SignUpForm';

export default SignUpForm;
