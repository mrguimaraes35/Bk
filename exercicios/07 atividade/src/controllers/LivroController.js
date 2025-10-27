const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');
const validateID = require('../validators/IDValidator');
const { validateCreateLivro, validateUpdateLivro } = require('../validators/LivroValidator');

// Criar um livro
router.post('/', validateCreateLivro, async (req, res) => {
  try {
    const livro = new Livro(req.body);
    await livro.save();
    res.status(201).json(livro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os livros
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar livro por ID
router.get('/:id', validateID, async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    res.json(livro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar livro
router.put('/:id', validateID, validateUpdateLivro, async (req, res) => {
  try {
    const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    res.json(livro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remover livro
router.delete('/:id', validateID, async (req, res) => {
  try {
    const livro = await Livro.findByIdAndDelete(req.params.id);
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    res.json({ message: 'Livro removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;