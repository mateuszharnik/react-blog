import { useContext } from 'react';
import { Context } from '../WebpageLayerContext';

export const useWebpageLayerContext = () => {
  const {
    isWebpageLayerActive,
    showWebpageLayer,
    hideWebpageLayer,
  } = useContext(Context);

  return {
    isWebpageLayerActive,
    showWebpageLayer,
    hideWebpageLayer,
  };
};
