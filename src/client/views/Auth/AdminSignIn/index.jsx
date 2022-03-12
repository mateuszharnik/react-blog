import React, { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import AuthWrapper from '@client/components/Layouts/AuthWrapper';
import AuthContainer from '@client/components/Layouts/AuthContainer';
import SignInForm from '@client/components/Forms/SignInForm';
import { setTitle, setMeta, adminSignInMeta } from '@client/helpers/documentMeta';

const AdminSignIn = memo(() => {
  const { adminSignIn, setMessage, setIsError } = useStoreActions((actions) => actions.auth);
  const { removeLayer, addLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    addLayer();

    setTitle('Zaloguj się');
    setMeta(adminSignInMeta());

    removeLayer();

    return () => {
      setMessage();
      setIsError();
    };
  }, []);

  return (
    <AuthWrapper>
      <AuthContainer>
        <h2 className="text-center fw-bold">
          Zaloguj się
        </h2>
        <p className="text-center text-muted">
          Zaloguj się do panelu administratora.
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
        <SignInForm
          signIn={adminSignIn}
          path="/admin"
        />
      </AuthContainer>
    </AuthWrapper>
  );
});

AdminSignIn.displayName = 'AdminSignIn';

export default AdminSignIn;
