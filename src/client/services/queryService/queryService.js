import queryString from 'query-string';

class QueryService {
  #client = null;

  constructor(client) {
    this.#client = client;
  }

  parse(query, options) {
    return this.#client.parse(query, options);
  }

  stringify(obj, options) {
    return this.#client.stringify(obj, options);
  }

  parseUrl(path, options) {
    return this.#client.parseUrl(path, options);
  }
}

export const queryService = new QueryService(queryString);
