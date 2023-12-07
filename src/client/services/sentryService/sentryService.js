import * as Sentry from '@sentry/react';
import { envConfig } from '@client/configs/envConfig';
import { isSentryDisabled } from '@client/utils/envUtils';

class SentryService {
  #client = null;

  constructor(client) {
    this.#client = client;
  }

  init() {
    if (isSentryDisabled) return;

    this.#client.init({
      dsn: envConfig.SENTRY_DSN,
      integrations: [],
      tracesSampleRate: 0.2,
      normalizeDepth: 5,
    });
  }

  getInstance() {
    return this.#client;
  }
}

export const sentryService = new SentryService(Sentry);
