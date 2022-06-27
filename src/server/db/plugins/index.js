export const removeVersionKey = (schema) => {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, obj) => {
      const updatedObj = { ...obj };

      delete updatedObj._id;

      return updatedObj;
    },
  });
};

export const softDelete = (schema) => {
  schema.add({
    deleted_at: {
      type: Date,
      default: null,
    },
  });

  schema.static('findOneAndSoftDelete', function findOneAndSoftDelete(query = {}, options = {}) {
    return this.findOneAndUpdate(
      query,
      { deleted_at: Date.now() },
      options,
    );
  });

  schema.static('softDeleteMany', function softDeleteMany(query = {}, options = {}) {
    return this.updateMany(
      query,
      { deleted_at: Date.now() },
      options,
    );
  });
};
