import { Types } from 'mongoose';
import { defaultTime } from '../index';

export const mockedConfig = {
  show_authors: false,
  show_email: false,
  show_social_media: true,
  show_comments: true,
  use_slug_url: false,
  use_docs_password: true,
  deleted_at: null,
  updated_at: new Date(defaultTime),
  created_at: new Date(defaultTime),
  _id: new Types.ObjectId(),
};

export default mockedConfig;
