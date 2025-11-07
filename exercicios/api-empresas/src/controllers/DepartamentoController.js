const express = require('express');
const DepartamentoModel = require('../models/DepartamentoModel');
const { departamentoCreateSchema, departamentoUpdateSchema } = require('../validators/DepartamentoValidator');
const idSchema = require('../validators/IDValidator');

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

router.post('/', validate(departamentoCreateSchema), async (req, res) => {
  try {
    const departamento = new DepartamentoModel(req.body);
    await departamento.save();
    res.status(201).json(departamento);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const departamentos = await DepartamentoModel.find();
    res.status(200).json(departamentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', validateId, async (req, res) => {
  try {
    const departamento = await DepartamentoModel.findById(req.params.id);
    if (!departamento) return res.status(404).json({ message: 'Departamento não encontrado' });
    res.status(200).json(departamento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', validateId, validate(departamentoUpdateSchema), async (req, res) => {
  try {
    const departamento = await DepartamentoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!departamento) return res.status(404).json({ message: 'Departamento não encontrado' });
    res.status(200).json(departamento);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', validateId, async (req, res) => {
  try {
    const departamento = await DepartamentoModel.findByIdAndDelete(req.params.id);
    if (!departamento) return res.status(404).json({ message: 'Departamento não encontrado' });
    res.status(200).json({ message: 'Departamento deletado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;