import { useState, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { defaultToast } from '@client/configs/toastsConfig';
import { propTypesConstants, toastsConstants } from '@shared/constants';

const { BOTTOM_RIGHT } = propTypesConstants.TOAST_POSITIONS;
const { DEFAULT_LIMIT } = toastsConstants;

const useToasts = ({ limit = DEFAULT_LIMIT, position = BOTTOM_RIGHT } = {}) => {
  const [toasts, setToasts] = useState([]);
  const limitRef = useRef(limit);
  const [toastPosition] = useState(position);
  const showFromBottomRef = useRef(!position?.includes('top'));
  const [marginBottom] = useState(!position?.includes('top'));

  const addToast = useCallback((payload) => {
    if (toasts.length >= limitRef.current) return;

    const toast = {
      ...defaultToast,
      ...payload,
      id: uuidv4(),
    };

    if (showFromBottomRef.current) {
      setToasts((allToasts) => [toast, ...allToasts]);
    } else {
      setToasts((allToasts) => [...allToasts, toast]);
    }
  }, [toasts, limitRef, showFromBottomRef]);

  const setLimit = useCallback((payload = 5) => {
    limitRef.current = payload;
  }, [limitRef]);

  const setShowFromBottom = useCallback((payload = false) => {
    showFromBottomRef.current = payload;
  }, [showFromBottomRef]);

  const removeToast = useCallback((id) => {
    setToasts((allToasts) => allToasts.filter((toast) => toast.id !== id));
  }, []);

  const removeToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    position: toastPosition,
    limit: limitRef,
    showFromBottom: showFromBottomRef,
    marginBottom,
    addToast,
    setLimit,
    setShowFromBottom,
    removeToast,
    removeToasts,
  };
};

export default useToasts;
