import { queryService } from '@client/services/queryService';

export const generatePath = (to, options = {}) => {
  const { params = {}, query = {} } = options;

  let path = to;

  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  path = Object.keys(params).reduce((url, key) => url.replaceAll(new RegExp(`:${key}`, 'gm'), params[key]), path);

  const stringifiedQuery = queryService.stringify(query);

  if (stringifiedQuery) {
    path += `?${stringifiedQuery}`;
  }

  return path;
};

export const getQuery = (search) => queryService.parse(search);

export const getUrl = (path) => {
  const { url } = queryService.parseUrl(path);
  return url;
};

export const parseQuery = (query) => {
  const parsed = queryService.stringify(query);

  return parsed ? `?${parsed}` : parsed;
};
