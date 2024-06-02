import { Types } from 'mongoose';
import config from '@server/config';
import { defaultTime } from '../index';

export const mockedAdmin = {
  username: config.ADMIN_USERNAME,
  email: config.ADMIN_EMAIL,
  description: '',
  password: config.ADMIN_PASSWORD,
  gender: 'male',
  facebook_url: '',
  dribbble_url: '',
  youtube_url: '',
  twitter_url: '',
  github_url: '',
  instagram_url: '',
  linkedin_url: '',
  stack_overflow_url: '',
  twitch_url: '',
  website_url: '',
  image_url: '',
  is_terms_of_use_accepted: true,
  is_email_public: false,
  is_public: false,
  is_banned: false,
  deleted_at: null,
  updated_at: new Date(defaultTime),
  created_at: new Date(defaultTime),
  _id: new Types.ObjectId(),
};

export const mockedModerator = {
  username: 'Moderator',
  email: 'moderator@test.pl',
  description: '',
  password: 'Password123',
  gender: 'female',
  facebook_url: '',
  dribbble_url: '',
  youtube_url: '',
  twitter_url: '',
  github_url: '',
  instagram_url: '',
  linkedin_url: '',
  stack_overflow_url: '',
  twitch_url: '',
  website_url: '',
  image_url: '',
  is_terms_of_use_accepted: true,
  is_email_public: false,
  is_public: false,
  is_banned: false,
  deleted_at: null,
  updated_at: new Date(defaultTime + 1000),
  created_at: new Date(defaultTime + 1000),
  _id: new Types.ObjectId(),
};

export const mockedUser = {
  username: 'User',
  email: 'user@test.pl',
  description: '',
  password: 'Password123',
  gender: 'male',
  facebook_url: '',
  dribbble_url: '',
  youtube_url: '',
  twitter_url: '',
  github_url: '',
  instagram_url: '',
  linkedin_url: '',
  stack_overflow_url: '',
  twitch_url: '',
  website_url: '',
  image_url: '',
  is_terms_of_use_accepted: true,
  is_email_public: false,
  is_public: false,
  is_banned: false,
  deleted_at: null,
  updated_at: new Date(defaultTime + 2000),
  created_at: new Date(defaultTime + 2000),
  _id: new Types.ObjectId(),
};
