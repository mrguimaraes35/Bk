const express = require('express');
const app = express();

app .use(express.json());


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
const PessoaModel = mongoose.model('Pessoa', new mongoose.Schema({

   nome : String, 
    idade : Number,
    dataCriacao : { type: Date, default: Date.now() 
}
    }));



app.post('/pessoas', async (req, res, next) => {
    const pessoa = req.body
    if (!pessoa.nome) {
        return res.status (400).json ({ erro : 'Nome é obrigatório'})
    }
  const pessoaCriada =  await PessoaModel.create (pessoa)
    res.status (201).json (pessoaCriada)
})

app.listen (3000, () => {
    console.log ('Servidor rodando na porta 3000 http://localhost:3000');
})

