import { Types } from 'mongoose';
import { defaultTime } from '../index';

export const mockedMessage1 = {
  first_name: 'Imię',
  last_name: 'Nazwisko',
  email: 'email1@domain.com',
  subject: 'Temat 1',
  contents: 'Zawartość wiadomości 1',
  is_read: false,
  deleted_at: null,
  updated_at: new Date(defaultTime),
  created_at: new Date(defaultTime),
  _id: new Types.ObjectId(),
};

export const mockedMessage2 = {
  first_name: 'Imię',
  last_name: 'Nazwisko',
  email: 'email2@domain.com',
  subject: 'Temat 2',
  contents: 'Zawartość wiadomości 2',
  is_read: false,
  deleted_at: null,
  updated_at: new Date(defaultTime + 1000),
  created_at: new Date(defaultTime + 1000),
  _id: new Types.ObjectId(),
};

export const mockedMessage3 = {
  first_name: 'Imię',
  last_name: 'Nazwisko',
  email: 'email3@domain.com',
  subject: 'Temat 3',
  contents: 'Zawartość wiadomości 3',
  is_read: true,
  deleted_at: null,
  updated_at: new Date(defaultTime + 2000),
  created_at: new Date(defaultTime + 2000),
  _id: new Types.ObjectId(),
};

export const mockedMessage4 = {
  first_name: 'Imię',
  last_name: 'Nazwisko',
  email: 'email4@domain.com',
  subject: 'Temat 4',
  contents: 'Zawartość wiadomości 4',
  is_read: false,
  deleted_at: null,
  updated_at: new Date(defaultTime + 3000),
  created_at: new Date(defaultTime + 3000),
  _id: new Types.ObjectId(),
};

export const mockedMessage5 = {
  first_name: 'Imię',
  last_name: 'Nazwisko',
  email: 'email5@domain.com',
  subject: 'Temat 5',
  contents: 'Zawartość wiadomości 5',
  is_read: true,
  deleted_at: new Date(defaultTime + 40000),
  updated_at: new Date(defaultTime + 4000),
  created_at: new Date(defaultTime + 4000),
  _id: new Types.ObjectId(),
};
