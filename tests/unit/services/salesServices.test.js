const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const { salesService } = require('../../../src/services');
const { salesInvalidId, salesInvalidIdDb, salesValidArr } = require('./mocks/sales.services.mock');

describe('Testes da camada services', function () {
  describe('Testa criação de venda', function () {
    it('Verifica erro em caso de array de objetos inválido', async function () {
      const result = await salesService.createSale(salesInvalidId);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"productId" must be a number');
    });
    it('Verifica se retorna erro em caso de produto que não existe', async function () {
      sinon.stub(salesModel, 'getAll').resolves(salesValidArr);

      const result = await salesService.createSale(salesInvalidIdDb);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    it('Verifica se cria o registro de venda', async function () {
      sinon.stub(salesModel, 'createSale').resolves(10);
      sinon.stub(salesModel, 'insert').resolves([{}])

      const result = await salesService.createSale(salesValidArr);

      expect(result.type).to.equal(null);
      expect(result.message).to.equal(10);
    });
  })

  afterEach(function () {
    sinon.restore();
  })
})
