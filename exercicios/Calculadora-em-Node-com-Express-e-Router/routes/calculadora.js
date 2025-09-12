const express = require('express')

const router = express.Router()


router.get("/calculadora/somar", (req, res, next) => {
    const numA = parseFloat(req.query.numA)
    const numB = parseFloat(req.query.numB)
    

    if(isNaN(numA)|| isNaN(numB)) {
        return res.status(400).json({erro: "números invalidos!!!" })
}    

const somar= numA + numB

    res.json({ somar})
})


router.get("/calculadora/subtrair", (req, res, next) => {
    const numA = parseFloat(req.query.numA)
    const numB = parseFloat(req.query.numB)
    


    if(isNaN(numA)|| isNaN(numB)) {
        return res.status(400).json({erro: "números invalidos!!!" })
}    

const subtrair= numA - numB

    res.json({ subtrair})
})



router.get("/calculadora/multiplicar", (req, res, next) => {
    const numA = parseFloat(req.query.numA)
    const numB = parseFloat(req.query.numB)
    

    if(isNaN(numA)|| isNaN(numB)) {
        return res.status(400).json({erro: "números invalidos!!!" })
}    

const multiplicar= numA * numB

    res.json({ multiplicar})
})

router.get("/calculadora/dividir", (req, res, next) => {
    const numA = parseFloat(req.query.numA)
    const numB = parseFloat(req.query.numB)
    

   
    if(isNaN(numA)|| isNaN(numB)) {
        return res.status(400).json({erro: "números invalidos!!!" })
}    

const dividir= numA / numB

    res.json({ dividir})
})


router.get("/calculadora/aoQuadrado", (req, res, next) => {
    const numA = parseFloat(req.query.numA)
   
    if(isNaN(numA)) {
        return res.status(400).json({erro: "números invalidos!!!" })
}    

const aoQuadrado= numA * numA

    res.json({ aoQuadrado})
})

router.get("/calculadora/raizQuadrada", (req, res, next) => {
    const numA = parseFloat(req.query.numA)
    

   
    if(isNaN(numA)) {
        return res.status(400).json({erro: "números invalidos!!!" })
}    

const raizQuadrada= Math.sqrt(numA)

    res.json({ raizQuadrada})
})




module.exports = router