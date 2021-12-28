import colors from 'colors/safe';
import config from '@server/config';
import app from '@server/app';
import db from '@server/db';

const { SERVER_PORT, SERVER_URL } = config;

db.on('open', () => {
  // eslint-disable-next-line
  app.listen(SERVER_PORT, () => console.log(colors.blue(`App listening on ${SERVER_URL}`)));
});
