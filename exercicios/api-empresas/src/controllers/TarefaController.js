const express = require('express');
const TarefaModel = require('../models/TarefaModel');
const { tarefaCreateSchema, tarefaUpdateSchema } = require('../validators/TarefaValidator');
const idSchema = require('../validators/IDValidator');
const FuncionarioModel = require('../models/FuncionarioModel');
const ProjetoModel = require('../models/ProjetoModel');

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
  const { responsavel, projeto } = req.body;
  if (responsavel) {
    const funcExists = await FuncionarioModel.findById(responsavel);
    if (!funcExists) return res.status(400).json({ message: 'Funcionário não existe' });
  }
  if (projeto) {
    const projExists = await ProjetoModel.findById(projeto);
    if (!projExists) return res.status(400).json({ message: 'Projeto não existe' });
  }
  next();
};

router.post('/', validate(tarefaCreateSchema), validateReferences, async (req, res) => {
  try {
    const tarefa = new TarefaModel(req.body);
    await tarefa.save();
    res.status(201).json(tarefa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tarefas = await TarefaModel.find().populate(['responsavel', 'projeto']);
    res.status(200).json(tarefas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', validateId, async (req, res) => {
  try {
    const tarefa = await TarefaModel.findById(req.params.id).populate(['responsavel', 'projeto']);
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.status(200).json(tarefa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', validateId, validate(tarefaUpdateSchema), validateReferences, async (req, res) => {
  try {
    const tarefa = await TarefaModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(['responsavel', 'projeto']);
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.status(200).json(tarefa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', validateId, async (req, res) => {
  try {
    const tarefa = await TarefaModel.findByIdAndDelete(req.params.id);
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.status(200).json({ message: 'Tarefa deletada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;