const express = require('express')

const app = express()



app.use((req, res, next) => {
    console.log("Requisiçao Chegou")
    console.log("TIME ", new Date().toISOString())
    console.log("METHOD ", req.method)
    console.log("Rota", req.url)
    next()
})

app.get('/hello', (req,res,next) =>{
  res.send("Hello")
})

const calculadoraNotaRouter = require('./routes/calculadoaNota')



app.use("/", calculadoraNotaRouter)

app.listen(3000, () =>{
    console.log("API rodando em http://localhost:3000")
})