let {calcularNotaA1} = require('./CalculadoraNota');


let {describe, expect, test} = require('@jest/globals');


describe('Testando modulo calcularNotaA1', () => {
    test('Calcular nota A1-> ex 1 trb 3 prov 6 = 10 ', () => {
        expect(calcularNotaA1(1,3,6).toBe(10))
    });

  test('Calcular nota A1-> ex 0 trb 0 prov 0 = 0 ', () => {
    expect(calcularNotaA1(0,0,0).toBe(0))
  })

})
