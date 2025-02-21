"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const mergeUser_1 = require("../utils/mergeUser");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
let users = (0, mergeUser_1.mergeUsers)();
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
// POST /users
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
    // Validate the user data before adding
    const errors = (0, validation_1.validateUserData)(newUser);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    users.push(newUser);
    res.status(201).json(newUser);
});
// PUT /users/:id
router.put("/:id", (req, res) => {
    const userIndex = users.findIndex((user) => user._id === req.params.id);
    if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex], ...req.body };
        // Validate the updated user data
        const errors = (0, validation_1.validateUserData)(updatedUser);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        users[userIndex] = updatedUser;
        res.json(updatedUser);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
// DELETE /users/:id
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
