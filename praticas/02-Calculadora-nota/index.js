console.log("Calculadora de notas");


let promt = require('prompt-sync')();

let nome = promt("Qual é o seu nome? ");

console.log("Olá " + nome );

let{calcularNotaA1, calcularNotaA2, calcularNotafinal} = require('./CalculadoraNota.js');


console.log("Calculadora de nota A1");
let exercicioA1 = parseFloat(promt(" Qual sua nota de exercicio?" ))
let trabalhoA1 = parseFloat(promt(" Qual sua nota de trabalho? "))
let provaA1 = parseFloat(promt(" Qual sua nota de prova? "))
let notaA1 = calcularNotaA1(exercicioA1, trabalhoA1, provaA1)


console.log("nota A1 calculada: " + notaA1)
console.log ("Finalizando calculo notaA1")


console.log("Calculadora de nota A1");
let exercicioA2 = parseFloat(promt(" Qual sua nota de exercicio?" ))
let trabalhoA2 = parseFloat(promt(" Qual sua nota de trabalho? "))
let provaA2 = parseFloat(promt(" Qual sua nota de prova? "))
let notaA2 = calcularNotaA1(exercicioA2, trabalhoA2, provaA2)

console.log("nota A2 calculada: " + notaA2)
console.log ("Finalizando calculo notaA2")


console.log("Média final" + media)
let media = calcularNotafinal(notaA1, notaA2);

if(media >= 5) {
    console.log("Parabéns " + nome + ", você foi aprovado!")
} else {
    console.log("Infelizmente " + nome + ", você foi reprovado!")
}