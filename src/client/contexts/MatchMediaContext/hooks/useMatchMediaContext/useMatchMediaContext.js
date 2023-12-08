import { useSafeContext } from '@client/hooks/useSafeContext';
import { Context as MatchMediaContext } from '../../MatchMediaContext';

export const useMatchMediaContext = () => {
  const { isDesktop } = useSafeContext({ context: MatchMediaContext });

  return { isDesktop };
};
