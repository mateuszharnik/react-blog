import React, { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import AuthWrapper from '@client/components/Layouts/AuthWrapper';
import AuthContainer from '@client/components/Layouts/AuthContainer';
import DocsSignInForm from '@client/components/Forms/DocsSignInForm';
import { setTitle, setMeta, docsMeta } from '@client/helpers/documentMeta';

const SignIn = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('Dokumentacja');
    setMeta(docsMeta());

    removeLayer();
  }, []);

  return (
    <AuthWrapper>
      <AuthContainer>
        <h2 className="text-center fw-bold">
          Dokumentacja
        </h2>
        <p className="text-center text-muted">
          Zaloguj się do dokumentacji API.
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
        <DocsSignInForm />
      </AuthContainer>
    </AuthWrapper>
  );
});

SignIn.displayName = 'SignIn';

export default SignIn;
