import { Schema, model } from 'mongoose';

const ConfigSchema = new Schema(
  {
    show_authors: {
      type: Boolean,
      required: true,
    },
    show_email: {
      type: Boolean,
      required: true,
    },
    show_social_media: {
      type: Boolean,
      required: true,
    },
    show_comments: {
      type: Boolean,
      required: true,
    },
    use_slug_url: {
      type: Boolean,
      required: true,
    },
    use_docs_password: {
      type: Boolean,
      required: true,
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

ConfigSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, obj) => {
    const updatedObj = { ...obj };

    delete updatedObj._id;

    return updatedObj;
  },
});

export default model('Config', ConfigSchema);
