import config from '@server/config';
import { roleTypes } from '../roles';

const { ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD } = config;

const admin = {
  username: ADMIN_USERNAME,
  email: ADMIN_EMAIL,
  description: '',
  password: ADMIN_PASSWORD,
  gender: 'mężczyzna',
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
  role: roleTypes.ADMIN,
};

export const defaultUsers = [admin];

export const exampleUsers = [admin];
