import { urlQueryService } from '@client/services/urlQueryService';

export const generatePath = (to, options = {}) => {
  const { params = {}, query = {} } = options;

  let path = to;

  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  path = Object.keys(params).reduce((url, key) => url.replaceAll(new RegExp(`:${key}`, 'gm'), params[key]), path);

  const stringifiedQuery = urlQueryService.stringify(query);

  if (stringifiedQuery) {
    path += `?${stringifiedQuery}`;
  }

  return path;
};

export const getQuery = (search) => urlQueryService.parse(search);

export const getUrl = (path) => {
  const { url } = urlQueryService.parseUrl(path);
  return url;
};

export const parseQuery = (query) => {
  const parsed = urlQueryService.stringify(query);

  return parsed ? `?${parsed}` : parsed;
};
