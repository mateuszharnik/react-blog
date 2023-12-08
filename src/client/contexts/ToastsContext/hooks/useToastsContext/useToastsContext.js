import { useSafeContext } from '@client/hooks/useSafeContext';
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
  } = useSafeContext({ context: ToastsContext });

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
