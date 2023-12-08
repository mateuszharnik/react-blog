import { useStoreState } from 'easy-peasy';

export const useUser = () => {
  const { user } = useStoreState((store) => store.userStore);

  return {
    user,
  };
};
