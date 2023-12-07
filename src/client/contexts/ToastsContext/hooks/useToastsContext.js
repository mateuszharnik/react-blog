import { useContext } from 'react';
import { Context } from '../ToastsContext';

export const useToastsContext = () => {
  const {
    toasts,
    limit,
    showFromBottom,
    addToast,
    setLimit,
    setShowFromBottom,
    removeToast,
    removeToasts,
  } = useContext(Context);

  return {
    toasts,
    limit,
    showFromBottom,
    actions: {
      addToast,
      removeToast,
      removeToasts,
    },
    utils: {
      setLimit,
      setShowFromBottom,
    },
  };
};
