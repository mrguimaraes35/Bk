const yup = require('yup');

const cargoCreateSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),
  salario: yup.number().required('Salário é obrigatório').min(1518, 'Salário mínimo é R$ 1.518,00')
});

const cargoUpdateSchema = yup.object().shape({
  nome: yup.string(),
  descricao: yup.string(),
  salario: yup.number().min(1518, 'Salário mínimo é R$ 1.518,00')
});

module.exports = { cargoCreateSchema, cargoUpdateSchema };