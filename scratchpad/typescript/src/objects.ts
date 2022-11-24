/*
* Key Type
* const person: object
*/
const personOne: object = {
    name: "user",
    years: 3
}

/**
 * person: {} same tp person : object
 */

enum UserType{
    ADMIN, REAT_ONLY, AUTHOR
}

const person: {
    name: string,
    year: number
    hobbies: [string]
    role: [number, string]
    userType: UserType
} = {
    name: "allan",
    year: 3,
    hobbies: ['Cooking'],
    role: [2, "author"],
    userType: UserType.ADMIN
}

/**
 * Arrays [1, 2, 3]
 */
let activities: string[];

console.log(personOne)
console.log(person)

for (const hobby of person.hobbies) {
    console.log(hobby)
}

/**
 * Tuple [1, 2] fixed legth and type
 */


/**
 * enum [NEW, OLD]
 */
