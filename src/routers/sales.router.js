const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  salesController.addSale,
);

router.get(
  '/',
  salesController.getSales,
);

router.get(
  '/:id',
  salesController.getSaleId,
);

router.delete(
  '/:id',
  salesController.deleteSale,
);

router.put(
  '/:id',
  salesController.updateSale,
);

module.exports = router;
