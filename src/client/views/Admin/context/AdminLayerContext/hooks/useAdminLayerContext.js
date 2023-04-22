import { useContext } from 'react';
import { Context } from '../AdminLayerContext';

export const useAdminLayerContext = () => {
  const {
    isAdminLayerActive,
    showAdminLayer,
    hideAdminLayer,
  } = useContext(Context);

  return {
    isAdminLayerActive,
    showAdminLayer,
    hideAdminLayer,
  };
};
