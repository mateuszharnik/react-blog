import React, { useEffect, memo } from 'react';
import { setTitle } from '@client/helpers/documentMeta';

const SignIn = memo(() => {
  useEffect(() => {
    setTitle('Zaloguj się');
  }, []);

  return (
    <div>
      Zaloguj się
    </div>
  );
});

SignIn.displayName = 'SignIn';

export default SignIn;
