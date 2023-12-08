import { useContext } from 'react';
import { Context as AdminLayerContext } from '../../AdminLayerContext';

export const useAdminLayerContext = () => {
  const {
    isAdminLayerActive,
    showAdminLayer,
    hideAdminLayer,
  } = useContext(AdminLayerContext);

  return {
    isAdminLayerActive,
    showAdminLayer,
    hideAdminLayer,
  };
};
