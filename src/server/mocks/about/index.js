import { Types } from 'mongoose';
import { defaultTime } from '../index';

export const mockedAbout = {
  contents: 'Przykładowa strona o blogu.',
  deleted_at: null,
  updated_at: new Date(defaultTime),
  created_at: new Date(defaultTime),
  _id: new Types.ObjectId(),
};

export default mockedAbout;
