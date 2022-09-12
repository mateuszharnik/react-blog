import { Schema, model } from 'mongoose';

const FAQSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1000,
    },
    contents: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20000,
    },
    is_published: {
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

export default model('FAQ', FAQSchema);
