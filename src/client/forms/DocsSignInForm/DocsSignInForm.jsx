import { memo, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { useForm } from '@client/hooks/useForm';
import { useDocs } from '@client/store/docs';
import { useToastsContext } from '@client/context/ToastsContext';
import { envConfig } from '@client/configs/envConfig';
import { docsSignInSchema as validationSchema } from '@client/schemas/docsSignInSchemas';
import { toastsConstants, apiConstants } from '@shared/constants';

const apiDocsUrl = `${envConfig.CLIENT_URL}/${apiConstants.DOCS.ROOT}`;

const FORMS_PATH = 'forms';
const PATH = 'forms.docsSignInForm';

const DocsSignInForm = memo(() => {
  const { t } = useTranslation();
  const { actions: { addToast } } = useToastsContext();

  const {
    actions: { signIn },
    utils: { signInMetadata, resetSignInMetadata },
  } = useDocs();

  const title = useMemo(() => (
    signInMetadata.isFetching ? `${FORMS_PATH}.SIGNING_IN` : `${FORMS_PATH}.SIGN_IN`
  ), [signInMetadata.isFetching]);

  const form = useForm({
    initialValues: {
      password: '',
    },
    validationSchema,
    onSubmit: async (payload) => {
      await signIn({ payload });
    },
  });

  useEffect(() => {
    if (signInMetadata.isSuccess) {
      form.resetForm();

      document.body.focus();
      document.location.href = apiDocsUrl;
    }
  }, [signInMetadata.isSuccess]);

  useEffect(() => {
    if (signInMetadata.isError) {
      addToast({
        message: signInMetadata.error,
        type: toastsConstants.TYPE.DANGER,
      });
    }
  }, [signInMetadata.isError]);

  useEffect(() => () => {
    resetSignInMetadata();
  }, []);

  return (
    <form
      className="row"
      onSubmit={form.handleSubmit}
    >
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
      </div>
      <div className="col-12 text-center">
        <button
          type="submit"
          title={t(title)}
          disabled={signInMetadata.isFetching}
          className="btn btn-primary rounded-pill px-4"
        >
          <span>
            {t(`${FORMS_PATH}.SIGN_IN`)}
          </span>{' '}
          {signInMetadata.isFetching && (
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

DocsSignInForm.displayName = 'DocsSignInForm';

export default DocsSignInForm;
