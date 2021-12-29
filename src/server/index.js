import colors from 'colors/safe';
import config from '@server/config';
import app from '@server/app';
import db from '@server/db';

const { PORT } = config;

db.on('open', () => {
  // eslint-disable-next-line
  app.listen(PORT, () => console.log(colors.blue(`App listening on http://localhost:${PORT}`)));
});
