const express = require('express');
const ProjetoModel = require('../models/ProjetoModel');
const { projetoCreateSchema, projetoUpdateSchema } = require('../validators/ProjetoValidator');
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

router.post('/', validate(projetoCreateSchema), async (req, res) => {
  try {
    const projeto = new ProjetoModel(req.body);
    await projeto.save();
    res.status(201).json(projeto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const projetos = await ProjetoModel.find();
    res.status(200).json(projetos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', validateId, async (req, res) => {
  try {
    const projeto = await ProjetoModel.findById(req.params.id);
    if (!projeto) return res.status(404).json({ message: 'Projeto não encontrado' });
    res.status(200).json(projeto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', validateId, validate(projetoUpdateSchema), async (req, res) => {
  try {
    const projeto = await ProjetoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!projeto) return res.status(404).json({ message: 'Projeto não encontrado' });
    res.status(200).json(projeto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', validateId, async (req, res) => {
  try {
    const projeto = await ProjetoModel.findByIdAndDelete(req.params.id);
    if (!projeto) return res.status(404).json({ message: 'Projeto não encontrado' });
    res.status(200).json({ message: 'Projeto deletado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;