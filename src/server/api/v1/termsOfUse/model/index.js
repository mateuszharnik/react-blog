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

TermsOfUseSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, obj) => {
    const updatedObj = { ...obj };

    delete updatedObj._id;

    return updatedObj;
  },
});

export default model('TermsOfUse', TermsOfUseSchema);
