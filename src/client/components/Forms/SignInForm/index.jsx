import React, { memo, useMemo } from 'react';
import { string, func } from 'prop-types';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import validationSchema from '@client/helpers/schemas/signIn';

const SignInForm = memo(({ signIn, path }) => {
  const { isSubmit } = useStoreState((store) => store.auth);
  const { addToast } = useStoreActions((actions) => actions.toasts);
  const navigate = useNavigate();

  const title = useMemo(() => (isSubmit ? 'Logowanie' : 'Zaloguj się'), [isSubmit]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const newValues = validationSchema.cast(values);

      const { status, data } = await signIn(newValues);

      if (status === 200) {
        addToast({
          message: 'Pomyślnie zalogowano.',
          type: 'success',
          module: path === '/admin' ? 'admin' : 'webpage',
        });
        resetForm();
        navigate(path);
      } else {
        addToast({
          message: data.message || data,
          type: 'danger',
          module: 'signIn',
        });
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
    </>
  );
});

SignInForm.displayName = 'SignInForm';

SignInForm.propTypes = {
  signIn: func.isRequired,
  path: string.isRequired,
};

export default SignInForm;
