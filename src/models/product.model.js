const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return result;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return product;
};

const insert = async (nome) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [nome],
  );
  return result;
};

module.exports = {
  getAll,
  getById,
  insert,
};
