import { useSafeContext } from '@client/hooks/useSafeContext';
import { Context as AdminLayerContext } from '../../AdminLayerContext';

export const useAdminLayerContext = () => {
  const {
    isAdminLayerActive,
    showAdminLayer,
    hideAdminLayer,
  } = useSafeContext({ context: AdminLayerContext });

  return {
    isAdminLayerActive,
    showAdminLayer,
    hideAdminLayer,
  };
};
