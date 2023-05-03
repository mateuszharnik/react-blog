import { memo, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { Link } from '@client/router/components';
import { useRouter } from '@client/router/hooks';
import { useForm } from '@client/hooks/useForm';
import { useAuth } from '@client/store/auth';
import { useToastsContext } from '@client/context/ToastsContext';
import { signInSchema as validationSchema } from '@client/schemas/signInSchemas';
import { routesConstants, toastsConstants } from '@shared/constants';

const FORMS_PATH = 'forms';
const PATH = 'forms.signInForm';

const AdminSignInForm = memo(() => {
  const { t } = useTranslation();
  const { actions: { addToast } } = useToastsContext();
  const { history: { push } } = useRouter();

  const {
    actions: { adminSignIn },
    utils: { adminSignInMetadata, resetAdminSignInMetadata },
  } = useAuth();

  const title = useMemo(() => (
    adminSignInMetadata.isFetching ? `${FORMS_PATH}.SIGNING_IN` : `${FORMS_PATH}.SIGN_IN`
  ), [adminSignInMetadata.isFetching]);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (payload) => {
      await adminSignIn({ payload });
    },
  });

  useEffect(() => {
    if (adminSignInMetadata.isSuccess) {
      addToast({
        message: t(`${FORMS_PATH}.SUCCESSFULLY_LOGGED_IN`),
        type: toastsConstants.TYPE.SUCCESS,
      });

      form.resetForm();
      push(routesConstants.ADMIN.ROOT);
    }
  }, [adminSignInMetadata.isSuccess]);

  useEffect(() => {
    if (adminSignInMetadata.isError) {
      addToast({
        message: adminSignInMetadata.error,
        type: toastsConstants.TYPE.DANGER,
      });
    }
  }, [adminSignInMetadata.isError]);

  useEffect(() => () => {
    resetAdminSignInMetadata();
  }, []);

  return (
    <form
      className="row"
      onSubmit={form.handleSubmit}
    >
      <div className="mb-3 col-12">
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
          <div className="invalid-feedback">
            {form.errors.username.value}
          </div>
        ) : null}
      </div>
      <div className="mb-3 col-12">
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
          <div className="invalid-feedback">
            {form.errors.password.value}
          </div>
        ) : null}
        <div className="mt-1">
          <Link
            to={routesConstants.ROOT}
            title={t(`${PATH}.GO_TO_PASSWORD_RECOVERY`)}
          >
            {t(`${PATH}.FORGOT_PASSWORD`)}
          </Link>
        </div>
      </div>
      <div className="col-12 text-center">
        <button
          type="submit"
          title={t(title)}
          disabled={adminSignInMetadata.isFetching}
          className="btn btn-primary rounded-pill px-4"
        >
          <span>
            {t(`${FORMS_PATH}.SIGN_IN`)}
          </span>{' '}
          {adminSignInMetadata.isFetching && (
            <span className="ms-1">
              <FontAwesomeIcon
                spin
                icon={faCircleNotch}
              />
            </span>
          )}
        </button>
      </div>
    </form>
  );
});

AdminSignInForm.displayName = 'AdminSignInForm';

export default AdminSignInForm;
