/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { openAPIBackendService } from '@client/services/openAPIBackendService';

class MSWService {
  constructor() {
    this.client = setupServer(
      rest.all('/*', async (req, res, ctx) => openAPIBackendService.handleRequest(
        {
          path: req.url.pathname,
          query: req.url.search,
          method: req.method,
          body: req.bodyUsed ? await req.json() : null,
          headers: { ...req.headers.raw },
        },
        res,
        ctx,
      )),
    );
  }
}

const { client } = new MSWService();

export const mswService = client;
