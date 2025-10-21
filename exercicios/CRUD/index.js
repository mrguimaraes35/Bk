require('dotenv').config()
const express = require('express');
const app = express();

app.use(express.json());

const mongoose = require('mongoose');

const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
.then(() => {
    console.log("Conectado ao MongoDB");
})
.catch(erro => {
    console.log("Erro ao conectar ao MongoDB:", erro);
});

// Modelo Livro
const LivroModel = mongoose.model('Livro', new mongoose.Schema({
    titulo: String,
    autor: String,
    editora: String,
    ano: Number,
    preco: Number,
    dataCriacao: { type: Date, default: Date.now }
}));

// Criar livro
app.post('/livros', async (req, res) => {
    const livro = req.body;
    if (!livro.titulo || !livro.autor) {
        return res.status(400).json({ erro: 'Título e Autor são obrigatórios' });
    }
    const livroCriado = await LivroModel.create(livro);
    res.status(201).json(livroCriado);
});

// Listar todos os livros
app.get('/livros', async (req, res) => {
    const livros = await LivroModel.find();
    res.json(livros);
});

// Buscar livro por ID
app.get('/livros/:id', async (req, res) => {
    const id = req.params.id;
    const livro = await LivroModel.findById(id);
    if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    res.json(livro);
});

// Atualizar livro
app.put('/livros/:id', async (req, res) => {
    const id = req.params.id;
    const livro = req.body;

    if (!livro.titulo || !livro.autor) {
        return res.status(400).json({ erro: 'Título e Autor são obrigatórios' });
    }

    const livroAtualizado = await LivroModel.findByIdAndUpdate(id, livro, { new: true });
    if (!livroAtualizado) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    res.json(livroAtualizado);
});

// Deletar livro
app.delete('/livros/:id', async (req, res) => {
    const id = req.params.id;
    await LivroModel.findByIdAndDelete(id);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 http://localhost:3000');
});
