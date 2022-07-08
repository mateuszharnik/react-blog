import '@server/db';
import colors from 'colors/safe';
import config from '@server/config';
import app from '@server/app';

const { PORT } = config;
// eslint-disable-next-line
console.log(process.env.NODE_ENV);

// eslint-disable-next-line
app.listen(PORT, () => console.log(`App listening on ${colors.cyan(`http://localhost:${PORT}`)}`));
