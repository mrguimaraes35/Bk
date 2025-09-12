
const express = require('express')
//  cria um application com express
const app = express()

const cors = require('cors')
// habilita chegar requisição de qualquer origem
app.use(cors())

//  configuração e intermediarios(Middlewares)

// Intermediario de LOG
app.use((req, res, next) =>{
    console.log("####### Requisição chegou ######")
    console.log("Time: ", new Date().toLocaleString())
    console.log("metodo: ", req.method)
    console.log("Rota: ", req.url)
    next()
})

app.get("/hello", (req, res ,next) =>{
    res.send("Hello atualizado!!!")
})

// importar roteador calculadora
const calculadoraNotaRouter = require('./routes/calculadora')
//  configuro a minha aplicação pra usar o router (Calculadora) como intermediario
app.use("/", calculadoraNotaRouter)

//  Executa a aplicação(minha API)
app.listen(3000, () =>{
    console.log("API rodando em http://localhost:3000")
}) 