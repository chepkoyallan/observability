/*
*The built in types
*/
let myAge: number = 30;
let myName: string = "Allan";
let isEmployee: boolean = true;
let workingNow: any;

/*
*The number type
* 1, 5.3 -10 (all integers)
*/
function addNumbers(firstNumber: number, secondNumber:number, showResult: boolean, phrase: string){
    const result = number1 + number2
    if (showResult){
        console.log(phrase + result)
    }else{
        return result
    }
}

const number1 = 20;
const number2 = 500;
const printRedult = true;
const resultPhrase = "Result is: "

addNumbers(number1, number2, printRedult, resultPhrase)
/*
*The string type
* '', "", `` (text values)
*/

/*
*The boolean type
* true, false
* Truthy/falsy(js) -> not datatype
*/

/*
*The object type
* {age: 30}
* true, false
* Truthy/falsy(js) -> not datatype
*/

// Developer Notes

/*
*Typescript type system only helps during development
* before the code gets compiled
*/

/*
*Java uses "dynaic types" (resolved at runtime)
*Typescript uses "static types" (set during development)
*/