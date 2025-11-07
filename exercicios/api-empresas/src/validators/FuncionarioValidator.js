const yup = require('yup');
const mongoose = require('mongoose');

const enderecoSchema = yup.object().shape({
  cep: yup.string(),
  logradouro: yup.string(),
  numero: yup.string(),
  complemento: yup.string(),
  bairro: yup.string(),
  cidade: yup.string(),
  uf: yup.string()
});

const funcionarioCreateSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  telefone: yup.string().required('Telefone é obrigatório'),
  data_contratacao: yup.date().required('Data de contratação é obrigatória'),
  data_nascimento: yup.date().required('Data de nascimento é obrigatória'),
  genero: yup.string().required('Gênero é obrigatório'),
  endereco: enderecoSchema,
  cargo: yup.string().test('is-objectid', 'Cargo ID inválido', value => mongoose.Types.ObjectId.isValid(value)).required('Cargo é obrigatório'),
  departamento: yup.string().test('is-objectid', 'Departamento ID inválido', value => mongoose.Types.ObjectId.isValid(value)).required('Departamento é obrigatório')
}).test('data_fim_posterior', 'Data de fim deve ser posterior à data de início', function(value) {
  // Não aplicável aqui, pois não há data_fim em Funcionario
  return true;
});

const funcionarioUpdateSchema = yup.object().shape({
  nome: yup.string(),
  cpf: yup.string(),
  email: yup.string().email('Email inválido'),
  telefone: yup.string(),
  data_contratacao: yup.date(),
  data_nascimento: yup.date(),
  genero: yup.string(),
  endereco: enderecoSchema,
  cargo: yup.string().test('is-objectid', 'Cargo ID inválido', value => value ? mongoose.Types.ObjectId.isValid(value) : true),
  departamento: yup.string().test('is-objectid', 'Departamento ID inválido', value => value ? mongoose.Types.ObjectId.isValid(value) : true)
});

module.exports = { funcionarioCreateSchema, funcionarioUpdateSchema };