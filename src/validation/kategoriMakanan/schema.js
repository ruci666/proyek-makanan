const Joi = require('joi');

const KategoriMakananPayloadSchema = Joi.object({
  nama: Joi.string().max(100).required(),
});

module.exports = { KategoriMakananPayloadSchema };