const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  productController.getAll,
);

router.get(
  '/:id',
  productController.getById,
);

router.post(
  '/',
  productController.createProduct,
);

module.exports = router;