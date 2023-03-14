const salesInvalidId = [
  {
    productId: 2,
    quantity: 3
  },
  {
    productId: 'uga',
    quantity: 1
  }
];

const salesInvalidIdDb = [
  {
    productId: 2,
    quantity: 3
  },
  {
    productId: 9991212,
    quantity: 1
  }
]

const salesValidArr = [
  {
    productId: 2,
    quantity: 3
  },
  {
    productId: 1,
    quantity: 1
  }
]

const salesValidObj = {
  productId: 2,
  quantity: 10
}

module.exports = {
  salesInvalidId,
  salesInvalidIdDb,
  salesValidArr,
  salesValidObj,
}
