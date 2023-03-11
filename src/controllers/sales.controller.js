const { salesService } = require('../services/index');
const errorMap = require('../utils/errorMap');

const addSale = async (req, res) => {
  const salesArr = req.body;

  const { type, message } = await salesService.createSale(salesArr);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json({
    id: message,
    itemsSold: [...salesArr],
  });
};

const getSales = async (_req, res) => {
  const { message } = await salesService.listSales();
  res.status(200).json(message);
};

const getSaleId = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.listSalesById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  addSale,
  getSales,
  getSaleId,
};
