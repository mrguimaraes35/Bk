const yup = require('yup');

const departamentoCreateSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória')
});

const departamentoUpdateSchema = yup.object().shape({
  nome: yup.string(),
  descricao: yup.string()
});

module.exports = { departamentoCreateSchema, departamentoUpdateSchema };