"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/router.ts
const express_1 = require("express");
const initialData_1 = require("../data/initialData");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
// Merge initialData i namesArray
const users = initialData_1.initialData.map((item, index) => ({
    _id: (0, uuid_1.v4)(), // generate ID
    firstName: initialData_1.namesArray[index].firstName,
    lastName: initialData_1.namesArray[index].lastName,
    email: item.email,
    phoneNumbers: item.phoneNumbers,
}));
// GET /users
router.get("/", (req, res) => {
    const { query, email, phoneNumber } = req.query;
    let filteredUsers = users;
    // Filter search user by name/phone..
    if (query) {
        const searchTerm = query;
        filteredUsers = filteredUsers.filter((user) => user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (email) {
        const emailTerm = email;
        filteredUsers = filteredUsers.filter((user) => user.email.toLowerCase().includes(emailTerm.toLowerCase()));
    }
    if (phoneNumber) {
        const phoneTerm = phoneNumber;
        filteredUsers = filteredUsers.filter((user) => user.phoneNumbers.some((phone) => phone.value.includes(phoneTerm)));
    }
    res.json(filteredUsers);
});
// GET /users/:id
router.get("/:id", (req, res) => {
    const user = users.find((user) => user._id === req.params.id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
// POST /users -
router.post("/", (req, res) => {
    const { firstName, lastName, email, phoneNumbers } = req.body;
    const newUser = {
        _id: (0, uuid_1.v4)(),
        firstName,
        lastName,
        email,
        phoneNumbers: [
            phoneNumbers[0], // primary
            phoneNumbers[1] || { type: "secondary", value: "" }, // secondary optional
        ],
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
// PUT /users/:id - update user
router.put("/:id", (req, res) => {
    const userIndex = users.findIndex((user) => user._id === req.params.id);
    if (userIndex !== -1) {
        const updatedUser = Object.assign(Object.assign({}, users[userIndex]), req.body);
        users[userIndex] = updatedUser;
        res.json(updatedUser);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
// DELETE /users/:id -
router.delete("/:id", (req, res) => {
    const userIndex = users.findIndex((user) => user._id === req.params.id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.json({ success: true });
    }
    else {
        res.status(404).json({ success: false, message: "User not found" });
    }
});
exports.default = router;
