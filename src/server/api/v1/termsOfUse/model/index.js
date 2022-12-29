import { Schema, model } from 'mongoose';

const TermsOfUseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    contents: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20000,
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
