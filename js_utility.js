// Description: Utility functions for the web page

// Generates a random hex string of the specified length and sets the value of the specified element
function generateHex(length, elementId, prefix = '') {
    const hexCharacters = '0123456789ABCDEF';
    let result = prefix;
    for (let i = prefix.length; i < length; i++) {
        result += hexCharacters.charAt(Math.floor(Math.random() * hexCharacters.length));
    }
    document.getElementById(elementId).value = result;
}

// Generates a random string of digits of the specified length and sets the value of the specified element
function generateDigits(length, elementId) {
    const digitCharacters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += digitCharacters.charAt(Math.floor(Math.random() * digitCharacters.length));
    }
    document.getElementById(elementId).value = result;
}

// Converts a Uint8Array to a hex string. i,e [0x01, 0x02, 0x03] -> "010203"
function uint8ArrayToHexString(array) {
    return Array.from(array, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2).toUpperCase()).join('');
}

// Converts a javascript int to a hex string with 8 characters prefixed with "0x"
function uint32ToHexUint32(number) {
    let hexString = number.toString(16).toUpperCase();
    return "0x" + hexString.padStart(8, '0');
}

// Compares to Uint8 arrays and returns true if they are equal
function arraysEqual(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
