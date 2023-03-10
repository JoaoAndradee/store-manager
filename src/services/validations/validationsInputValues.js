const {
  idSchema,
  addProductSchema,
  addProductNameSchema,
  addSalesSchema,
} = require('./schemas');

const { productModel } = require('../../models');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  return { type: null, message: '' };
};

const validateName = (name) => {
  const { error: validateRequired } = addProductSchema.validate(name);
  const { error: validateMinLength } = addProductNameSchema.validate(name);
  if (validateRequired) return { type: 'INVALID_NAME', message: '"name" is required' };
  if (validateMinLength) {
    return {
      type: 'INVALID_NAME_LENGTH',
      message: '"name" length must be at least 5 characters long',
    };
}
  return { type: null, message: '' };
};

const checkErrorSales = (errorType, valid) => {
  let error;
  switch (errorType) {
    case 'any.required': {
      error = { type: 'INVALID_VALUE', message: valid[0].error.message };
      break;
    }
    case 'number.base':
      error = { type: 'INVALID_VALUE', message: valid[0].error.message };
      break;
    case 'number.min':
      error = { type: 'INVALID_NAME_LENGTH', message: valid[0].error.message };
      break;
    default:
      error = { type: null, message: '' };
  }
  return error;
};

const validateSale = (salesObj) => {
  const valid = salesObj.map((sale) => addSalesSchema.validate(sale)).filter((item) => item.error);
  if (valid.length > 0) {
    const errorType = valid[0].error.details[0].type;
    const error = checkErrorSales(errorType, valid);
    return error;
  }
  return { type: null, message: '' };
};

const validateIdSale = async (obj) => {
  const getAllProducts = await productModel.getAll();
  const lastIdProducts = getAllProducts.pop().id;
  const highestId = obj
    .reduce((prev, current) => ((prev.productId > current.productId) ? prev : current)).productId;
  console.log('id alto', highestId);
  console.log('lastIdProducts', lastIdProducts);
  if (highestId > lastIdProducts) {
    console.log('entrou no if');
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateName,
  validateSale,
  validateIdSale,
};
