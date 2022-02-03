import React, { memo, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Router from '@client/router.js';

const createSetMedia = (setIsDesktop) => (media) => {
  setIsDesktop(media.matches);
};

const App = memo(() => {
  const { isOpen } = useStoreState((actions) => actions.nav);
  const { isDesktop } = useStoreState((actions) => actions.matchMedia);
  const { setIsDesktop } = useStoreActions((actions) => actions.matchMedia);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 992);

    const media = window.matchMedia('(min-width: 992px)');
    const setMedia = createSetMedia(setIsDesktop);

    media.addEventListener('change', setMedia);

    return () => media.removeEventListener('change', setMedia);
  }, [setIsDesktop]);

  useEffect(() => {
    if (isOpen && !isDesktop) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isDesktop, isOpen]);

  return (
    <Router />
  );
});

App.displayName = 'App';

export default App;
