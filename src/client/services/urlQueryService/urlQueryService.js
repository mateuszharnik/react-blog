import queryString from 'query-string';

class UrlQueryService {
  constructor() {
    this.client = queryString;
  }
}

const { client } = new UrlQueryService();

export const urlQueryService = client;
