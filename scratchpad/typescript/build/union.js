"use strict";
function combine(firstNumber, secondNumber, resultConversion) {
    let result;
    if (typeof firstNumber === 'number' && typeof secondNumber === 'number' || resultConversion === 'as-number') {
        result = +firstNumber + +secondNumber;
    }
    else {
        result = firstNumber.toString() + secondNumber.toString();
    }
    return result;
}
const result = combine(30, 26, "as-number");
const resultLetters = combine("30", "26", 'as-number');
console.log(result, resultLetters);
//# sourceMappingURL=union.js.map