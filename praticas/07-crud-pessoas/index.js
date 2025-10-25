const express = require('express');
const app = express();

use.use(express.json());



const mongoose = require('mongoose');

const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}${DB_NAME}retryWrites=true&w=majority&appName=Cluster0`


mongoose.connect(url)
.then(() => {
    console.log("Conectado ao MongoDB");
})
.catch(erro => 
    {
        console.log("Erro ao conectar ao MongoDB: " , erro);
    }
)

const PessoaController = require('./controllers/PessoaController');
app.use(PessoaController)


app.listen(3000, () => {
    console.log('aplicaçao rodando -> http://localhost:3000');
})