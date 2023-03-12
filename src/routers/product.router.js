const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  productController.getAll,
);

router.get(
  '/search',
  productController.searchProduct,
);

router.get(
  '/:id',
  productController.getById,
);

router.post(
  '/',
  productController.createProduct,
);

router.put(
  '/:id',
  productController.updateProduct,
);

router.delete(
  '/:id',
  productController.deleteProduct,
);

module.exports = router;
