import { Types } from 'mongoose';
import { defaultTime } from '../index';

export const mockedFAQ1 = {
  title: 'Tytuł 1',
  contents: 'Treść pytania 1',
  is_published: false,
  deleted_at: null,
  updated_at: new Date(defaultTime),
  created_at: new Date(defaultTime),
  _id: new Types.ObjectId(),
};

export const mockedFAQ2 = {
  title: 'Tytuł 2',
  contents: 'Treść pytania 2',
  is_published: true,
  deleted_at: null,
  updated_at: new Date(defaultTime + 1000),
  created_at: new Date(defaultTime + 1000),
  _id: new Types.ObjectId(),
};

export const mockedFAQ3 = {
  title: 'Tytuł 3',
  contents: 'Treść pytania 3',
  is_published: true,
  deleted_at: new Date(defaultTime + 20000),
  updated_at: new Date(defaultTime + 2000),
  created_at: new Date(defaultTime + 2000),
  _id: new Types.ObjectId(),
};
