const express = require('express')
const router = express.Router()





let pessoas = [
    { id: 1,
        nome: "Ana",
        cpf: "123.456.789-00",
        gmail: "mateus@",
        dataNacimento: "1990/01/01"
     }
]


router.post('/pessoas/:id',(req, res, next) => {

})

router.get('/pessoas/:id', (req, res, next) => {
    const idRecebido = req.params.id
    const pessoa = pessoas.find(p => p.id === idRecebido)
    if (!pessoa) {
        return res.status(404).json({ erro: "Pessoa não encontrada" })
    }
    
    res.json()

})


router.put('/pessoas/:id', (req, res, next) => {
})

router.delete('/pessoas/:id', (req, res, next) => {
})




module.exports = router