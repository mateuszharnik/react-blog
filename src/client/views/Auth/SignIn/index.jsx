import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import { setTitle, setMeta, signInMeta } from '@client/helpers/documentMeta';

const SignIn = memo(() => {
  const { removeLayer, addLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    addLayer();

    setTitle('Zaloguj się');
    setMeta(signInMeta());

    removeLayer();
  }, []);

  return (
    <div>
      Zaloguj się
    </div>
  );
});

SignIn.displayName = 'SignIn';

export default SignIn;
