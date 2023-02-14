export const textToAscii = (text)=> text.split('').map(char => char.charCodeAt(undefined)),

asciiToText = (hex) => hex.map(char => String.fromCharCode(char)).join(''),

numberToHex = (decimal) => decimal.toString(16),

hexToNumber = (hex) => parseInt(hex, 16);