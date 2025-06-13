const InvariantError = require('../../exceptions/InvariantError');
const { MakananPayloadSchema } = require('./schema');

const MakananValidator = {
  validateMakananPayload: (payload) => {
    const validationResult = MakananPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = MakananValidator;
