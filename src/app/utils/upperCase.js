/**
 * Converter todos os atributos do objeto em caixa alta
 * @param {object} data 
 * @returns Objeto em caixa alta
 */
export function objToUpperCase(data) {
    let upperCased = {}

    for (var key in data) {
        upperCased[key] = data[key].toUpperCase();
    }

    return upperCased;
}