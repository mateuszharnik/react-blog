import '@server/db';
import colors from 'colors/safe';
import config from '@server/config';
import logger from '@server/logger';
import app from '@server/app';

const { PORT } = config;

app.listen(PORT, () => logger.info(`App listening on ${colors.cyan(`http://localhost:${PORT}`)}`));
