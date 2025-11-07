require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const departamentoRouter = require('./controllers/DepartamentoController');
const cargoRouter = require('./controllers/CargoController');
const funcionarioRouter = require('./controllers/FuncionarioController');
const projetoRouter = require('./controllers/ProjetoController');
const tarefaRouter = require('./controllers/TarefaController');

app.use('/departamentos', departamentoRouter);
app.use('/cargos', cargoRouter);
app.use('/funcionarios', funcionarioRouter);
app.use('/projetos', projetoRouter);
app.use('/tarefas', tarefaRouter);

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI)
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta  http://localhost:3000`));