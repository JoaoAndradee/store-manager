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

module.exports = {
  addSale,
};
