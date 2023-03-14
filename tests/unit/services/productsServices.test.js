const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services')
const { productModel } = require('../../../src/models')

const { productsList, validName, validCreateProductReturn, invalidName, invalidNameLength, mockProductIdInvalid, mockProductUpdateSucess, validId, mockProductModelGetAll, mockFindSearchSucess } = require('./mocks/products.services.mock');
const { searchProduct } = require('../../../src/models/product.model');

describe('Verificando service de products', function () {
  describe('Listagem de produtos', function () {
    it('Verifica se retorna os products', async function () {
      sinon.stub(productModel, 'getAll').resolves(productsList);

      const result = await productService.getAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(productsList);
    });
  })

  describe('Busca por um produto específico', function () {
    it('Retorna um erro caso receba um id inválido', async function () {
      const result = await productService.getById(0);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
    it('Retorna um erro caso o id não exista no bd', async function () {
      sinon.stub(productModel, 'getById').resolves(undefined);

      const result = await productService.getById(1);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    it('Retorna o produto caso o id exista', async function () {
      sinon.stub(productModel, 'getById').resolves(productsList[0]);

      const result = await productService.getById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.equal(productsList[0]);
    });
  });

  describe('Testa a criação de produto', function () {
    it('Verifica se retorna um erro caso name seja inválido', async function () {
      const result = await productService.createProduct(1);

      expect(result.type).to.equal('INVALID_NAME');
      expect(result.message).to.equal('"name" is required');
    })

    it('Verifica se retorna um erro caso name seja menor que 5 caracteres', async function () {
      const result = await productService.createProduct('Uga');

      expect(result.type).to.equal('INVALID_NAME_LENGTH');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });

    it('Verifica se faz a inserção no bd', async function () {
      sinon.stub(productModel, 'insert').resolves(validCreateProductReturn);

      const result = await productService.createProduct(validName);

      expect(result.type).to.equal(null);
      expect(result.message.insertId).to.equal(851);
    });
  });

  describe('Update de products', function () {
    it('Retorna erro em caso de nome inválido', async function () {
      const result = await productService.updateProduct(invalidName, 2);

      expect(result.type).to.equal('INVALID_NAME');
      expect(result.message).to.equal('"name" is required');
    });
    it('Retorna erro em caso de nome pequeno', async function () {
      const result = await productService.updateProduct(invalidNameLength, 2);

      expect(result.type).to.equal('INVALID_NAME_LENGTH');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
    it('Retorna um erro em caso de id invalido', async function () {
      sinon.stub(productModel, 'update').resolves(mockProductIdInvalid);

      const result = await productService.updateProduct('a casa da abelha', 999);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    it('Retona o produto atualizado', async function () {
      sinon.stub(productModel, 'update').resolves(mockProductUpdateSucess);

      const result = await productService.updateProduct(validName, validId);

      expect(result.type).to.equal(null);
      expect(result.message).to.equal('');
    });
  })

  describe('Delete Products', function () {
    it('Verifica se retorna um erro em caso de id inválido', async function () {
      sinon.stub(productModel, 'del').resolves(0);

      const result = await productService.deleteProductById(0);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    it('Verifica se remove o produto', async function () {
      sinon.stub(productModel, 'del').resolves(1);

      const result = await productService.deleteProductById(2);

      expect(result.type).to.equal(null);
    });
  });

  describe('Search Products', function () {
    it('Verifica se retorna um erro caso não seja achado o produto', async function () {
      sinon.stub(productModel, 'getAll').resolves(mockProductModelGetAll);

      const result = await productService.searchProduct('');

      expect(result.type).to.equal(200);
      expect(result.message).to.deep.equal([]);
    });
    it('Verifica se retornar o produto', async function () {
      sinon.stub(productModel, 'searchProduct').resolves(mockFindSearchSucess);

      const result = await productService.searchProduct('tranças');
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(mockFindSearchSucess);
    });
  })

  afterEach(function () {
    sinon.restore();
  })
});
