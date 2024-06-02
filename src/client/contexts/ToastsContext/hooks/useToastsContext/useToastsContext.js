import { useSafeContext } from '@client/hooks/useSafeContext';
import { Context as ToastsContext } from '../../ToastsContext';

export const useToastsContext = () => {
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
  } = useSafeContext({ context: ToastsContext });

  return {
    toasts,
    limit,
    position,
    showFromBottom,
    marginBottom,
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
