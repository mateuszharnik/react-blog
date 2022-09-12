import { Schema, model } from 'mongoose';

const AboutSchema = new Schema(
  {
    contents: {
      type: String,
      maxlength: 20000,
      default: '',
    },
    html_contents: {
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

export default model('About', AboutSchema);
