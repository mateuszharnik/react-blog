import csrf from 'csurf';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { join } from 'path';
import api from '@server/api';
import config from '@server/config';
import { checkToken } from '@server/middlewares/auth';
import { notFound, CSRFErrorHandler, errorHandler } from '@server/middlewares/errors';

const app = express();

if (config.NODE_ENV !== 'test' && config.APP_ENV !== 'e2e') {
  app.use(morgan('dev'));
}

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'https: http: data:'],
    },
  }),
);
app.use(cookieParser());
app.use(csrf({
  cookie: {
    httpOnly: true,
    sameSite: 'strict',
    secure: config.NODE_ENV === 'production',
  },
}));
app.use(checkToken);

if (config.NODE_ENV === 'development' || config.NODE_ENV === 'test') {
  app.use(cors({ origin: config.CLIENT_URL }));
}

if (config.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../client')));
}

app.use('/api', api);

if (config.NODE_ENV === 'production') {
  app.get('(/*)?', (req, res) => res.sendFile('dist/client/index.html', { root: '.' }));
}

app.use(notFound);
app.use(CSRFErrorHandler);
app.use(errorHandler);

export default app;
