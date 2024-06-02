import { useSafeContext } from '@client/hooks/useSafeContext';
import { Context as LayerContext } from '../../LayerContext';

export const useLayerContext = () => {
  const {
    isLayerActive,
    showLayer,
    hideLayer,
  } = useSafeContext({ context: LayerContext });

  return {
    isLayerActive,
    showLayer,
    hideLayer,
  };
};
