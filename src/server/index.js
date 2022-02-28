import '@server/db';
import colors from 'colors/safe';
import config from '@server/config';
import app from '@server/app';

const { PORT } = config;

// eslint-disable-next-line
app.listen(PORT, () => console.log(colors.blue(`App listening on http://localhost:${PORT}`)));
