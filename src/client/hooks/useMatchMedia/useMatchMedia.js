import { useState, useEffect } from 'react';

const useMatchMedia = ({ query }) => {
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    matchMedia.addEventListener('change', setMedia);

    return () => {
      matchMedia.removeEventListener('change', setMedia);
    };
  }, []);

  return { media };
};

export default useMatchMedia;
