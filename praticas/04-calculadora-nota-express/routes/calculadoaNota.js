const express = require('express')
const  route = express.Router()


router.get("/calculadora/notaA1", (req, res, next) => {
  const exercicio = req.query.exercicio
  const trabalho = req.query.trabalho
  const prova = req.query.prova
    

   
console,log(exercicio, trabalho, prova)






   res.send(Funcionou)




})



module.exports = router