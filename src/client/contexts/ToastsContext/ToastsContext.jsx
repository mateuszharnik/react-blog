import { memo, createContext, useMemo } from 'react';
import { useToasts } from '@client/hooks/useToasts';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const ToastsContainer = lazyLoad({
  loader: () => import(/* webpackChunkName: 'toasts' */ '@client/components/Toasts/ToastsContainer'),
  loading: null,
  error: null,
});

export const Context = createContext();

const ToastsContext = memo(({ children }) => {
  const {
    toasts,
    position,
    limit,
    marginBottom,
    showFromBottom,
    addToast,
    setLimit,
    setShowFromBottom,
    removeToast,
    removeToasts,
  } = useToasts();

  const context = useMemo(() => ({
    toasts,
    position,
    limit,
    marginBottom,
    showFromBottom,
    addToast,
    setLimit,
    setShowFromBottom,
    removeToast,
    removeToasts,
  }), [
    toasts,
    position,
    limit,
    marginBottom,
    showFromBottom,
    addToast,
    setLimit,
    setShowFromBottom,
    removeToast,
    removeToasts,
  ]);

  return (
    <Context.Provider value={context}>
      {children}
      <ToastsContainer
        toasts={toasts}
        position={position}
        marginBottom={marginBottom}
        removeToast={removeToast}
        removeToasts={removeToasts}
      />
    </Context.Provider>
  );
});

ToastsContext.displayName = 'ToastsContext';

ToastsContext.propTypes = {
  children: childrenPropTypes.props,
};

ToastsContext.defaultProps = {
  children: childrenPropTypes.default,
};

export default ToastsContext;
