const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { } = require('./mocks/sales.model.mock');

describe('Testes da camada models', function () {
  describe('Teste criação de sale', function () {
    it('Verifica se retorna o id', async function () {
      sinon.stub(connection, 'execute').resolves([{insertId: 888}]);

      const result = await salesModel.createSale();

      expect(result).to.equal(888);
    });
  })

  afterEach(function () {
    sinon.restore();
  })
})
