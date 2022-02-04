import { Schema, model } from 'mongoose';

const MessageSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32,
    },
    last_name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      maxlength: 200,
      required: true,
    },
    contents: {
      type: String,
      maxlength: 2000,
      required: true,
    },
    is_read: {
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

MessageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, obj) => {
    const updatedObj = { ...obj };

    delete updatedObj._id;

    return updatedObj;
  },
});

export default model('Message', MessageSchema);
