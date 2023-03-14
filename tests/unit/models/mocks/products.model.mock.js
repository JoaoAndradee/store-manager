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

const newProduct = {
  name: 'A volta dos que não foram',
};

const mockValidReturnOfUpdate = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1
};

const validName = 'Hulk 2';

const validId = 2;

const mockInsert = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 4,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
];

const mockSearchProduct = [
  [
    {
      id: 3,
      name: 'Frozen'
    }
  ],
  []
]

module.exports = {
  productsList,
  newProduct,
  mockValidReturnOfUpdate,
  validName,
  validId,
  mockInsert,
  mockSearchProduct,
}
