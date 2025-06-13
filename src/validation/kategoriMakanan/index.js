const InvariantError = require('../../exceptions/InvariantError');
const { KategoriMakananPayloadSchema } = require('./schema');

const KategoriMakananValidator = {
  validateKategoriMakananPayload: (payload) => {
    const { error } = KategoriMakananPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = KategoriMakananValidator;