import about from './about';
import healthCheck from './healthCheck';

const docs = {
  openapi: '3.0.0',
  info: {
    version: 'v1',
    title: 'Mateusz Harnik Blog APIs',
    description: 'API documentation for the blog.',
    license: {
      name: 'MIT License',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  paths: {
    '/api/v1': {
      get: healthCheck.get,
    },
    '/api/v1/about': {
      get: about.get,
      put: about.put,
    },
  },
};

export default docs;
