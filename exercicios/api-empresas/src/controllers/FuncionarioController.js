const express = require('express');
const FuncionarioModel = require('../models/FuncionarioModel');
const { funcionarioCreateSchema, funcionarioUpdateSchema } = require('../validators/FuncionarioValidator');
const idSchema = require('../validators/IDValidator');
const CargoModel = require('../models/CargoModel');
const DepartamentoModel = require('../models/DepartamentoModel');

const router = express.Router();

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
};

const validateId = async (req, res, next) => {
  try {
    await idSchema.validate({ id: req.params.id }, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
};

const validateReferences = async (req, res, next) => {
  const { cargo, departamento } = req.body;
  if (cargo) {
    const cargoExists = await CargoModel.findById(cargo);
    if (!cargoExists) return res.status(400).json({ message: 'Cargo não existe' });
  }
  if (departamento) {
    const deptExists = await DepartamentoModel.findById(departamento);
    if (!deptExists) return res.status(400).json({ message: 'Departamento não existe' });
  }
  next();
};

router.post('/', validate(funcionarioCreateSchema), validateReferences, async (req, res) => {
  try {
    const funcionario = new FuncionarioModel(req.body);
    await funcionario.save();
    res.status(201).json(funcionario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const funcionarios = await FuncionarioModel.find().populate(['cargo', 'departamento']);
    res.status(200).json(funcionarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', validateId, async (req, res) => {
  try {
    const funcionario = await FuncionarioModel.findById(req.params.id).populate(['cargo', 'departamento']);
    if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado' });
    res.status(200).json(funcionario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', validateId, validate(funcionarioUpdateSchema), validateReferences, async (req, res) => {
  try {
    const funcionario = await FuncionarioModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(['cargo', 'departamento']);
    if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado' });
    res.status(200).json(funcionario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', validateId, async (req, res) => {
  try {
    const funcionario = await FuncionarioModel.findByIdAndDelete(req.params.id);
    if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado' });
    res.status(200).json({ message: 'Funcionário deletado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;