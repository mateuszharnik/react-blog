import React, { memo, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import Router from '@client/router.js';

const createSetMedia = (setIsDesktop) => (media) => {
  setIsDesktop(media.matches);
};

const App = memo(() => {
  const { setIsDesktop } = useStoreActions((actions) => actions.matchMedia);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 992);

    const media = window.matchMedia('(min-width: 992px)');
    const setMedia = createSetMedia(setIsDesktop);

    media.addEventListener('change', setMedia);

    return () => media.removeEventListener('change', setMedia);
  }, [setIsDesktop]);

  return (
    <Router />
  );
});

App.displayName = 'App';

export default App;
