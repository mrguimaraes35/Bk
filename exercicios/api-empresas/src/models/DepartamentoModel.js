const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Departamento', departamentoSchema);