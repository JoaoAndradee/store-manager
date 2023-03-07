const { idSchema, addProductSchema, addProductNameSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  return { type: null, message: '' };
};

const validateName = (name) => {
  const { error: validateRequired } = addProductSchema.validate(name);
  const { error: validateMinLength } = addProductNameSchema.validate(name);
  if (validateRequired) return { type: 'INVALID_NAME', message: '"name" is required' };
  if (validateMinLength) {
    return {
      type: 'INVALID_NAME_LENGTH',
      message: '"name" length must be at least 5 characters long',
    };
}
  return { type: null, message: '' };
};

validateName('joa');

module.exports = {
  validateId,
  validateName,
};
