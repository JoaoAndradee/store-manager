const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const { type, message } = await productService.getAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getById(id);

  // console.log(message);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productService.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json({ id: message.insertId, name });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productService.updateProduct(name, id);

  console.log('type: ', type);
  console.log('message: ', message);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json({ id, name });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productService.deleteProductById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).json();
};

const searchProduct = async (req, res) => {
  const searchTerm = req.query.q;

  console.log('chegou aki');

  const { type, message } = await productService.searchProduct(searchTerm);

  if (type) return res.status(type).json(message);

  res.status(200).json(message);
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
