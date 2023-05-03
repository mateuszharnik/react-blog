export default {
  ROOT: '/api',

  BASE_URL: {
    ROOT: '/api/v1/',
  },

  CSRF_TOKEN: {
    ROOT: 'api/v1/csrf-token',
    NAME: 'csrf-token',
  },

  AUTH: {
    ROOT: 'api/v1/auth',
    NAME: 'auth',

    REFRESH_TOKEN: {
      ROOT: 'api/v1/auth/refresh-token',
      NAME: 'auth/refresh-token',
    },

    ADMIN: {
      ROOT: 'api/v1/auth/admin',
      NAME: 'auth/admin',

      SIGN_IN: {
        ROOT: 'api/v1/auth/admin/sign-in',
        NAME: 'auth/admin/sign-in',
      },
    },

    SIGN_IN: {
      ROOT: 'api/v1/auth/sign-in',
      NAME: 'auth/sign-in',
    },

    SIGN_UP: {
      ROOT: 'api/v1/auth/sign-up',
      NAME: 'auth/sign-up',
    },

    SIGN_OUT: {
      ROOT: 'api/v1/auth/sign-out',
      NAME: 'auth/sign-out',
    },
  },

  DOCS: {
    ROOT: 'api/v1/docs',
    NAME: 'docs',

    SIGN_IN: {
      ROOT: 'api/v1/docs/sign-in',
      NAME: 'docs/sign-in',
    },

    REFRESH_TOKEN: {
      ROOT: 'api/v1/docs/refresh-token',
      NAME: 'docs/refresh-token',
    },
  },

  ABOUT: {
    ROOT: 'api/v1/about',
    NAME: 'about',
  },

  CONTACT: {
    ROOT: 'api/v1/contact',
    NAME: 'contact',
  },

  CONFIG: {
    ROOT: 'api/v1/config',
    NAME: 'config',
  },

  MESSAGES: {
    ROOT: 'api/v1/messages',
    NAME: 'messages',
  },
};
