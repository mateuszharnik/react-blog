import { useContext } from 'react';
import { Context as LayerContext } from '../../LayerContext';

export const useLayerContext = () => {
  const {
    isLayerActive,
    showLayer,
    hideLayer,
  } = useContext(LayerContext);

  return {
    isLayerActive,
    showLayer,
    hideLayer,
  };
};
