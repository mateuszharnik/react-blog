import { Schema, model } from 'mongoose';

const TermsOfUseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contents: {
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

export default model('TermsOfUse', TermsOfUseSchema);
