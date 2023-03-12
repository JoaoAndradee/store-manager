const { salesModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const createSale = async (salesArr) => {
  const error = schema.validateSale(salesArr);
  if (error.type) return error;
  const errorId = await schema.validateIdSale(salesArr);
  // console.log('errorId', errorId);
  if (errorId.type) return errorId;
  const newSaleId = await salesModel.createSale();
  const result = salesArr.map((item) => salesModel.insert(newSaleId, item));
  await Promise.all(result);
  return { type: null, message: newSaleId };
};

const listSales = async () => {
  const allSales = await salesModel.read();
  return { type: null, message: allSales };
};

const listSalesById = async (id) => {
  const sales = await salesModel.readId(id);
  const error = await schema.validateIdSaleGet(sales);
  if (error.type) return error;
  return { type: null, message: sales };
};

const deleteSaleById = async (id) => {
  const error = await schema.validateIdSales(id);
  if (error.type) return error;
  return { type: null };
};

const updateSales = async (id, salesArr) => {
  const error = await schema.validateSale(salesArr);
  if (error.type) return error;
  const error2 = await schema.validateIdSale(salesArr);
  if (error2.type) return error2;
  const error3 = await schema.validateUpdateSales(id, salesArr);
  if (error3.type) return error3;
  const updating = salesArr.map((sale) => salesModel.update(id, sale.productId, sale.quantity));
  await Promise.all(updating);
  return { type: null, salesArr };
};

module.exports = {
  createSale,
  listSales,
  listSalesById,
  deleteSaleById,
  updateSales,
};
