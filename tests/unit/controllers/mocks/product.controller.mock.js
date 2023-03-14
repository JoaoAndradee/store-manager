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

const validCreateProductReturn =
{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 851,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const mockFindSearchSucess = [
  {
    id: 2,
    name: 'As mil e uma tranças do careca!'
  }
];

module.exports = {
  productsList,
  validCreateProductReturn,
  mockFindSearchSucess,
}
