import { envConfig } from '@client/configs/envConfig';
import { valuesConstants } from '@shared/constants';

const { ENV: { PRODUCTION } } = valuesConstants;

export const isNotProductionEnv = envConfig.NODE_ENV !== PRODUCTION;

export const isDevtoolsEnabled = envConfig.DEVTOOLS_ENABLED;

export const isSentryEnabled = envConfig.SENTRY_FRONTEND_ENABLED;
