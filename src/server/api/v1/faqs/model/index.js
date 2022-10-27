import { Schema, model } from 'mongoose';

const FAQSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
      default: false,
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
