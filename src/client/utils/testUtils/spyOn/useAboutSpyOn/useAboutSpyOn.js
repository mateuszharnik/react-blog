import * as useAbout from '@client/store/about/hooks/useAbout';

export const useAboutSpyOn = () => {
  const spyOnUseAbout = jest.spyOn(useAbout, 'default');

  const mockedImplementation = {
    about: {},
    actions: {
      getAbout: jest.fn(),
      cancelGetAbout: jest.fn(),
      updateAbout: jest.fn(),
      cancelUpdateAbout: jest.fn(),
    },
    utils: {
      getAboutMetadata: {},
      updateAboutMetadata: {},
      resetGetAboutMetadata: jest.fn(),
      resetUpdateAboutMetadata: jest.fn(),
      resetAllMetadata: jest.fn(),
    },
  };

  spyOnUseAbout.mockImplementation(() => mockedImplementation);

  return {
    spyOnUseAbout,
    mockedImplementation,
  };
};
