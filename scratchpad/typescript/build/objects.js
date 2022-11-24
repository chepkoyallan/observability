"use strict";
const personOne = {
    name: "user",
    years: 3
};
var UserType;
(function (UserType) {
    UserType[UserType["ADMIN"] = 0] = "ADMIN";
    UserType[UserType["REAT_ONLY"] = 1] = "REAT_ONLY";
    UserType[UserType["AUTHOR"] = 2] = "AUTHOR";
})(UserType || (UserType = {}));
const person = {
    name: "allan",
    year: 3,
    hobbies: ['Cooking'],
    role: [2, "author"],
    userType: UserType.ADMIN
};
let activities;
console.log(personOne);
console.log(person);
for (const hobby of person.hobbies) {
    console.log(hobby);
}
//# sourceMappingURL=objects.js.map