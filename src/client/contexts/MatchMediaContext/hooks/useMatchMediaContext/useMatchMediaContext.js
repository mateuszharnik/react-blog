import { useContext } from 'react';
import { Context as MatchMediaContext } from '../../MatchMediaContext';

export const useMatchMediaContext = () => {
  const { isDesktop } = useContext(MatchMediaContext);

  return {
    isDesktop,
  };
};
