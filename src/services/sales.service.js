const { salesModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const createSale = async (salesArr) => {
  const error = schema.validateSale(salesArr);
  if (error.type) return error;
  const errorId = await schema.validateIdSale(salesArr);
  console.log('errorId', errorId);
  if (errorId.type) return errorId;
  const newSaleId = await salesModel.createSale();
  const result = salesArr.map((item) => salesModel.insert(newSaleId, item));
  await Promise.all(result);
  return { type: null, message: newSaleId };
};

module.exports = {
  createSale,
};
