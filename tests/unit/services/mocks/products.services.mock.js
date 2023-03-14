const productsList = [
  {
    id: 1,
    name: 'A volta dos que não foram'
  },
  {
    id: 2,
    name: 'As mil e uma tranças do careca'
  },
  {
    id: 3,
    name: 'Procurando nemo'
  }
];

const validName = 'As mil e uma tranças do careca';

const validCreateProductReturn = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 851,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
]

const invalidName = 999;

const invalidNameLength = 'gol';


const mockProductIdInvalid = {
  fieldCount: 0,
  affectedRows: 0,
  insertId: 0,
  info: 'Rows matched: 0  Changed: 0  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 0
}

const mockProductUpdateSucess = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1
}

const validId = 1;

const mockProductModelGetAll = [];

const mockFindSearchSucess = [
  {
    id: 2,
    name: 'As mil e uma tranças do careca!'
  }
]

module.exports = {
  productsList,
  validName,
  validCreateProductReturn,
  invalidName,
  invalidNameLength,
  mockProductIdInvalid,
  mockProductUpdateSucess,
  validId,
  mockProductModelGetAll,
  mockFindSearchSucess,
}
