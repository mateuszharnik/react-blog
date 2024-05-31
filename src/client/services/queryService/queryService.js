import { QueryClient } from 'react-query';

class QueryService {
  constructor() {
    this.client = new QueryClient();
  }

  setStore = (store) => {
    this.client.setDefaultOptions({
      mutations: {
        onSuccess: () => {
          // eslint-disable-next-line
          console.log(store);
        },
      },
      queries: {
        cacheTime: 30000,
        staleTime: 30000,
        onSuccess: () => {
          // eslint-disable-next-line
          console.log(store);
        },
      },
    });
  };
}

export const queryService = new QueryService();
