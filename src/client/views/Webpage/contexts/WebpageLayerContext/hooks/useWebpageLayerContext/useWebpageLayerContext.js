import { useSafeContext } from '@client/hooks/useSafeContext';
import { Context as WebpageLayerContext } from '../../WebpageLayerContext';

export const useWebpageLayerContext = () => {
  const {
    isWebpageLayerActive,
    showWebpageLayer,
    hideWebpageLayer,
  } = useSafeContext({ context: WebpageLayerContext });

  return {
    isWebpageLayerActive,
    showWebpageLayer,
    hideWebpageLayer,
  };
};
