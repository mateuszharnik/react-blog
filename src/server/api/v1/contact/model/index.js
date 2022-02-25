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
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

ContactSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, obj) => {
    const updatedObj = { ...obj };

    delete updatedObj._id;

    return updatedObj;
  },
});

export default model('Contact', ContactSchema);
