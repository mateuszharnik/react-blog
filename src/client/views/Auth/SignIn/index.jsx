import React, { useEffect, memo } from 'react';
import { setTitle, setMeta, signInMeta } from '@client/helpers/documentMeta';

const SignIn = memo(() => {
  useEffect(() => {
    setTitle('Zaloguj się');
    setMeta(signInMeta());
  }, []);

  return (
    <div>
      Zaloguj się
    </div>
  );
});

SignIn.displayName = 'SignIn';

export default SignIn;
