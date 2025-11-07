const express = require('express');
const CargoModel = require('../models/CargoModel');
const { cargoCreateSchema, cargoUpdateSchema } = require('../validators/CargoValidator');
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

router.post('/', validate(cargoCreateSchema), async (req, res) => {
  try {
    const cargo = new CargoModel(req.body);
    await cargo.save();
    res.status(201).json(cargo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const cargos = await CargoModel.find();
    res.status(200).json(cargos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', validateId, async (req, res) => {
  try {
    const cargo = await CargoModel.findById(req.params.id);
    if (!cargo) return res.status(404).json({ message: 'Cargo não encontrado' });
    res.status(200).json(cargo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', validateId, validate(cargoUpdateSchema), async (req, res) => {
  try {
    const cargo = await CargoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cargo) return res.status(404).json({ message: 'Cargo não encontrado' });
    res.status(200).json(cargo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', validateId, async (req, res) => {
  try {
    const cargo = await CargoModel.findByIdAndDelete(req.params.id);
    if (!cargo) return res.status(404).json({ message: 'Cargo não encontrado' });
    res.status(200).json({ message: 'Cargo deletado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;