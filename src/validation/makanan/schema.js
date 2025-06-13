const Joi = require('joi');

const MakananPayloadSchema = Joi.object({
  makanan: Joi.string().max(100).required(),   
  kategori_id: Joi.number().integer().positive().required(), 
});

module.exports = { MakananPayloadSchema };