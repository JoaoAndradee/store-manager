const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const getAll = async () => {
  const products = await productModel.getAll();
  return {
    type: null,
    message: products,
  };
};

const getById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productModel.getById(productId);

  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateName(name);
  if (error.type) return error;

  const [newProduct] = await productModel.insert(name);

  return { type: null, message: newProduct };
};

module.exports = {
  getAll,
  getById,
  createProduct,
};
