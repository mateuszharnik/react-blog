import '@server/db';
import api from '@server/api';
import config from '@server/config';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { notFound, errorHandler } from '@server/middlewares/errors';
import { join } from 'path';

const { NODE_ENV, CLIENT_URL } = config;
const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

if (NODE_ENV === 'development') {
  app.use(cors({ origin: CLIENT_URL }));
}

if (NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../client')));
}

app.use('/api', api);

if (NODE_ENV === 'production') {
  app.get('(/*)?', (req, res) => res.sendFile('dist/client/index.html', { root: '.' }));
}

app.use(notFound);
app.use(errorHandler);

export default app;
