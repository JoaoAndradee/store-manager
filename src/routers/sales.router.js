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

module.exports = router;
