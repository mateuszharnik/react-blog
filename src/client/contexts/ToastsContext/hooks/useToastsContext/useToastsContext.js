import { useContext } from 'react';
import { Context as ToastsContext } from '../../ToastsContext';

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
  } = useContext(ToastsContext);

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
