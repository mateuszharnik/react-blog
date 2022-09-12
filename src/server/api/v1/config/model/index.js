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
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export default model('Config', ConfigSchema);
