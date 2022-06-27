import { Schema, model } from 'mongoose';

const DocsSchema = new Schema(
  {
    password: {
      type: String,
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

export default model('Docs', DocsSchema);
