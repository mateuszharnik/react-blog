import {
  memo, createContext, useMemo, useState, useEffect,
} from 'react';
import { useMatchMedia } from '@client/hooks/useMatchMedia';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

export const Context = createContext();

const PageSizeContext = memo(({ children }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

  const { media } = useMatchMedia({ query: '(min-width: 992px)' });

  useEffect(() => {
    if (media) setIsDesktop(media.matches);
  }, [media]);

  const context = useMemo(() => ({ isDesktop }), [isDesktop]);

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
});

PageSizeContext.displayName = 'PageSizeContext';

PageSizeContext.propTypes = {
  children: childrenPropTypes.props,
};

PageSizeContext.defaultProps = {
  children: childrenPropTypes.default,
};

export default PageSizeContext;
