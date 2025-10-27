const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const livroRouter = require('./controllers/LivroController');

// Carrega variáveis de ambiente
dotenv.config();

const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Conexão com MongoDB Atlas
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Rotas
app.use('/livros', livroRouter);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:3000`);
});