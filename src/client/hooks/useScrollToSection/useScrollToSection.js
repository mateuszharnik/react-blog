import { useMemo, useCallback, useEffect } from 'react';
import { useRouter } from '@client/router/hooks';

const useScrollToSection = ({
  id = '', exact = true, a11y = true, duration = 300,
}) => {
  const { location: { hash } } = useRouter();

  const idHash = useMemo(
    () => (id.startsWith('#') ? id : `#${id}`),
    [id],
  );

  const scrollToSection = useCallback(async () => {
    try {
      const jump = (await import(/* webpackChunkName: 'jump' */ 'jump.js')).default;

      jump(idHash, { a11y, duration });
    } catch (error) {
      return null;
    }
  }, [idHash, a11y, duration]);

  const checkIfShouldScroll = useCallback(() => {
    if (exact) return hash === idHash;

    return hash.includes(idHash);
  }, [exact, idHash, hash]);

  useEffect(async () => {
    if (checkIfShouldScroll()) await scrollToSection();
  }, [idHash, hash]);

  return {
    scrollToSection,
  };
};

export default useScrollToSection;
