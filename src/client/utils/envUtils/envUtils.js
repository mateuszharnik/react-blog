import { envConfig } from '@client/configs/envConfig';

export const isNotProductionEnv = envConfig.NODE_ENV !== 'production';

export const isDevtoolsEnabled = envConfig.DEVTOOLS_ENABLED;

export const isSentryDisabled = !envConfig.SENTRY_DSN || isNotProductionEnv;
