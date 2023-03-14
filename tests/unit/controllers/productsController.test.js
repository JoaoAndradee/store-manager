const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productController } = require('../../../src/controllers');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { productsList, validCreateProductReturn, mockFindSearchSucess } = require('./mocks/product.controller.mock');
const schema = require('../../../src/services/validations/validationsInputValues');

describe('Teste de unidade de productController', function () {
  describe('Listando todos os produtos', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'getAll').resolves({ type: null, message: productsList })

      await productController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsList);
    });
  });
  describe('Buscando um produto', function () {
    it('Ao passar um id inválido deve retornar um erro', async function () {
      req = {
        params: {
          id: 'teste'
        }
      };
      res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'getById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      await productController.getById(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('Deve responder um produto e status 200 se o mesmo existir', async function () {
      req = {
        params: {
          id: 2
        }
      };
      res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'getById').resolves({ type: null, message: productsList[0] });

      await productController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsList[0]);
    });

    it('Ao passar um id que não existe no banco deve retornar um erro', async function () {
      req = {
        params: {
          id: 999,
        }
      }
      res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'getById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({message: 'Product not found'});
    });
  });
  describe('Inserindo um produto', function () {
    it('Verifica se retorna erro ao passar um nome incorreto', async function () {
      req = { body: { name: 2 } };
      res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'createProduct')
        .resolves({ type: 'INVALID_NAME', message: '"name" is required' });

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' })
    });

    it('Verifica se retorna um erro ao passar um nome com menos de 5 caracteres', async function () {
      req = { body: { name: 'Uga' } };
      res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'createProduct')
        .resolves({ type: 'INVALID_NAME_LENGTH', message: '"name" length must be at least 5 characteres long' });

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characteres long' })
    })

    it('Verifica se retorna o produto criado e seu status', async function () {
      req = { body: { name: 'A volta dos que não foram' } };
      res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'createProduct').resolves(
        {
          type: null,
          message: validCreateProductReturn
        }
      )

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 851,
        name: req.body.name,
      })
    });
  });
  describe('Atualizando um produto', function () {
    it('Verifica se retorna erro caso id esteja errado', async function () {
      req = { params: { id: 999 }, body: { name: 'alice no pais das maravilhas'} };
      res = {}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'updateProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
    })
    it('Verifica se atualiza o produto e envia status 200', async function () {
      const req = { params: { id: 2}, body: { name: 'A origem'}};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'updateProduct')
        .resolves({ type: null, message: '' });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: req.params.id, name: req.body.name})
    });
  })
  describe('Remoção de produto', function () {
    it('Verifica se retorna erro caso não seja valido o id', async function () {
      req = { params: { id: 3 } };
      res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'deleteProductById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' })
    });
    it('Verifica se deleta o produto do db', async function () {
      req = { params: { id: 2 } };
      res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'deleteProductById')
        .resolves({ type: null })

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });
  })
  describe('Procurando um produto', function () {
    it('Verifica se retorna erro em caso de não achar o produto', async function () {
      req = { query: { q: 'lulala' } };
      res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'searchProduct')
        .resolves({ type: 200, message: productsList });

      await productController.searchProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsList);
    });
    it('Verifica se retorna o produto', async function () {
      req = { query: { q: 'tranças' } };
      res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'searchProduct')
        .resolves({ type: null, message: mockFindSearchSucess });

      await productController.searchProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockFindSearchSucess);
    });
  })

  afterEach(function () {
    sinon.restore();
  })
});
