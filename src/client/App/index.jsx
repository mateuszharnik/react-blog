import React, { memo, useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import LazyPageSpinner from '@client/components/LazyLoading/LazyPageSpinner';
import Router from '@client/router';

const createSetMedia = (setIsDesktop) => (media) => {
  setIsDesktop(media.matches);
};

const App = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLayerActive } = useStoreState((store) => store.layer);
  const { isOpen } = useStoreState((actions) => actions.nav);
  const { isDesktop } = useStoreState((actions) => actions.matchMedia);
  const { setIsDesktop } = useStoreActions((actions) => actions.matchMedia);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 992);

    const media = window.matchMedia('(min-width: 992px)');
    const setMedia = createSetMedia(setIsDesktop);

    media.addEventListener('change', setMedia);

    setIsLoading(false);

    return () => media.removeEventListener('change', setMedia);
  }, []);

  useEffect(() => {
    if ((isOpen && !isDesktop) || isLayerActive) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isDesktop, isOpen, isLayerActive]);

  return (
    <>
      {isLayerActive && (
        <div className="layer">
          <LazyPageSpinner />
        </div>
      )}
      {isLoading ? <LazyPageSpinner /> : <Router />}
    </>
  );
});

App.displayName = 'App';

export default App;
