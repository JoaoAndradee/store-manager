const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  // console.log(result.pop().id);
  return result;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return product;
};

const insert = async (name) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  // console.log(result);
  return result;
};

const update = async (name, id) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
    [name, id],
  );
  return result;
};

const del = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return affectedRows;
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  del,
};
