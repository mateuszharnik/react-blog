import React, { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import AuthWrapper from '@client/components/Layouts/AuthWrapper';
import AuthContainer from '@client/components/Layouts/AuthContainer';
import SignUpForm from '@client/components/Forms/SignUpForm';
import lazyLoad from '@client/helpers/lazyLoad';
import { setTitle, setMeta, signUpMeta } from '@client/helpers/documentMeta';

const ToastsContainer = lazyLoad({
  loader: () => import(/* webpackChunkName: 'toasts' */ '@client/components/Toasts/ToastsContainer'),
  loading: null,
  error: null,
});

const SignUp = memo(() => {
  const { removeLayer, addLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    addLayer();

    setTitle('Zarejestruj się');
    setMeta(signUpMeta());

    removeLayer();
  }, []);

  return (
    <AuthWrapper>
      <AuthContainer>
        <h2 className="text-center fw-bold">
          Zarejestruj się
        </h2>
        <p className="text-center text-muted">
          Utwórz darmowe konto.
        </p>
        <div className="mb-3">
          <FontAwesomeIcon icon={faArrowLeft} />{' '}
          <Link
            to="/"
            title="Wróć do strony głównej"
          >
            <span>Wróć</span>
          </Link>
        </div>
        <SignUpForm />
        <div className="mt-3 text-center">
          Masz już konto?{' '}
          <Link
            to="/zaloguj"
            title="Przejdź do logowania"
          >
            <span>Zaloguj się</span>
          </Link>.
        </div>
      </AuthContainer>
      <ToastsContainer module="signUp" />
    </AuthWrapper>
  );
});

SignUp.displayName = 'SignUp';

export default SignUp;
