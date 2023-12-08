import { useContext } from 'react';
import { Context as WebpageLayerContext } from '../../WebpageLayerContext';

export const useWebpageLayerContext = () => {
  const {
    isWebpageLayerActive,
    showWebpageLayer,
    hideWebpageLayer,
  } = useContext(WebpageLayerContext);

  return {
    isWebpageLayerActive,
    showWebpageLayer,
    hideWebpageLayer,
  };
};
