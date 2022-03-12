import React, { memo, useState, useMemo } from 'react';
import { useFormik } from 'formik';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import validationSchema from '@client/helpers/schemas/docsSignIn';

const DocsSignInForm = memo(() => {
  const [error, setError] = useState('');
  const { isSubmit } = useStoreState((store) => store.docs);
  const { signIn } = useStoreActions((actions) => actions.docs);

  const title = useMemo(() => (isSubmit ? 'Logowanie' : 'Zaloguj się'), [isSubmit]);

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setError('');

      const newValues = validationSchema.cast(values);

      const { status, data } = await signIn(newValues);

      if (status === 200) {
        document.location.href = `${process.env.CLIENT_URL}/api/v1/docs`;
      } else {
        setError(data.message);
      }
    },
  });

  return (
    <>
      <form
        className="row"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-3 col-12">
          <label
            htmlFor="password"
            className="form-label"
          >
            Hasło{' '}
          </label>
          <input
            type="password"
            className={`form-control${!formik.errors.password && formik.touched.password ? ' valid' : ''}`}
            id="password"
            name="password"
            placeholder="********"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="invalid-feedback">
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div className="col-12 text-center">
          <button
            type="submit"
            title={title}
            disabled={isSubmit}
            className="btn btn-primary rounded-pill px-4"
          >
            <span>Zaloguj się</span>{' '}
            {isSubmit && (
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
      <div className="text-center mt-3">
        {error && (
          <div
            className="alert alert-danger mb-0 d-inline-block"
            role="alert"
          >
            {error }
          </div>
        )}
      </div>
    </>
  );
});

DocsSignInForm.displayName = 'DocsSignInForm';

export default DocsSignInForm;
