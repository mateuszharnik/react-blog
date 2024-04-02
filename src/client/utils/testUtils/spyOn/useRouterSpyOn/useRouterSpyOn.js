import * as useRouter from '@client/router/hooks/useRouter';

export const useRouterSpyOn = () => {
  const spyOnUseRouter = jest.spyOn(useRouter, 'default');

  const mockedImplementation = {
    history: {
      push: jest.fn(),
      go: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      replace: jest.fn(),
      pushBackLocation: jest.fn(),
      getPath: jest.fn(),
    },
    location: {
      fullPath: '',
      hash: '',
      path: '',
      params: '',
      query: '',
      search: '',
      state: '',
    },
  };

  spyOnUseRouter.mockImplementation(() => mockedImplementation);

  return {
    spyOnUseRouter,
    mockedImplementation,
  };
};
