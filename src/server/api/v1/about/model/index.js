import { Schema, model } from 'mongoose';

const AboutSchema = new Schema(
  {
    contents: {
      type: String,
      default: '',
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

AboutSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, obj) => {
    const updatedObj = { ...obj };

    delete updatedObj._id;

    return updatedObj;
  },
});

export default model('About', AboutSchema);
