"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeUsers = exports.namesArray = exports.initialData = void 0;
exports.initialData = [
    {
        email: "marina@wiline.com",
        phoneNumbers: [{ type: "primary", value: "202-555-0105" }],
    },
    {
        email: "kip@wiline.com",
        phoneNumbers: [{ type: "primary", value: "202-555-0168" }],
    },
    {
        email: "lorie@wiline.com",
        phoneNumbers: [{ type: "primary", value: "202-555-0162" }],
    },
    {
        email: "jasmin@wiline.com",
        phoneNumbers: [{ type: "primary", value: "202-555-0168" }],
    },
    {
        email: "emma@wiline.com",
        phoneNumbers: [{ type: "primary", value: "202-555-0187" }],
    },
    {
        email: "elvia@wiline.com",
        phoneNumbers: [{ type: "primary", value: "202-555-0164" }],
    },
    {
        email: "liliana@wiline.com",
        phoneNumbers: [{ type: "primary", value: "202-555-0161" }],
    },
    {
        email: "florencio@wiline.com",
        phoneNumbers: [{ type: "primary", value: "202-555-0127" }],
    },
    {
        email: "delores@wiline.com",
        phoneNumbers: [{ type: "primary", value: "202-555-0143" }],
    },
];
// second array wasn't provided in task but I created
exports.namesArray = [
    { firstName: "Marina", lastName: "Brown" },
    { firstName: "Kip", lastName: "Johnes" },
    { firstName: "Lorie", lastName: "Gonsales" },
    { firstName: "Jasmin", lastName: "Morales" },
    { firstName: "Emma", lastName: "Smith" },
    { firstName: "Elvia", lastName: "Moreno" },
    { firstName: "Liliana", lastName: "Sanchez" },
    { firstName: "Florencio", lastName: "Hernandez" },
    { firstName: "Delores", lastName: "Brown" },
];
// merge 2 array function
const mergeUsers = () => {
    return exports.initialData.map((user, index) => ({
        _id: `user-${index + 1}`, // ID generate
        firstName: exports.namesArray[index].firstName,
        lastName: exports.namesArray[index].lastName,
        email: user.email,
        phoneNumbers: user.phoneNumbers,
    }));
};
exports.mergeUsers = mergeUsers;
