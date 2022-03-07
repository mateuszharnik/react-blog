import React, { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import AuthWrapper from '@client/components/Layouts/AuthWrapper';
import AuthContainer from '@client/components/Layouts/AuthContainer';
import SignInForm from '@client/components/Forms/SignInForm';
import { setTitle, setMeta, signInMeta } from '@client/helpers/documentMeta';

const SignIn = memo(() => {
  const { setMessage, setIsError } = useStoreActions((actions) => actions.auth);
  const { removeLayer, addLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    addLayer();

    setTitle('Zaloguj się');
    setMeta(signInMeta());

    removeLayer();

    return () => {
      setMessage();
      setIsError();
    };
  }, []);

  return (
    <AuthWrapper>
      <AuthContainer>
        <h2 className="text-center fw-bold mb-3">
          Zaloguj się
        </h2>
        <div className="mb-3">
          <FontAwesomeIcon icon={faArrowLeft} />{' '}
          <Link
            to="/"
            title="Wróć do strony głównej"
          >
            <span>Wróć</span>
          </Link>
        </div>
        <SignInForm />
        <div className="mt-3 text-center">
          Nie masz konta?{' '}
          <Link
            to="/rejestracja"
            title="Przejdź do rejestracji"
          >
            <span>Utwórz konto</span>
          </Link>.
        </div>
      </AuthContainer>
    </AuthWrapper>
  );
});

SignIn.displayName = 'SignIn';

export default SignIn;
