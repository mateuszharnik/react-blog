import logger from 'loglevel';
import config from '@server/config';

const level = config.LOGGER_ENABLED ? 'debug' : 'info';

logger.setLevel(level);

export default logger;
