const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const createSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return insertId;
};

const insert = async (saleId, saleObj) => {
  const columns = Object.keys(snakeize(saleObj)).join((', '));
  const placeholders = Object.keys(saleObj)
    .map((_key) => '?')
    .join(', ');
  const result = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, ${columns})
    VALUES (?, ${placeholders})`,
    [saleId, ...Object.values(saleObj)],
  );
  return result;
};

const read = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products sp
    INNER JOIN StoreManager.sales s
    ON sp.sale_id = s.id
    ORDER BY sp.sale_id, sp.product_id;`,
  );
  return camelize(result);
};

const readId = async (id) => {
  const [result] = await connection.execute(
    `
    SELECT s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products sp
    INNER JOIN StoreManager.sales s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, sp.product_id;
    `,
    [id],
  );
  return camelize(result);
};

const deleteId = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  return affectedRows;
};

const update = async (saleId, productId, quantity) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.sales_products
    SET product_id = ?, quantity = ?
    WHERE sale_id = ? AND product_id = ?`,
    [productId, quantity, saleId, productId],
  );
  return result;
};

const getAll = async () => {
  const [result] = connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );
  return result;
};

const countSalesById = async (id) => {
  const [result] = await connection.execute(
    'SELECT COUNT(*) as count FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  return result[0].count;
};

module.exports = {
  createSale,
  insert,
  read,
  readId,
  deleteId,
  update,
  getAll,
  countSalesById,
};
