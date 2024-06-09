import * as Sentry from '@sentry/react';
import { envConfig } from '@client/configs/envConfig';
import { isSentryEnabled } from '@client/utils/envUtils';

class SentryService {
  constructor() {
    this.client = Sentry;
  }

  initSentry = () => {
    if (!isSentryEnabled) return;

    this.client.init({
      dsn: envConfig.SENTRY_FRONTEND_DSN,
      integrations: [],
      tracesSampleRate: 0.2,
      normalizeDepth: 5,
    });
  };
}

const { client, initSentry } = new SentryService();

export const sentryService = { ...client, initSentry };
