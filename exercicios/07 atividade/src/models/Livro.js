const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O título é obrigatório'],
    trim: true,
  },
  autor: {
    type: String,
    required: [true, 'O autor é obrigatório'],
    trim: true,
  },
  editora: {
    type: String,
    required: [true, 'A editora é obrigatória'],
    trim: true,
  },
  ano: {
    type: Number,
    required: [true, 'O ano é obrigatório'],
  },
  preco: {
    type: Number,
    required: [true, 'O preço é obrigatório'],
    min: [0, 'O preço deve ser um número positivo'],
  },
});

module.exports = mongoose.model('Livro', livroSchema);