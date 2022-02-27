import '@server/db';
import csrf from 'csurf';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { serve, setup } from 'swagger-ui-express';
import { join } from 'path';
import api from '@server/api';
import config from '@server/config';
import swaggerDocument from '@server/docs/API.json';
import { notFound, CSRFErrorHandler, errorHandler } from '@server/middlewares/errors';

const { NODE_ENV, CLIENT_URL } = config;
const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser());
app.use(csrf({
  cookie: true,
}));

if (NODE_ENV === 'development') {
  app.use(cors({ origin: CLIENT_URL }));
}

if (NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../client')));
}

app.use('/api/v1/docs', serve, setup(swaggerDocument, { explorer: true }));
app.use('/api', api);

if (NODE_ENV === 'production') {
  app.get('(/*)?', (req, res) => res.sendFile('dist/client/index.html', { root: '.' }));
}

app.use(notFound);
app.use(CSRFErrorHandler);
app.use(errorHandler);

export default app;
