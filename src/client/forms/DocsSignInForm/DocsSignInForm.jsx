import { memo, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { useForm } from '@client/hooks/useForm';
import { useDocs } from '@client/store/docs';
import { useToastsContext } from '@client/contexts/ToastsContext';
import { envConfig } from '@client/configs/envConfig';
import { docsSignInSchema as validationSchema } from '@client/schemas/docsSignInSchemas';
import { toastsConstants, apiConstants } from '@shared/constants';
import Box from '@client/components/Box';
import Button from '@client/components/Buttons/Button';

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
      <Box className="col-12 text-center">
        <Button
          type="submit"
          title={t(title)}
          disabled={signInMetadata.isFetching}
          variant="solid"
          className="px-4"
          rounded
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
      </Box>
    </form>
  );
});

DocsSignInForm.displayName = 'DocsSignInForm';

export default DocsSignInForm;
