import logger from 'loglevel';
import config from '@server/config';

const level = config.NODE_ENV !== 'test' && config.APP_ENV !== 'e2e' ? 'debug' : 'info';

logger.setLevel(level);

export default logger;
