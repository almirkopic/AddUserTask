"use strict";
// src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const initialData_1 = require("./src/initialData");
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.get("/users", (req, res) => {
    res.json(initialData_1.initialUsers);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
