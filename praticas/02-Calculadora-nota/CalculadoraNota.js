function calcularNotaA1(exercicio, trabalho, prova) {
    return exercicio + trabalho + prova
}

 function calcularNotaA2(exercicio, trabalho, prova) {
    return exercicio + trabalho + prova
 }

function calcularNotafinal(notaA1, notaA2) {
    return (notaA1 * 0.4) + (notaA2 * 0.6) 
}

module.exports = {
    calcularNotaA1,
    calcularNotaA2,
    calcularNotafinal
}