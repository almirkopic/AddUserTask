"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const initialData_1 = require("../data/initialData"); // Putanja do initialData.ts
const router = (0, express_1.Router)();
let users = initialData_1.initialUsers;
router.get("/", (req, res) => {
    res.json(users);
});
router.post("/", (req, res) => {
    const newUser = Object.assign({ _id: (users.length + 1).toString() }, req.body);
    users.push(newUser);
    res.status(201).json(newUser);
});
router.get("/:id", (req, res) => {
    const user = users.find((u) => u._id === req.params.id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).send("User not found");
    }
});
exports.default = router;
