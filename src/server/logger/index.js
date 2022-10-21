import logger from 'loglevel';
import config from '@server/config';

const { NODE_ENV, APP_ENV } = config;

const level = NODE_ENV !== 'test' && APP_ENV !== 'e2e' ? 'debug' : 'info';

logger.setLevel(level);

export default logger;
