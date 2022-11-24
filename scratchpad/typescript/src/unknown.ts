/**
 * Unknown
 */

let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "max";
if (typeof userInput === 'string'){
    userName = userInput;
}

/**
 * never
 */

function generateError(message: string, code: number): never{
    throw{message: message, errorCode: code}
    // while (true) {}
}

// const result2 = generateError('An Error occures', 500)
// console.log(result2)