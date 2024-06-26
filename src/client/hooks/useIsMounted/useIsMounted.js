import { useEffect, useRef } from 'react';

const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export default useIsMounted;
