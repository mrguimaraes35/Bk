const yup = require('yup');

const projetoCreateSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),
  data_inicio: yup.date().required('Data de início é obrigatória'),
  data_fim: yup.date().required('Data de fim é obrigatória')
}).test('data_fim_posterior', 'Data de fim deve ser posterior à data de início', function(value) {
  const { data_inicio, data_fim } = value;
  return data_fim > data_inicio;
});

const projetoUpdateSchema = yup.object().shape({
  nome: yup.string(),
  descricao: yup.string(),
  data_inicio: yup.date(),
  data_fim: yup.date()
}).test('data_fim_posterior', 'Data de fim deve ser posterior à data de início', function(value) {
  const { data_inicio, data_fim } = value;
  if (data_inicio && data_fim) {
    return data_fim > data_inicio;
  }
  return true;
});

module.exports = { projetoCreateSchema, projetoUpdateSchema };