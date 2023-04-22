import {
  memo, createContext, useMemo, useState, useEffect, useCallback,
} from 'react';
import { childrenPropTypes, childrenDefaultProps } from '@client/prop-types';

export const Context = createContext();

const MatchMediaContext = memo(({ children }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  const setMedia = useCallback((media) => {
    setIsDesktop(media.matches);
  }, []);

  const value = useMemo(() => ({
    isDesktop,
  }), [isDesktop]);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 992);

    const matchMedia = window.matchMedia('(min-width: 992px)');

    matchMedia.addEventListener('change', setMedia);

    return () => {
      matchMedia.removeEventListener('change', setMedia);
    };
  }, []);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
});

MatchMediaContext.displayName = 'MatchMediaContext';

MatchMediaContext.propTypes = {
  children: childrenPropTypes,
};

MatchMediaContext.defaultProps = {
  children: childrenDefaultProps,
};

export default MatchMediaContext;
