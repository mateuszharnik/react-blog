import { useContext } from 'react';
import { Context } from '../MatchMediaContext';

export const useMatchMediaContext = () => {
  const { isDesktop } = useContext(Context);

  return {
    isDesktop,
  };
};
