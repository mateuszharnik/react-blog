import { useContext } from 'react';
import { Context } from '../LayerContext';

export const useLayerContext = () => {
  const {
    isLayerActive,
    showLayer,
    hideLayer,
  } = useContext(Context);

  return {
    isLayerActive,
    showLayer,
    hideLayer,
  };
};
