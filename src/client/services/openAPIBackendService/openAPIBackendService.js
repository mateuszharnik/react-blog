/* eslint-disable import/no-extraneous-dependencies */
import OpenAPIBackend from 'openapi-backend';
import definition from '@server/docs';

class OpenAPIBackendService {
  constructor() {
    this.client = new OpenAPIBackend({ definition });

    this.#registerNotFound();
    this.#registerNotImplemented();
    this.#registerValidationFail();
  }

  #registerNotImplemented = () => {
    this.client.register('notImplemented', async (c, res, ctx) => {
      const { status, mock } = this.client.mockResponseForOperation(
        c.operation.operationId,
      );

      ctx.status(status);

      return res(ctx.json(mock));
    });
  }

  #registerNotFound = () => {
    this.client.register('notFound', (c, res, ctx) => res(ctx.status(404)));
  }

  #registerValidationFail = () => {
    this.client.register('validationFail', (c, res, ctx) => res(ctx.status(400), ctx.json({ error: c.validation.errors })));
  }
}

const { client } = new OpenAPIBackendService();

export const openAPIBackendService = client;
