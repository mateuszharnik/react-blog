import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32,
    },
    display_name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32,
    },
    description: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['kobieta', 'mężczyzna'],
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
    facebook_url: {
      type: String,
      default: '',
    },
    dribbble_url: {
      type: String,
      default: '',
    },
    youtube_url: {
      type: String,
      default: '',
    },
    twitter_url: {
      type: String,
      default: '',
    },
    github_url: {
      type: String,
      default: '',
    },
    instagram_url: {
      type: String,
      default: '',
    },
    linkedin_url: {
      type: String,
      default: '',
    },
    stack_overflow_url: {
      type: String,
      default: '',
    },
    twitch_url: {
      type: String,
      default: '',
    },
    website_url: {
      type: String,
      default: '',
    },
    image_url: {
      type: String,
      default: '',
    },
    is_terms_of_use_accepted: {
      type: Boolean,
      required: true,
    },
    is_email_public: {
      type: Boolean,
      default: false,
    },
    is_public: {
      type: Boolean,
      default: false,
    },
    is_banned: {
      type: Boolean,
      default: false,
    },
    token_version: {
      type: Number,
      default: 1,
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

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, obj) => {
    const updatedObj = { ...obj };

    delete updatedObj._id;

    return updatedObj;
  },
});

export default model('User', UserSchema);
