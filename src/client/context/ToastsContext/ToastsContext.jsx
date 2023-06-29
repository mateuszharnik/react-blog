import {
  memo, createContext, useMemo, useRef, useState, useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { defaultToast } from '@client/configs/toastsConfig';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

export const Context = createContext();

const ToastsContext = memo(({ children }) => {
  const [toasts, setToasts] = useState([]);
  const limit = useRef(5);
  const showFromBottom = useRef(false);

  const addToast = useCallback((payload) => {
    if (toasts.length >= limit.current) return;

    const toast = {
      ...defaultToast,
      ...payload,
      id: uuidv4(),
    };

    if (showFromBottom.current) {
      setToasts([toast, ...toasts]);
    } else {
      setToasts([...toasts, toast]);
    }
  }, [toasts, limit, showFromBottom]);

  const setLimit = useCallback((payload = 5) => {
    limit.current = payload;
  }, [limit]);

  const setShowFromBottom = useCallback((payload = false) => {
    showFromBottom.current = payload;
  }, [showFromBottom]);

  const removeToast = useCallback((id) => {
    setToasts((allToasts) => allToasts.filter((toast) => toast.id !== id));
  }, []);

  const removeToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const value = useMemo(() => ({
    toasts,
    limit,
    showFromBottom,
    addToast,
    setLimit,
    setShowFromBottom,
    removeToast,
    removeToasts,
  }), [
    toasts,
    limit,
    showFromBottom,
    addToast,
    setLimit,
    setShowFromBottom,
    removeToast,
    removeToasts,
  ]);

  return (
    <Context.Provider value={value}>
      {children}
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
