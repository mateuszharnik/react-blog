import { Schema, model } from 'mongoose';

const ContactSchema = new Schema(
  {
    email: {
      type: String,
      default: '',
    },
    facebook_url: {
      type: String,
      default: '',
    },
    twitter_url: {
      type: String,
      default: '',
    },
    instagram_url: {
      type: String,
      default: '',
    },
    github_url: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export default model('Contact', ContactSchema);
