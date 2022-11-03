import { Types } from 'mongoose';
import { defaultTime } from '../index';

export const mockedContact = {
  email: '',
  facebook_url: '',
  github_url: '',
  instagram_url: '',
  twitter_url: '',
  deleted_at: null,
  updated_at: new Date(defaultTime),
  created_at: new Date(defaultTime),
  _id: new Types.ObjectId(),
};

export default mockedContact;
