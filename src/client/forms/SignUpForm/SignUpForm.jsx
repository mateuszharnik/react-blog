import { memo, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { useRouter } from '@client/router/hooks';
import { useForm } from '@client/hooks/useForm';
import { useAuth } from '@client/store/auth';
import { useToastsContext } from '@client/contexts/ToastsContext';
import { signUpSchema as validationSchema } from '@client/schemas/signUpSchemas';
import { routesConstants, toastsConstants, valuesConstants } from '@shared/constants';
import Box from '@client/components/Box';
import Button from '@client/components/Buttons/Button';

const FORMS_PATH = 'forms';
const PATH = 'forms.signUpForm';

const SignUpForm = memo(() => {
  const { t } = useTranslation();
  const { actions: { addToast } } = useToastsContext();
  const { history: { push } } = useRouter();

  const {
    actions: { signUp },
    utils: { signUpMetadata, resetSignUpMetadata },
  } = useAuth();

  const title = useMemo(() => (
    signUpMetadata.isFetching ? `${FORMS_PATH}.SIGNING_UP` : `${FORMS_PATH}.SIGN_UP`
  ), [signUpMetadata.isFetching]);

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      gender: valuesConstants.GENDER.MALE,
      password: '',
      confirm_password: '',
      is_terms_of_use_accepted: false,
    },
    validationSchema,
    onSubmit: async (payload) => {
      await signUp({ payload });
    },
  });

  useEffect(() => {
    if (signUpMetadata.isSuccess) {
      addToast({
        message: t(`${FORMS_PATH}.SUCCESSFULLY_REGISTERED`),
        type: toastsConstants.TYPE.SUCCESS,
      });

      form.resetForm();
      push(routesConstants.PROFILE.DASHBOARD.ROOT);
    }
  }, [signUpMetadata.isSuccess]);

  useEffect(() => {
    if (signUpMetadata.isError) {
      addToast({
        message: signUpMetadata.error,
        type: toastsConstants.TYPE.DANGER,
      });
    }
  }, [signUpMetadata.isError]);

  useEffect(() => () => {
    resetSignUpMetadata();
  }, []);

  return (
    <form
      className="row"
      onSubmit={form.handleSubmit}
    >
      <Box className="mb-3 col-12">
        <label
          htmlFor="username"
          className="form-label"
        >
          {t(`${PATH}.username.LABEL`)}{' '}
        </label>
        <input
          type="text"
          className={`form-control${!form.errors.username.value && form.touched.username.value ? ' valid' : ''}`}
          id="username"
          name="username"
          placeholder={t(`${PATH}.username.PLACEHOLDER`)}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.username.value}
        />
        {form.touched.username.value && form.errors.username.value ? (
          <Box className="invalid-feedback">
            {form.errors.username.value}
          </Box>
        ) : null}
      </Box>
      <Box className="mb-3 col-12">
        <label
          htmlFor="email"
          className="form-label"
        >
          {t(`${PATH}.email.LABEL`)}{' '}
        </label>
        <input
          type="text"
          className={`form-control${!form.errors.email.value && form.touched.email.value ? ' valid' : ''}`}
          id="email"
          name="email"
          placeholder={t(`${PATH}.email.PLACEHOLDER`)}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.email.value}
        />
        {form.touched.email.value && form.errors.email.value ? (
          <Box className="invalid-feedback">
            {form.errors.email.value}
          </Box>
        ) : null}
      </Box>
      <Box className="mb-3 col-12">
        <label
          htmlFor="password"
          className="form-label"
        >
          {t(`${PATH}.password.LABEL`)}{' '}
        </label>
        <input
          type="password"
          className={`form-control${!form.errors.password.value && form.touched.password.value ? ' valid' : ''}`}
          id="password"
          name="password"
          placeholder={t(`${PATH}.password.PLACEHOLDER`)}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.password.value}
        />
        {form.touched.password.value && form.errors.password.value ? (
          <Box className="invalid-feedback">
            {form.errors.password.value}
          </Box>
        ) : null}
      </Box>
      <Box className="mb-3 col-12">
        <label
          htmlFor="confirm_password"
          className="form-label"
        >
          {t(`${PATH}.confirmPassword.LABEL`)}{' '}
        </label>
        <input
          type="password"
          className={`form-control${!form.errors.confirm_password.value && form.touched.confirm_password.value ? ' valid' : ''}`}
          id="confirm_password"
          name="confirm_password"
          placeholder={t(`${PATH}.confirmPassword.PLACEHOLDER`)}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.confirm_password.value}
        />
        {form.touched.confirm_password.value && form.errors.confirm_password.value ? (
          <Box className="invalid-feedback">
            {form.errors.confirm_password.value}
          </Box>
        ) : null}
      </Box>
      <Box className="mb-3 col-12">
        <Box className="form-label">
          {t(`${PATH}.gender.LABEL`)}{' '}
        </Box>
        <Box className="row mx-0 justify-content-center">
          <Box className="form-check col-auto">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value={valuesConstants.GENDER.MALE}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              checked={form.values.gender.value === valuesConstants.GENDER.MALE}
            />{' '}
            <label
              className="form-check-label"
              htmlFor="male"
            >
              {t(`${PATH}.gender.MALE_VALUE`)}
            </label>
          </Box>
          <Box className="form-check col-auto">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value={valuesConstants.GENDER.FEMALE}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              checked={form.values.gender.value === valuesConstants.GENDER.FEMALE}
            />{' '}
            <label
              className="form-check-label"
              htmlFor="female"
            >
              {t(`${PATH}.gender.FEMALE_VALUE`)}
            </label>
          </Box>
        </Box>
        {form.touched.gender.value && form.errors.gender.value ? (
          <Box className="invalid-feedback text-center">
            {form.errors.gender.value}
          </Box>
        ) : null}
      </Box>
      <Box className="mb-3 col-12 text-center">
        <Box className="form-check d-inline-block">
          <input
            className="form-check-input"
            type="checkbox"
            name="is_terms_of_use_accepted"
            id="is_terms_of_use_accepted"
            value={form.values.is_terms_of_use_accepted.value}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />{' '}
          <label
            className="form-check-label"
            htmlFor="is_terms_of_use_accepted"
          >
            {t(`${PATH}.isTermsOfUseAccepted.LABEL`)}
          </label>{' '}
          <Button
            title={t(`${PATH}.isTermsOfUseAccepted.LABEL_BUTTON_TITLE`)}
            className="button-link"
          >
            {t(`${PATH}.isTermsOfUseAccepted.LABEL_BUTTON`)}
          </Button>
        </Box>
        {(
          form.touched.is_terms_of_use_accepted.value
            && form.errors.is_terms_of_use_accepted.value
        ) ? (
          <Box className="invalid-feedback">
            {form.errors.is_terms_of_use_accepted.value}
          </Box>
          ) : null}
      </Box>
      <Box className="col-12 text-center">
        <Button
          type="submit"
          title={t(title)}
          disabled={signUpMetadata.isFetching}
          className="px-4"
          variant="solid"
          rounded
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
      </Box>
    </form>
  );
});

SignUpForm.displayName = 'SignUpForm';

export default SignUpForm;
