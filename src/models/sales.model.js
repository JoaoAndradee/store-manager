// const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const createSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return insertId;
};

const insert = async (saleId, saleObj) => {
  // console.log(saleId, saleObj);
  const columns = Object.keys(snakeize(saleObj)).join((', '));
  // console.log(columns);
  const placeholders = Object.keys(saleObj)
    .map((_key) => '?')
    .join(', ');
  // console.log(placeholders);
  const [result] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, ${columns})
    VALUES (?, ${placeholders})`,
    [saleId, ...Object.values(saleObj)],
  );
  // console.log(result);
  return result;
};

module.exports = {
  createSale,
  insert,
};
