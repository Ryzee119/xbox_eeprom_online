function generateHex(length, elementId) {
    const hexCharacters = '0123456789ABCDEF';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += hexCharacters.charAt(Math.floor(Math.random() * hexCharacters.length));
    }
    document.getElementById(elementId).value = result;
}

function generateDigits(length, elementId) {
    const digitCharacters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += digitCharacters.charAt(Math.floor(Math.random() * digitCharacters.length));
    }
    document.getElement
