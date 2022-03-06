import React, { memo, useState, useMemo } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import validationSchema from '@client/helpers/schemas/signIn';

const SignInForm = memo(() => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isSubmit } = useStoreState((store) => store.auth);
  const { signIn } = useStoreActions((actions) => actions.auth);

  const title = useMemo(() => (isSubmit ? 'Logowanie' : 'Zaloguj się'), [isSubmit]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setSuccess('');
      setError('');

      const newValues = validationSchema.cast(values);

      const { status, data } = await signIn(newValues);

      if (status === 200) {
        setSuccess('Pomyślnie zalogowano.');
        resetForm();
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
            htmlFor="username"
            className="form-label"
          >
            Login{' '}
          </label>
          <input
            type="text"
            className={`form-control${!formik.errors.username && formik.touched.username ? ' valid' : ''}`}
            id="username"
            name="username"
            placeholder="Nazwa użytkownika lub email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="invalid-feedback">
              {formik.errors.username}
            </div>
          ) : null}
        </div>
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
          <div className="mt-1">
            <Link
              to="/"
              title="Przejdź do przywracania hasła"
            >
              Nie pamiętasz hasła?
            </Link>
          </div>
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
            {error}
          </div>
        )}
        {success && (
          <div
            className="alert alert-success mb-0 d-inline-block"
            role="alert"
          >
            {success}
          </div>
        )}
      </div>
    </>
  );
});

SignInForm.displayName = 'SignInForm';

export default SignInForm;
