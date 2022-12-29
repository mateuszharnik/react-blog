import * as Sentry from '@sentry/react';

const initSentry = () => {
  if (process.env.NODE_ENV !== 'production') return;

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [],
    tracesSampleRate: 0.2,
    normalizeDepth: 5,
  });
};

export default initSentry;
