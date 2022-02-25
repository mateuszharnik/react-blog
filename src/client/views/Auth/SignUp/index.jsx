import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import { setTitle, setMeta, signUpMeta } from '@client/helpers/documentMeta';

const SignUp = memo(() => {
  const { removeLayer, addLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    addLayer();

    setTitle('Zarejestruj się');
    setMeta(signUpMeta());

    removeLayer();
  }, []);

  return (
    <div>
      Zarejestruj się
    </div>
  );
});

SignUp.displayName = 'SignUp';

export default SignUp;
