import { Types } from 'mongoose';
import config from '@server/config';
import { defaultTime } from '../index';

export const mockedDocs = {
  password: config.DOCS_PASSWORD,
  deleted_at: null,
  updated_at: new Date(defaultTime),
  created_at: new Date(defaultTime),
  _id: new Types.ObjectId(),
};

export default mockedDocs;
