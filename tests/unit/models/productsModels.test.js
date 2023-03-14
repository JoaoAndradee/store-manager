const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { productsList, newProduct, mockValidReturnOfUpdate, validName, validId, mockInsert, validProductName, mockSearchProduct } = require('./mocks/products.model.mock');

describe('Teste de unidade model de products de StoreManager', function () {

  describe('Testa se retorna todos os produtos', function () {
    it('Recupera a lista de produtos completa', async function () {
      sinon.stub(connection, 'execute').resolves([productsList]);

      const result = await productModel.getAll();

      expect(result).to.be.deep.equal(productsList);
    });
  });

  describe('Recupera o produto a partir do seu id', function () {
    it('Recupera um produto a partir de seu id', async function () {
      sinon.stub(connection, 'execute').resolves([[productsList[0]]]);

      const result = await productModel.getById(1);

      expect(result).to.be.deep.equal(productsList[0]);
    });
  });

  describe('Testa o inserir um produto na tabela', function () {
    it('Inseri um produto na tabela', async function () {
      sinon.stub(connection, 'execute').resolves(mockInsert);

      const [result] = await productModel.insert(validProductName);

      expect(result.affectedRows).to.equal(1);
    });
  });

  describe('testa update de product', function () {
    it('Verifica se o update retorna o esperado', async function () {
      sinon.stub(connection, 'execute').resolves([mockValidReturnOfUpdate]);

      const result = await productModel.update(validName, validId);

      expect(result).to.deep.equal(mockValidReturnOfUpdate);
    });
  });

  describe('Testa deletar um produto', function () {
    it('Deleta um produto pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await productModel.del(2);

      expect(result).to.equal(1);
    })
  })

  describe('Testa searchProduct', function () {
    it('Verifica se searchProduct retorna o esperado', async function () {
      sinon.stub(connection, 'execute').resolves(mockSearchProduct);

      const [result] = await productModel.searchProduct('zen');

      expect(result.id).to.be.equal(3);
      expect(result.name).to.be.equal('Frozen');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
