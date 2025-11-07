const yup = require('yup');
const mongoose = require('mongoose');

const tarefaCreateSchema = yup.object().shape({
  titulo: yup.string().required('Título é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),
  data_inicio: yup.date().required('Data de início é obrigatória'),
  data_fim: yup.date().required('Data de fim é obrigatória'),
  responsavel: yup.string().test('is-objectid', 'Responsável ID inválido', value => mongoose.Types.ObjectId.isValid(value)).required('Responsável é obrigatório'),
  projeto: yup.string().test('is-objectid', 'Projeto ID inválido', value => mongoose.Types.ObjectId.isValid(value)).required('Projeto é obrigatório')
}).test('data_fim_posterior', 'Data de fim deve ser posterior à data de início', function(value) {
  const { data_inicio, data_fim } = value;
  return data_fim > data_inicio;
});

const tarefaUpdateSchema = yup.object().shape({
  titulo: yup.string(),
  descricao: yup.string(),
  data_inicio: yup.date(),
  data_fim: yup.date(),
  responsavel: yup.string().test('is-objectid', 'Responsável ID inválido', value => value ? mongoose.Types.ObjectId.isValid(value) : true),
  projeto: yup.string().test('is-objectid', 'Projeto ID inválido', value => value ? mongoose.Types.ObjectId.isValid(value) : true)
}).test('data_fim_posterior', 'Data de fim deve ser posterior à data de início', function(value) {
  const { data_inicio, data_fim } = value;
  if (data_inicio && data_fim) {
    return data_fim > data_inicio;
  }
  return true;
});

module.exports = { tarefaCreateSchema, tarefaUpdateSchema };