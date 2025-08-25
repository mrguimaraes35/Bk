console.log("Calculadora");

const prompt = require('prompt-sync')();
const { somar, subtrair, multiplicar, dividir, aoQuadrado, raizQuadrada } = require('./Calculadora.js');

let nome = prompt("Qual é o seu nome? ");
console.log("Olá " + nome);

// Receber números do usuário
let num1 = parseFloat(prompt("Qual o primeiro número? "));
let num2 = parseFloat(prompt("Qual o segundo número? "));
let num3 = parseFloat(prompt("Qual o número para elevar ao quadrado? "));
let num4 = parseFloat(prompt("Qual o número para calcular a raiz quadrada? "));

// Usar as funções da calculadora
console.log("Soma: " + somar(num1, num2));
console.log("Subtração: " + subtrair(num1, num2));
console.log("Multiplicação: " + multiplicar(num1, num2));
console.log("Divisão: " + dividir(num1, num2));
console.log("Ao quadrado: " + aoQuadrado(num3));
console.log("Raiz quadrada: " + raizQuadrada(num4));
