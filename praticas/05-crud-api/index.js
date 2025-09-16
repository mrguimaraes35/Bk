const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())

app.use((req, res, next) => {
        console.log ('------### LOG DE REQUISIÇÃO ###------')
        console.log("TIME", new Date().toLocaleString())
        console.log("METHOD", req.method)
        console.log("URL", req.url)
        next()
    })



app.listen(3000, () => {
    console.log("Api rodaando em http://localhost:3000")
})