import { useState, useCallback } from 'react';

const useLayer = ({ isActive = true } = {}) => {
  const [isLayerActive, setIsLayerActive] = useState(isActive);

  const showLayer = useCallback(() => {
    setIsLayerActive(true);
  }, []);

  const hideLayer = useCallback(() => {
    setIsLayerActive(false);
  }, []);

  const toggleBodyOverflow = useCallback(() => {
    if (isLayerActive) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isLayerActive]);

  return {
    isLayerActive,
    showLayer,
    hideLayer,
    toggleBodyOverflow,
  };
};

export default useLayer;
