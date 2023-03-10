const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.string().required();

const addProductNameSchema = Joi.string().min(5);

const addSalesSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
  quantity: Joi.number().min(1).required(),
});

module.exports = {
  idSchema,
  addProductSchema,
  addProductNameSchema,
  addSalesSchema,
};
