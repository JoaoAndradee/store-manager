const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.string().required();

const addProductNameSchema = Joi.string().min(5);

module.exports = {
  idSchema,
  addProductSchema,
  addProductNameSchema,
};
