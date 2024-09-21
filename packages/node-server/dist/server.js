"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
// Define a root route
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});
// Define your data route
app.get("/data", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ foo: "bar" });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
