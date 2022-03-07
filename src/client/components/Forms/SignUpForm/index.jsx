import React, { memo, useState, useMemo } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import validationSchema from '@client/helpers/schemas/signUp';

const SignUpForm = memo(() => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isSubmit } = useStoreState((store) => store.auth);
  const { signUp } = useStoreActions((actions) => actions.auth);
  const navigate = useNavigate();

  const title = useMemo(() => (isSubmit ? 'Rejestrowanie' : 'Zarejestruj się'), [isSubmit]);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      gender: '',
      password: '',
      confirm_password: '',
      is_terms_of_use_accepted: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setSuccess('');
      setError('');

      const newValues = validationSchema.cast(values);

      const { status, data } = await signUp(newValues);

      if (status === 200) {
        setSuccess('Pomyślnie zarejestrowano.');
        resetForm();
        navigate('/profil');
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
            Nazwa użytkownika{' '}
          </label>
          <input
            type="text"
            className={`form-control${!formik.errors.username && formik.touched.username ? ' valid' : ''}`}
            id="username"
            name="username"
            placeholder="User"
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
            htmlFor="email"
            className="form-label"
          >
            Adres email{' '}
          </label>
          <input
            type="email"
            className={`form-control${!formik.errors.email && formik.touched.email ? ' valid' : ''}`}
            id="email"
            name="email"
            placeholder="example@domain.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="invalid-feedback">
              {formik.errors.email}
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
        </div>
        <div className="mb-3 col-12">
          <label
            htmlFor="confirm_password"
            className="form-label"
          >
            Powtórz hasło{' '}
          </label>
          <input
            type="password"
            className={`form-control${!formik.errors.confirm_password && formik.touched.confirm_password ? ' valid' : ''}`}
            id="confirm_password"
            name="confirm_password"
            placeholder="********"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirm_password}
          />
          {formik.touched.confirm_password && formik.errors.confirm_password ? (
            <div className="invalid-feedback">
              {formik.errors.confirm_password}
            </div>
          ) : null}
        </div>
        <div className="mb-3 col-12">
          <div className="form-label">
            Płeć{' '}
          </div>
          <div className="row mx-0 justify-content-center">
            <div className="form-check col-auto">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="mężczyzna"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.gender === 'mężczyzna'}
              />
              <label
                className="form-check-label"
                htmlFor="male"
              >
                Mężczyzna
              </label>
            </div>
            <div className="form-check col-auto">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="kobieta"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.gender === 'kobieta'}
              />
              <label
                className="form-check-label"
                htmlFor="female"
              >
                Kobieta
              </label>
            </div>
          </div>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="invalid-feedback text-center">
              {formik.errors.gender}
            </div>
          ) : null}
        </div>
        <div className="mb-3 col-12 text-center">
          <div className="form-check d-inline-block">
            <input
              className="form-check-input"
              type="checkbox"
              name="is_terms_of_use_accepted"
              id="is_terms_of_use_accepted"
              value={formik.values.is_terms_of_use_accepted}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              className="form-check-label"
              htmlFor="is_terms_of_use_accepted"
            >
              Akceptuję
            </label>{' '}
            <button
              type="button"
              title="Pokaż regulamin"
              className="link"
            >
              regulamin
            </button>
          </div>
          {formik.touched.is_terms_of_use_accepted && formik.errors.is_terms_of_use_accepted ? (
            <div className="invalid-feedback">
              {formik.errors.is_terms_of_use_accepted}
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
            <span>Zarejestruj się</span>{' '}
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

SignUpForm.displayName = 'SignUpForm';

export default SignUpForm;
