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

const updateProduct = async (name, id) => {
  const error = await schema.validateName(name);
  if (error.type) return error;
  const errorId = await schema.validateIdProductsUpdate(name, id);
  if (errorId.type) return errorId;
  return { type: null, message: '' };
};

const deleteProductById = async (id) => {
  const error = await schema.validateIdProducts(id);
  if (error.type) return error;
  return { type: null, message: '' };
};

const searchProduct = async (searchTerm) => {
  const allProducts = await productModel.getAll();
  if (!searchTerm) return { type: 200, message: allProducts };

  const hasSearch = await productModel.searchProduct(searchTerm);
  return { type: null, message: hasSearch };
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProductById,
  searchProduct,
};
