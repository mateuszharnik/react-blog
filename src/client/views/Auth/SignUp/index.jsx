import React, { useEffect, memo } from 'react';
import { setTitle, setMeta, signUpMeta } from '@client/helpers/documentMeta';

const SignUp = memo(() => {
  useEffect(() => {
    setTitle('Zarejestruj się');
    setMeta(signUpMeta());
  }, []);

  return (
    <div>
      Zarejestruj się
    </div>
  );
});

SignUp.displayName = 'SignUp';

export default SignUp;
