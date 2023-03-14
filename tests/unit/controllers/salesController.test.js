const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { } = require('./mocks/sales.controller.mock');

describe('Testes da camada controllers', function () {


  afterEach(function () {
    sinon.restore();
  })
})
