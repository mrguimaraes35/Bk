const yup = require('yup');
const mongoose = require('mongoose');

const idSchema = yup.object().shape({
  id: yup.string().test('is-objectid', 'ID inválido', value => mongoose.Types.ObjectId.isValid(value))
});

module.exports = idSchema;