import { useSafeContext } from '@client/hooks/useSafeContext';
import { Context as PageSizeContext } from '../../PageSizeContext';

export const usePageSizeContext = () => {
  const { isDesktop } = useSafeContext({ context: PageSizeContext });

  return { isDesktop };
};
